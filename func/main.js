const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
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
        attributes: ['user_id'],
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
            models.login_session.create({ user_id: user_db.id, session: session, date:  Date.now()})
            .then(session => {
                console.log('Session saved as id: '+session.dataValues.id);
            });
            return {status: 1, user: user_db};
        }
        else {
            return {status: 0};
        }
    },
    loginBySession: async function(session) {
        var user_id = (await getUserIdBySession(session)).user_id;
        var user = (await getUserById(user_id)).dataValues;
        console.log(user);
        return user;
    }
}