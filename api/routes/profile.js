var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');
var bcrypt = require('bcrypt');
var var_dump = require('var_dump');
var async = require('async');
var User = db.users;
var Profile = db.profile;

const accessTokenSecret = 'youraccesstokensecret';

router.get('/', function(req, res, next) {
    // Mengambil profile by Id
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];

        // Mengambil profile by Id
        jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
            if (err) { res.send({msg: "Salah"}) }
            else {
                userId = decodedToken._id;
                Profile.findOne({where: {user_id: userId}})
                    .then(data => {
                        if (data) {
                            res.send(data);
                        } else {
                            res.send({status: false, msg: "Profile tidak ada"});
                        }
                    }).catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Terjadi kesalahan saat mengambil data user"
                        });
                    });
            }
        });
    }
});

router.get('/user', function(req, res, next) {
    const userId = req.body.user_id;
    Profile.findOne({where: {user_id: userId}})
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan saat mengambil data user"
            });
        });
});

router.post('/', function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];

        // Menginput profile by Id
        jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
            if (err) { }
            else {
                var userId = decodedToken._id;
                var userName = decodedToken.username;
                values = {
                    user_id: userId,
                    alamat: req.body.alamat,
                    no_hp: req.body.no_hp,
                    provinsi: req.body.provinsi,
                    kabupaten: req.body.kabupaten,
                    kab_id: req.body.kab_id,
                    prov_id: req.body.prov_id,
                    kode_pos: req.body.kode_pos
                };
                //                var update_profile = Profile.create(values);
                //                const data = await Profile.count({where: {user_id: userId}});
                var upprof = Profile.update(
                        {
                            user_id: userId,
                            alamat: req.body.alamat,
                            no_hp: req.body.no_hp,
                            provinsi: req.body.provinsi,
                            kabupaten: req.body.kabupaten,
                            kode_pos: req.body.kode_pos
                        },
                        {where: {user_id: userId}}
                        );
                if (!upprof) {
                    res.send({msg: "Gagal", id: userId, values});
                } else {
                    res.send({msg: "Berhasil", id: userId, values});
                }
            }
        });
    }
    res.send({msg: "Belum Login", status: false});
});

module.exports = router;
