var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var User = db.users;
var Profile = db.profile;
var nodemailer = require('nodemailer');


const accessTokenSecret = 'youraccesstokensecret';

/* GET users listing. */
router.get('/current', function(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
            if (err) { res.send(500);}
            else {
                userId = decodedToken._id;
                userName = decodedToken.username;
                first_name = decodedToken.first_name;
            }
        });
        var output = {
            user_id: userId,
            username: userName,
            first_name: first_name,
            meeting_id: "4286239976",
            passcode: "bagus",
            role: 0,
            status: true
        };
        res.send(output);
    } else {
        var output = {
            msg: "Belum login ya",
            status: false
        };
        res.send(output);
    }
});

router.get('/validasi/:id', function(req, res, next) {

    //    const authHeader = req.headers.authorization;
    //    if (authHeader) {
    const userId = req.params.id;
    User.update({
        valid: '1',
    },{
        where: {id: userId}
    }).then(function(datax) {
        if(datax) {
// Percobaan pengiriman Vcard QRCode
    User.findOne({where: {id: req.params.id}})
        .then(function(data) {
            if (data) {
                Profile.findOne({where: {user_id: req.params.id}})
                    .then(function(elem) {
                        if (elem) {
                            console.log(elem);
                            var transport = nodemailer.createTransport({
                                host: "mail.mice.id",
                                port: 587,
                                auth: { 
                                    user: process.env.MAIL_USERNAME,
                                    pass: process.env.MAIL_PASSWORD
                                }
                            });

                            var vcard = `
                                BEGIN:VCARD
                                VERSION:3.0
                                N:${data.getDataValue('last_name')};${data.getDataValue('first_name')};;;
                                FN:${data.getDataValue('first_name')} ${data.getDataValue('last_name')}
                                ORG:MICE.ID;
                                TITLE:Person
                                EMAIL;type=INTERNET;type=WORK;type=pref:${data.email}
                                TEL;type=CELL:${data.getDataValue('no_hp')}
                                item1.ADR;type=HOME:;;${elem.getDataValue('alamat')};${elem.getDataValue('kabupaten')};${elem.getDataValue('provinsi')};${elem.getDataValue('kode_pos')};Indonesia
                                item1.X-ABADR:id
                                NOTE:Kontak ini digenerate pada Event MICE DIENG
                                item2.URL;type=pref:http\://dieng.mice.com/
                                item2.X-ABLabel:_$!<HomePage>!$_
                                CATEGORIES:Work,Event MICE Dieng
                                END:VCARD`;
                                console.log(vcard);
                                const urlapi = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=";
                                const datas = encodeURI(vcard);
                                const message = {
                                    from: 'info@mice.id',
                                    to: data.getDataValue('email'),
                                    subject: "Akun anda sudah di validasi",
                                        //text: "The quick brown fox jumped over the lazy dogs",
                                    html: "Selamat akun anda sudah di validasi, scan qrcode berikut untuk mendapatkan kontak anda <br/><img src='"+urlapi+datas+"'>"
                                };
                                transport.sendMail(message, function(err, info) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(info);
                                    }
                                });
                        }
                    });
            }
        });

            res.send({msg: "Berhasil validasi user", status: true, user_id: userId});
        } else {
            res.send({msg: "Gagal validasi user", status: false, user_id: userId});
        }
    });
    //    }
});

// Yang bisa diedit hanya password
// First Name
// dan Last Name
router.post('/edit', function(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
            if (err) { res.send(500);}
            else {
                userId = decodedToken._id;
                userName = decodedToken.username;
                first_name = decodedToken.first_name;
            }
        });
        User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, salt),
        }, 
        {where: {id: userId}}
        );
    }
});

module.exports = router;
