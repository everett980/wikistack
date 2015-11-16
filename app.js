var express = require('express');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var swig = require('swig');
var path = require('path');

var app = express();
var port = 3000;


// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});



app.listen(port);

app.use(bodyParser.json());

app.get('/', function(req, res) {
	console.log(req.body);
	res.sendFile(path.join(__dirname.toString(), '/views/index.html'));
})