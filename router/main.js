const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
var func = require('../func/main');
var log = require('../func/log');
const config = require('../config/config.json');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var whitelist = ['http://localhost', 'http://10.0.0.10', 'http://srv.zenonvr.com', 'https://srv.zenonvr.com', 'http://195.117.208.61']
var corsOptions = {
    origin: function (origin, callback) {
        if(!origin) {
            callback(null, true);
            log.log('CORS', "Allowed by CORS: local app", 4, 1);
        }
        else if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
          log.log('CORS', "Allowed by CORS: " + origin, 4, 1);
        } else {
          callback(new Error("Not allowed by CORS"));
          log.log('CORS', "Not allowed by CORS: " + origin, 4, 2);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(cors(corsOptions));

router.use((req, res, next) => {
    log.log('ROUTER', "URL: "+ req.url + " TYPE: " + req.method, 4);
    next();
});

router.get('/', (req, res) => {
    res.json({status: 1, data: 'Hits main page'});
});
router.get('/get_ver/', (req, res) => {
    res.json({status: 1, data: config.version});
});

router.post('/login/', async (req, res) => {
    if(!req.body.user || !req.body.pass) {
        res.json({status: 0, data: 'No data'});
    }
    else {
        var user_name = req.body.user;
        var user_pass = req.body.pass;
        if( req.cookies.userLogin != undefined ) {
            var user = await func.loginBySession(req.cookies.userLogin);
            if(user.status == 0) {
                res.clearCookie('userLogin');
                var user = await func.loginUser(user_name, user_pass);
                if(user.status == 1) {
                    res.cookie("userLogin", user.session, {maxAge: (1000*60*60*24), domain: '.srv.zenonvr.com.com', path: '/', secure: true } );
                    log.log('LOGIN', "Login success | USER ID: " + user.user.id, 4, 1); 
                    res.json({status: 1, data: 'Login success'});
                }
            }
            else {
                log.log('LOGIN', "User already login | USER ID: " + user.user.id, 4, 3);
                res.json({status: 2, data: 'User already login'});
            }
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

router.use('/api/', require("./api"));

router.use('*', (req, res) => {
    log.log('ROUTER', "PAGE NOT FOUND: URL: "+ req.originalUrl + " TYPE: " + req.method, 4, 3);
    res.json({status: 0,error: 404, data: 'Page not found'});
});

module.exports = router;