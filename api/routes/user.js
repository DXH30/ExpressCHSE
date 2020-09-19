var express = require('express');
var router = express.Router();
var db = require('../models');
var User = db.users;

router.get('/', function(res, req, next) {
    // Ambil user by id
});

module.exports = router;
