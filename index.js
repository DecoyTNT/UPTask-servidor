const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes());

app.listen(4000);