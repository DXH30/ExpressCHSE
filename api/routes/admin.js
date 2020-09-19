var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var User = db.users;
var authenticateJWT = require('../auth');

// Insert User by Id
router.put('/user', function(req, res, next) {
    res.send({msg: "Belum dibuat boi", status: false});
});

router.get('/user', function(req, res, next) {
      User.findAll({}).then(function(data) {
            if (data) {
                res.send(data);
            } else {
                res.send({msg: "Data masih kosong", status: false});
            }
        });
});
// Read User by Id
router.get('/user/:id', function(req, res, next) {
    User.findByPk(req.params.id).then(function(data) {
        if (data) {
            res.send(data);
        } else {
            res.send({msg: "Data masih kosong", status: false});
        }
    });
});

// Update User by Id
router.post('/user', function(req, res, next) {
    var values = req.body;
    if (req.body.password) {
        values.password = bcrypt.hashSync(req.body.password, salt);
    }
    User.update(values,{where: {id: req.body.id}}).then(function(data) {
        if (data) {
            res.send({msg: "Update user berhasil", values});
        } else {
            res.send({msg: "Update user gagal", value});
        }
    });
});

// Delete User by Id
router.delete('/user/:id', function(req, res, next) {
    User.destroy({where: {id: req.params.id}}).then(function(data) {
        if (data) {
            res.send({msg: "Berhasil di delete", data});
        }
    });
});

module.exports = router;
