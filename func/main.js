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
        var return_array = [];
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
    }
}