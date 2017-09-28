var express  = require("express"),
    app      = express(),
    http     = require("http"),
    bodyParser  = require("body-parser"),
    server   = http.createServer(app),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
