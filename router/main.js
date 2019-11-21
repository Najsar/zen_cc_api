const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
var func = require('../func/main');
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/', (req, res) => {
    res.json({status: 1, data: 'Hits main page'});
});
router.get('/cookie/', (req, res) => {
    res.cookie("userData", "test value", {maxAge: (1000*60*60*24)} ); 
    res.json({status: 1, data: 'Hits cookie page', cookie: req.cookies, 'Signed Cookies: ': req.signedCookies});
});
router.post('/api/login/', async (req, res) => {
    var user_name = req.body.user;
    var user_pass = req.body.pass;
    if( req.cookies.userLogin != undefined ) {
        console.log('user has been logged!');
        var user = await func.loginBySession(req.cookies.userLogin);
    }
    else {
        var user = await func.loginUser(user_name, user_pass);
        if(user.status === 1) {
            res.cookie("userLogin", user.session, {maxAge: (1000*60*60*24)} ); 
        }
    }

    res.json({page:'login', data: user});
});
router.get('/api/:data', (req, res) => {
    res.json({data: req.params.data, page:'DATA2'});
});

module.exports = router;