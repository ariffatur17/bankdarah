const { query } = require('express');
var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.js');

var db = require('../database')

/* GET home page. */
router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router;