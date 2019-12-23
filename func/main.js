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
        
    }
}