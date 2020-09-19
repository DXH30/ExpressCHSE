var express = require('express');
var db = require('../models');
var User = db.users;
var Profile = db.profile;
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var authenticateJWT = require('../auth');
var nodemailer = require('nodemailer');

const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const accessTokenSecret = 'youraccesstokensecret';

router.post('/', function(req, res, next) {
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email,
        no_hp: req.body.no_hp,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        tipe: req.body.tipe
    };

    var buat_user = User.create(user)
        .then(data => {
            var upprof = Profile.findOrCreate({
                where: {user_id: data.id},
                defaults: {}
            });
            res.send(data);
        }).catch(function (err) {
            res.send({msg: 'Gagal', status: 2});
            next(err);
        });
    if (buat_user) {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
        });

        // send mail with defined transport object
        let info = transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS, // sender address
            to: req.body.email, // list of receivers
            subject: "Selamat anda telah berhasil melakukan registrasi di MICE DIENG ", // Subject line
//            text: "Selamat anda telah di registrasi", // Plain text body
            html: "<b>Selamat anda telah di registrasi, silahkan login di <a href='https://dieng.mice.id/masuk'>https://dieng.mice.id/masuk</a></b>", // html body
        });


        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
});

module.exports = router;
