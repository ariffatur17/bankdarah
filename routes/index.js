const { query } = require('express');
var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.js');

var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', session : req.session });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express', session : req.session });
});

router.get('/donor', function(req, res, next) {
  res.render('donor', { title: 'Express', session : req.session });
});

router.get('/request', function(req, res, next) {
  res.render('request', { title: 'Express', session : req.session });
});

module.exports = router;
