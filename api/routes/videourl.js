var express = require('express');
var router = express.Router();
var db = require('../models');
var Video = db.video;

/* GET home page. */
router.get('/', function(req, res, next) {
    var videourl = Video.findAll({}).then(function(obj) {
        res.send(obj);
    });;
});

router.post('/', function(req, res, next) {
    Video.findOne({where: {id: 1}})
        .then(function(obj) {
            if (obj) {
                obj.update({url: req.body.url});
                res.send({msg: "Update Video berhasil", status: true});
            } else {
                obj.create({url: req.body.url});
                res.send({msg: "Tambah Video berhasil", status: true});
            }
        });
});

module.exports = router;
