var express = require('express'),
    app = express(),
    server,
    devDB = require('devDB'),
    homeRender = require('./pages/home.js');
    devRender = require('./pages/dev.js');

devDB(function (err, data) {
    if (err) {
        //res.send('Error.</h1>');
    }

    app.get('/', function (req, res) {
        data.fetchAll(function (err, result) {
            res.send(homeRender(result));
        });
    });

    app.get('/dev/:login', function (req, res) {
        var login = req.params.login;
        data.findByLogin(login, function (err, result) {
            res.send(devRender(result));
        });

    });
    
    server = app.listen(3000, function () {
        console.log('listening on port %d', server.address().port);
    });
});

