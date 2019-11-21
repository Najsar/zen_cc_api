const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
var func = require('../func/main');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.json({status: 1, data: 'Hits main page'});
});
router.post('/api/login/', async (req, res) => {
    var user_name = req.body.user;
    var user_pass = req.body.pass;
    var user = await func.loginUser(user_name, user_pass);

    res.json({page:'login', data: user});
});
router.get('/api/:data', (req, res) => {
    res.json({data: req.params.data, page:'DATA2'});
});

module.exports = router;