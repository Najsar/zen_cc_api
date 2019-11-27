const express = require('express');
const config = require(__dirname + '/config/config.json');
var func = require('./func/log');

const app = express();

app.disable('x-powered-by');
app.set('views', __dirname);

app.use('/', require('./router/main'));

app.listen(config.port, () => func.log("SERVER",`Server running on port: ${config.port}`, 0));