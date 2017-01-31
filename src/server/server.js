import di from './container';

const path = require('path');
require("babel-core/register");
require("babel-polyfill");
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(function (req, res, next) {
    const stats = di.get('stats');
    stats.registerIncomingRequest(req.originalUrl, req.params, Date.now())
    //console.log(stats.getStatistic(), req.params)
    next();
})

app.use('/', express.static(path.join(__dirname, process.env.PUBLIC_DIR)))

app.listen(8080, function () {
    console.log('Server listening on port 8080!')
})
