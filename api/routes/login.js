var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');
var bcrypt = require('bcrypt');
var User = db.users;

const accessTokenSecret = 'youraccesstokensecret';

router.post('/', function(req, res, next) {
    const user = User.findAll({ where: {
        username: req.body.username,
    }})
    .then(data => {
        const accessToken = jwt.sign({ 
            _id: data[0].id,
            email: data[0].email,
            username: data[0].username, 
            password: data[0].password,
            first_name: data[0].first_name
        }, accessTokenSecret);
        //        res.json({accessToken});
        var cek_password = bcrypt.compareSync(req.body.password, data[0].password);
        if (cek_password == true) {
            res.send({ status: true, tipe: data[0].tipe, valid: data[0].valid,accessToken});
        } else {
            //            res.send(data[0].password);
            res.send({ status: false, msg: "Password anda salah"});
        }
    })
    .catch(err => {
        res.send({status: false, msg: 'Username or password incorrect'});
    });
});

router.post('/email', function(req, res, next) {
    const user = User.findAll({ where: {
        email: req.body.email,
    }})
    .then(data => {
        const accessToken = jwt.sign({ 
            _id: data[0].id,
            email: data[0].email,
            username: data[0].username, 
            password: data[0].password,
            first_name: data[0].first_name
        }, accessTokenSecret);
        //        res.json({accessToken});
        //        var cek_password = bcrypt.compareSync(req.body.password, data[0].password);
        //        if (cek_password == true) {
        //            res.send({ status: true, accessToken});
        //        } else {
        //            res.send(data[0].password);
        //            res.send({ status: false, msg: "Password anda salah"});
        //        }
        res.send({ status: true, accessToken});
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;
