const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const models = require('../models/index');

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
function genPass(pass) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}
async function checkPass(user, pass) {
    var hash = (await getHash(user)).Pass;
    return bcrypt.compareSync(pass, hash);
   
}

module.exports = {
    loginUser: async function(user, pass) {
        if(await checkPass(user, pass)) {
            return {status: 1, user: await getUser(user)};

        }
        else {
            return {status: 0};
        }
    }
}