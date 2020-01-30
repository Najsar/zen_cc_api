const sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const models = require('../models/index');
const log = require('./log');

function gen(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function getHash(user) {
    return models.users.findOne({
        attributes: ['Pass'],
        where: {
            Name: user
        }
    });
}
function getUser(user) {
    return models.users.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'Pass', 'Salt']
        },
        where: {
            Name: user
        }
    });
}
function getUserIdBySession(session) {
    return models.login_session.findOne({
        attributes: ['user_id', 'date'],
        where: {
            session: session
        }
    });
}
function getUserById(id) {
    return models.users.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'Pass', 'Salt']
        },
        where: {
            id: id
        }
    });
}
async function checkPass(user, pass) {
    var hash = (await getHash(user)).Pass;
    return bcrypt.compareSync(pass, hash);
   
}

module.exports = {
    loginUser: async function(user, pass) {
        if(await checkPass(user, pass)) {
            var session = gen(16);
            var user_db = await getUser(user);
            var dt = new Date();
            dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000));
            models.login_session.create({ user_id: user_db.id, session: session, date:  dt})
            .then(session => {
                log.log("LOGIN", 'Session saved as id: '+session.dataValues.id, 4);
            });
            return { status: 1, user: user_db, session: session };
        }
        else {
            log.log("LOGIN", 'Username / Password not found', 4, 3);
            return { status: 0 };
        }
    },
    loginBySession: async function(session) {
        var user_id = (await getUserIdBySession(session));
        if(user_id == null) {
            log.log('LOGIN', "Session not found, remove cookie", 4, 2);
            return { status: 0 };
        }
        else {
            var user_date = new Date(user_id.date);
            var current_date = new Date();
            if(current_date > user_date) {
                log.log('LOGIN', "Session expired, remove cookie", 4, 2);
                return { status: 0 };
            }
            else {
                var user = (await getUserById(user_id.user_id)).dataValues;
                return { status: 1, user: user };
            }
        }
    },
    genPass: function(pass) {
        log.log('genPass', "Generating hash...", 4, 1);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pass, salt);
        log.log('genPass', "HASH: " + hash, 4, 1);
        return hash;
    },
    getProducts: async function() {
        var return_array = [];
        var product_list = await models.product_list.findAll({
            include: {
                model: models.product_type,
                attributes: {
                    exclude: ['createdAt', 'updatedAt'] 
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        for(i=0; i<product_list.length;i++) {
            var temp_array = [ product_list[i]['id'], product_list[i]['product_type']['type'], product_list[i]['name'], product_list[i]['price'], product_list[i]['product_type']['id'], product_list[i]['product_type']['cash'], product_list[i]['product_type']['use_in_bonus'], product_list[i]['product_type']['fixed_price'] ];
            return_array.push(temp_array);
        }
        return return_array;
    },
    getPayments: async function() {
        var return_array = [];
        var product_list = await models.payment_method.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        for(i=0; i<product_list.length;i++) {
            var temp_array = [ product_list[i]['id'], product_list[i]['type'], product_list[i]['use_in_report'] ];
            return_array.push(temp_array);
        }
        return return_array;
    },
    getSum: async function() {
        var date = new Date();
        var data = await models.sessions.findAll({
            attributes: {
                include: ['sort', 'category', 'type', 'payment', 'price', 'paid_price', 'exchange']
            },
            where: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('time')), date.getFullYear()),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('time')), date.getMonth()+1),
                sequelize.where(sequelize.fn('DAY', sequelize.col('time')), date.getDate()),
            ]
        });
        var start_cash = await models.reports.findOne({
            attributes: {
                include: ['end_balance']
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 1
        });
        var sum = {cash:0,card:0,expense:0,pcstore:0,grupon:0,s_prezenty:0,profit:0,partners:0,start_cash:5,partners_card:0};
        if(!start_cash) {
            sum['start_cash'] = 0;
        }
        else {
            sum['start_cash'] = start_cash['end_balance'];
        }
        if( data[0] != null ) {
            for( i=0 ; i < data.length ; i++) {
                if(data[i]['payment'] == "Gotówka" && data[i]['sort'] == "Przychód") sum['cash'] += Number(data[i]['price']);
                if(data[i]['category'] == "Grupon") sum['grupon'] += Number(data[i]['price']);
                if(data[i]['payment'] == "Karta") sum['card'] += Number(data[i]['price']);
                if(data[i]['category'] == "PC Store") sum['pcstore'] += Number(data[i]['price']);
                if(data[i]['category'] == "Super Prezenty") sum['s_prezenty'] += Number(data[i]['price']);
                if(data[i]['sort'] == "Rozchód") sum['expense'] += (0-Number(data[i]['price']));
                if(data[i]['sort'] == "Przychód") sum['profit'] += Number(data[i]['price']);
                if(data[i]['payment'] == "Sieć Partnerska") sum['partners'] += Number(data[i]['price']);
            }
        }
        sum['cash'] = Math.round(sum['cash'] * 100) / 100; 
        sum['card'] = Math.round(sum['card'] * 100) / 100;
        sum['expense'] = 0-(Math.round(sum['expense'] * 100) / 100);
        sum['pcstore'] = Math.round(sum['pcstore'] * 100) / 100;
        sum['grupon'] = Math.round(sum['grupon'] * 100) / 100;
        sum['s_prezenty'] = Math.round(sum['s_prezenty'] * 100) / 100;
        sum['profit'] = Math.round(sum['profit'] * 100) / 100;
        sum['partners'] = Math.round(sum['partners'] * 100) / 100;
        sum['partners_card'] = sum['partners']+sum['card'];
        return sum;
    },
    getExpense: async function() {
        var return_array = [];
        var product_list = await models.expense_type.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        for(i=0; i<product_list.length;i++) {
            var temp_array = [ product_list[i]['id'], product_list[i]['type'], product_list[i]['use_in_report'] ];
            return_array.push(temp_array);
        }
        return return_array;
    },
    getProfit: async function() {
        var date = new Date();
        var month_profit = await models.sessions.sum('price', {
            where: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('time')), date.getFullYear()),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('time')), date.getMonth()+1),
                { sort: 'Przychód' }
            ]
        });
        var day_profit = await models.sessions.sum('price', {
            where: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('time')), date.getFullYear()),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('time')), date.getMonth()+1),
                sequelize.where(sequelize.fn('DAY', sequelize.col('time')), date.getDate()),
                { sort: 'Przychód' }
            ]
        });
        return { month: month_profit, day: day_profit };
    },
    getDayPayments: async function(date) {
        var day_payments = await models.sessions.findAll({
            where: [
                sequelize.where(sequelize.fn('DATE', sequelize.col('time')), date)
            ],
            attributes: ['id', 'category', 'type', 'payment', 'main_price', 'price', 'paid_price', 'exchange', [sequelize.fn('TIME', sequelize.col('time')), 'time']]
        });
        return day_payments;
    },
    getStats: async function(date) {
        const arrSum = arr => arr.reduce((a,b) => a + b, 0);
        const isset = (ref) => typeof ref !== 'undefined';
        var new_date = new Date(date);
        var data = await models.sessions.findAll({
            where: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('time')), new_date.getFullYear() ),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('time')), new_date.getMonth()+1 ),
                { sort: 'Przychód' }
            ],
            attributes: [[sequelize.fn('DATE', sequelize.col('time')), '0'], ['type', '1'], [sequelize.fn('COUNT', sequelize.col('id')), '2'], [sequelize.fn('SUM', sequelize.col('price')), '3'], ['category', '4']],
            group: [ sequelize.fn('DATE', sequelize.col('time')), 'type' ],
            order: sequelize.col('category'),
            raw: true
        });
        var days = [];
        var thead_array = [];
        var thead_array_cat = [];
        var tbody_array = [];
        var sum = [];
        for(i=0; i<data.length; i++) {
            if(days.indexOf(data[i][0]) < 0) {
                days.push(data[i][0]);
            }
            if(thead_array.indexOf(data[i][1]) < 0) {
                thead_array.push(data[i][1]);
                thead_array_cat.push(data[i][4]);
            }
            find = days.indexOf(data[i][0]);
            find2 = thead_array.indexOf(data[i][1]);
            tbody_array[find] = [];
            tbody_array[find][find2*2] = data[i][2];
            tbody_array[find][(find2*2)+1] = data[i][3];
        }
        for(e=0; e<days.length; e++) {
            for(j=0; j<(thead_array.length)*2; j++) {
                if(!isset(tbody_array[e][j])) {
                    tbody_array[e][j] = 0;
                }
                if( !isset(sum[j]) ) {
                    sum[j] = tbody_array[e][j];
                }
                else {
                    sum[j] += tbody_array[e][j];
                }
                
            }
        }
        var sum_szt = [];
        var sum_zl = [];
        for(i=0; i<tbody_array.length; i++) {
            for(e=0; e<tbody_array[i].length; e++) {
                if (e % 2 == 0) {
                    if(!isset(sum_szt[i])){
                        sum_szt[i] = tbody_array[i][e];
                    }
                    else {
                        sum_szt[i] = sum_szt[i] + tbody_array[i][e];
                    }
                }
                else {
                    if(!isset(sum_zl[i])){
                        sum_zl[i] = tbody_array[i][e];
                    }
                    else {
                        sum_zl[i] = sum_zl[i] + tbody_array[i][e];
                    }
                }
            }   
        }
    
        thead = "<thead><tr><th>Data</th>";
        for(e=0; e<thead_array.length; e++) {
            thead += '<th>'+thead_array_cat[e]+' <br> '+thead_array[e]+' ( szt )</th>';
            thead += '<th>'+thead_array_cat[e]+' <br> '+thead_array[e]+' ( zł )</th>';
        }
        thead += "<th>SUMA ( szt )</th>";
        thead += "<th>SUMA ( zł )</th>";
        thead += "</tr></thead>";
    
        tbody = "<tbody>";
        for(e=0; e<days.length; e++) {
            tbody += "<tr><td>"+days[e]+"</td>";
            for(j=0; j<(thead_array.length)*2; j++) {
                tbody += "<td>"+tbody_array[e][j]+"</td>";
                
            }
            tbody += "<td><b>"+sum_szt[e]+"</b></td>";
            tbody += "<td><b>"+sum_zl[e]+"</b></td>";
            tbody += "</tr>";
        }
        tbody += "</tbody>";
    
        tfoot = "<tfoot><tr><th>Suma:</th>";
        for(e=0; e<sum.length; e++) {
            if (e % 2 == 0) {
                tfoot += "<th>"+sum[e]+" szt</th>";
            }
            else {
                tfoot += "<th>"+sum[e]+" zł</th>";
            }
        }
        tfoot += "<th>"+arrSum(sum_szt)+"</th>";
        tfoot += "<th>"+arrSum(sum_zl)+"</th>";
        tfoot += "</tr></tfoot>";
    
        return thead+tbody+tfoot;
        
    },
    getReports: async function(date) {
        if(date !== undefined) {
            var dt = new Date(date);
        }
        else {
            var dt = new Date();
        }
        var data = await models.reports.findAll({
            where: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), dt.getFullYear() ),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), dt.getMonth()+1 )
            ],
            attributes: [[sequelize.fn('DATE', sequelize.col('date')), '0'], 'start_cash', 'cash', 'card', 'expense', 'pcstore', 'grupon', 's_prezenty', 'partners', 'exchange', 'end_balance', 'profit', 'bonus' ],
            order: sequelize.col('id'),
            raw: true
        });
        var return_array = [];
        for(i=0; i < data.length; i++) {
            return_array.push([data[i][0], data[i]['start_cash'], data[i]['cash'], data[i]['card'], data[i]['expense'], data[i]['pcstore'], data[i]['grupon'], data[i]['s_prezenty'], data[i]['partners'], data[i]['exchange'], data[i]['end_balance'], data[i]['profit'], data[i]['bonus']]);
        }
        return { status: 1, data: return_array };;
    },
    newPayment: async function(data) {
        var dt = new Date();
        if(data[9] == 1) {
            models.sessions.create({ sort:'Przychód', category:data[1], type: data[3], payment: data[5], main_price: data[2], price: data[6], paid_price: data[7], exchange: data[8], time: dt})
            .then(session => {
                log.log("API", 'Added new payment', 4);
                return { status: 1, data: 'Added new payment' };
            });
        }
        else {
            for(i=0; i<data[9]; i++) {
                await models.sessions.create({ sort:'Przychód', category:data[1], type: data[3], payment: data[5], main_price: data[2], price: data[6], paid_price: data[7], exchange: data[8]/data[9], time: dt})
                .then(session => {
                    log.log("API", 'Added new payment', 4);
                });
            }
            return { status: 1, data: 'Added new payments' };
        }
    },
    newExpense: async function(data) {
        var dt = new Date();
        models.sessions.create({ sort:'Rozchód', category:data[0], type: data[1], payment: 'Gotówka', main_price: data[2], price: data[2], paid_price: data[2], exchange: '0', time: dt})
        .then(session => {
            log.log("API", 'Added new expense', 4);
            return { status: 1, data: 'Added new expense' };
        });
    },
    newReport: async function(end_bal) {
        var report = await this.getSum();
        var dt = new Date();
        var exchange = Math.round( (report['start_cash']+report['cash']-report['expense'])-Number(end_bal) * 100) / 100;
        var bonus = Math.round( ( (report['profit']-report['partners']) * 0.1 ) * 100) / 100;

        models.reports.create({ start_cash: report['start_cash'], cash: report['cash'], card: report['card'], expense: report['expense'], pcstore: report['pcstore'], grupon: report['grupon'], s_prezenty: report['s_prezenty'], profit: report['profit'], partners: report['partners'], exchange: exchange, bonus: bonus, end_balance: end_bal, date: dt})
        .then(session => {
            log.log("API", 'Added new expense', 4);
            return { status: 1, data: 'Added new expense' };
        });
    }
}