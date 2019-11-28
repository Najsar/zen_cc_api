const express = require('express');
const api = express.Router();
var bodyParser = require("body-parser");
var func = require('../func/main');
var log = require('../func/log');
var cookieParser = require('cookie-parser');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cookieParser());

api.use( async (req, res, next) => {
    log.log('ROUTER', "Used API middleware", 4);
    if( req.cookies.userLogin != undefined ) {
        var user = await func.loginBySession(req.cookies.userLogin);
        if(user.status == 0) {
            res.clearCookie('userLogin');
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
            log.log('ROUTER', "Saved ip address: " + ip, 4, 2);
            login = 0;
        }
        else {
            login = user.user.id;
        }
    }
    else {
        login = 0;
    }

    if(login == 0) {
        log.log('ROUTER', "User not authenticated, stop script", 4, 2);
        res.json({status:0, data: 'User not login'});
    }
    else {
        log.log('ROUTER', "User authenticated, id: " + login + ", executing script", 4, 1);
        next();
    }
});

/*api.get('/data/:data', (req, res) => {
    res.json({data: req.params.data, page:'DATA2'});
});*/

api.get('/get_products/', async (req, res) => {
    var user = await func.getProducts();
    res.json({status:1, data: user});
});
api.get('/get_user/', async (req, res) => {
    var user = await func.loginBySession(req.cookies.userLogin);
    res.json({status: 1, data: user.user});
});
api.get('/get_profit/', async (req, res) => {
    var data = await func.getProfit();
    res.json({status: 1, data: data});
});
api.get('/logout/', async (req, res) => {
    res.clearCookie('userLogin');
    res.json({status: 1, data: 'Logout success'});
});

api.post('/gen_pass/', async (req, res) => {
    var hash = await func.genPass(req.body.pass);
    res.json({status:1, data: hash});
});

module.exports = api;