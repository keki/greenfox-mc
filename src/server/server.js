import di from './container';

const path = require('path');
require("babel-core/register");
require("babel-polyfill");
const express = require('express');
const app = express();

const stats = di.get('stats');

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(function (req, res, next) {
    stats.registerIncomingRequest(req.originalUrl, req.params, Date.now())
    next();
})

app.use('/', express.static(path.join(__dirname, process.env.PUBLIC_DIR)))

app.get('/stat', function (req, res) {
    res.json(stats.getStatistic());
})

app.listen(8080, function () {
    console.log('Server listening on port 8080!')
})
