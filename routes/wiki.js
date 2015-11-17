var express = require('express');
var router = express.Router();
var path = require('path');
var swig = require('swig');
var chalk = require('chalk');
var models = require('../models/');
var User = models.User;
var Page = models.Page;

function urlMaker(str){
	str = str.replace(/\s/g, "-");
	return str.toLowerCase().match(/[\d\w\-]/g).join("");
}

router.get('/', function(req, res, next) {
	Page.find().then(function(allPages) {
		var importantData = allPages.map(function(onePage) {
			return {urlTitle: onePage.urlTitle, title: onePage.title}
		})
		res.render('index', {pages: importantData});
	})
})

router.post('/', function(req, res, next) {
	var body = req.body;
	var page = new Page({
		title: body.title2,
		content: body.pageContents,
		status: body.status,
		urlTitle: urlMaker(body.title2)
	});
	page.save();
	res.redirect(301, "/wiki/");
})

router.get('/add', function(req, res, next) {
	res.render('addpage');
})

router.get('/:pageName', function(req, res, next) {
	Page.findOne({urlTitle : req.params.pageName}).then(function(correctPage) {
		res.render('wikipage', {pageContents: correctPage.content});
	});
});

router.get('/users', function(req, res, next) {
	res.redirect('/');
})

router.get('/users/:username', function(req, res, next) {
	res.redirect('/');
})

router.post('/users', function(req, res, next) {
	res.redirect('/');
})

router.put('/users/:username', function(req, res, next) {
	res.redirect('/');
})

router.delete('/users/:username', function(req, res, next) {
	res.redirect('/');
})


module.exports = router;