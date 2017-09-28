var express  = require("express"),
    app      = express(),
    http     = require("http"),
    bodyParser  = require("body-parser"),
    server   = http.createServer(app),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var tvShowsControllers = require('./controllers/tvshowsController')(express);

app.use('/tvshows', tvShowsControllers);

mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        server.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
});