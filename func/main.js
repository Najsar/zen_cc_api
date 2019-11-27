const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const fs = require('fs');
const models = require('../models/index');

function genPass(pass) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}

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
    log: function(trigger, message, type=0, level) {
        const config = require('../config/config.json');
        var type_file = "";
        var log_send = 0;
        type_info = ["\x1b[34m[INFO]", "\x1b[32m[SUCCESS]", "\x1b[33m[WARNING]", "\x1b[31m[ERROR]", "\x1b[35m[DEBUG]", "\x1b[95m[VERBOSE]", "\x1b[34m[INFO]"];
        type_file = ["[INFO]", "[SUCCESS]", "[WARNING]", "[ERROR]", "[DEBUG]", "[VERBOSE]", "[INFO]"];

        if(config.debug_level == 2) {
            log_send = 1;

            if(level != undefined) {
                type_info_send = type_info[type] + type_info[level];
                type_file_send = type_file[type] + type_file[level];
            }
            else {
                type_info_send = type_info[type];
                type_file_send = type_file[type];
            }
        }
        else if(config.debug_level == 1) {
            if(type < 5) {
                log_send = 1;
                if(level !== undefined) {
                    type_info_send = type_info[type] + type_info[level];
                    type_file_send = type_file[type] + type_file[level];
                }
                else {
                    type_info_send = type_info[type];
                    type_file_send = type_file[type];
                }
            }
        }
        else {
            if(type < 4) {
                log_send = 1;
                
                type_info_send = type_info[type];
                type_file_send = type_file[type];
            }
        }
        if(log_send == 1) {

            fs.appendFile("logs/"+new Date().toLocaleDateString()+".log", "[" + new Date().toLocaleTimeString() + "][" + trigger + "]"+ type_file_send +" " + message+"\n", (err) => {
                if(err) console.log("\x1b[90m[" + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + "]\x1b[96m[LOGGER]\x1b[31m[ERROR] \x1b[0m" + "ERROR while saving log! | ERROR: " + err);
            }); 
            console.log("\x1b[90m[" + new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + "]\x1b[96m[" + trigger + "]"+ type_info_send +" \x1b[0m" + message);
        }
    },
    loginUser: async function(user, pass) {
        if(await checkPass(user, pass)) {
            var session = gen(16);
            var user_db = await getUser(user);
            var dt = new Date();
            dt.setTime(dt.getTime() + (24 * 60 * 60 * 1000));
            models.login_session.create({ user_id: user_db.id, session: session, date:  dt})
            .then(session => {
                this.log("LOGIN", 'Session saved as id: '+session.dataValues.id, 5);
            });
            return {status: 1, user: user_db, session: session};
        }
        else {
            this.log("LOGIN", 'Username / Password not found', 4, 3);
            return { status: 0 };
        }
    },
    loginBySession: async function(session) {
        var user_id = (await getUserIdBySession(session));
        if(user_id == null) {
            this.log('LOGIN', "Session not found, remove cookie", 4, 3);
            return { status: 0 };
        }
        else {
            var user_date = new Date(user_id.date);
            var current_date = new Date();
            if(current_date > user_date) {
                this.log('LOGIN', "Session expired, remove cookie", 4, 3);
                return { status: 0 };
            }
            else {
                var user = (await getUserById(user_id.user_id)).dataValues;
                return { status: 1, user: user };
            }
        }
    },
    genPass: function(pass) {
        this.log('genPass', "Generating hash...", 4, 1);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pass, salt);
        this.log('genPass', "HASH: " + hash, 4, 1);
        return hash;
    },
    sql: async function() {
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
        this.log("SQL", "Get data from database", 5);
        for(i=0; i<product_list.length;i++) {
            var temp_array = [ product_list[i]['id'], product_list[i]['product_type']['type'], product_list[i]['name'], product_list[i]['price'], product_list[i]['product_type']['id'], product_list[i]['product_type']['cash'], product_list[i]['product_type']['use_in_bonus'], product_list[i]['product_type']['fixed_price'] ];
            return_array.push(temp_array);
        }
        return return_array;
    }
}