const express = require('express');

const app = express();
const port = 3080;

app.disable('x-powered-by');
app.set('views', __dirname);

app.use('/', require('./router/main'));

app.listen(port, () => console.log(`Server running on port ${port}!`));