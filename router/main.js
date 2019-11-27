const express = require('express');
const router = express.Router();
const api = express.Router();
var bodyParser = require("body-parser");
var func = require('../func/main');
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.use((req, res, next) => {
    func.log('ROUTER', "URL: "+ req.url + " TYPE: " + req.method, 4);
    next();
});
api.use( async (req, res, next) => {
    func.log('ROUTER', "Used API middleware", 4);
    if( req.cookies.userLogin != undefined ) {
        var user = await func.loginBySession(req.cookies.userLogin);
        if(user.status == 0) {
            res.clearCookie('userLogin');
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
            func.log('ROUTER', "Saved ip address: " + ip, 4, 3);
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
        func.log('ROUTER', "User not authenticated, stop script", 4, 3);
        res.json({status:0, data: 'User not login'});
    }
    else {
        func.log('ROUTER', "User authenticated, id: " + login + ", executing script", 4, 1);
        next();
    }
})

router.get('/', (req, res) => {
    res.json({status: 1, data: 'Hits main page'});
});

router.post('/login/', async (req, res) => {
    var user_name = req.body.user;
    var user_pass = req.body.pass;
    if( req.cookies.userLogin != undefined ) {
        var user = await func.loginBySession(req.cookies.userLogin);
        if(user.status == 0) {
            res.clearCookie('userLogin');
            if(user_name == undefined || user_pass == undefined) {
                res.json({status: 0, data: 'No data'});
            }
            else {
                var user = await func.loginUser(user_name, user_pass);
                if(user.status == 1) {
                    res.cookie("userLogin", user.session, {maxAge: (1000*60*60*24)} );
                    func.log('LOGIN', "Login success | USER ID: " + user.user.id, 4, 1); 
                    res.json({status: 1, data: 'Login success'});
                }
            }
        }
        else {
            func.log('LOGIN', "User already login | USER ID: " + user.user.id, 4, 3);
            res.json({status: 2, data: 'User already login'});
        }
    }
    else {
        if(user_name == undefined || user_pass == undefined) {
            func.log('LOGIN', "No data was send", 4, 3);
            res.json({status: 0, data: 'No data'});
        }
        else {
            var user = await func.loginUser(user_name, user_pass);
            if(user.status == 1) {
                res.cookie("userLogin", user.session, {maxAge: (1000*60*60*24)} ); 
                res.json( {status: 1, data: 'Login success'} );
            }
            else {
                res.json( {status: 0, data: 'Login failed'} );
            }
        }
    }
});

api.get('/data/:data', (req, res) => {
    res.json({data: req.params.data, page:'DATA2'});
});
api.get('/sql/', async (req, res) => {
    var user = await func.sql();
    res.json({status:1, data: user});
});
api.get('/get_user/', async (req, res) => {
    var user = await func.loginBySession(req.cookies.userLogin);
    res.json({status: 1, data: user});
});

api.post('/gen_pass/', async (req, res) => {
    var hash = await func.genPass(req.body.pass);
    res.json({status:1, data: hash});
});


router.use('/api/', api);

router.use('*', (req, res) => {
    func.log('ROUTER', "PAGE NOT FOUND: URL: "+ req.originalUrl + " TYPE: " + req.method, 4, 3);
    res.json({status: 0,error: 404, data: 'Page not found'});
});

module.exports = router;