var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../models');

var base64Img = require('base64-img');
var Pembayaran = db.pembayaran;
var Profile = db.profile;
var User = db.users;
var fs = require('fs');
var path = require('path');
var appRoot = require('app-root-path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        var dir = './public/images';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage});
const accessTokenSecret = 'youraccesstokensecret';


// Fungsi untuk encode_base64
function encode_base64(filename) {
    fs.readFile(path.join(appRoot+'/public/images/',filename),function(error,data){
        if(error){
            throw error;
        } else {
            var buf = Buffer.from(data);
            var base64 = buf.toString('base64');
            //console.log('Base64 of ddr.jpg :' + base64);
            return base64;
        }
    });
}

function decode_base64(base64str , filename){
    var buf = Buffer.from(base64str,'base64');
    fs.writeFile(path.join(appRoot+'/public/images/',filename), buf, function(error){
        if(error){
            throw error;
        }else{
            console.log('File created from base64 string!');
            return true;
        }
    });
}

// Create Pembayaran
router.post('/', upload.single('pembayaran'), function(req, res, next) {
    const file = req.file;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];

        // Mengambil profile by Id
        jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
            if (err) { res.send({msg: "Salah"}) }
            else {
                userId = decodedToken._id;
                var values = {
                    userid: userId,
                    keterangan: req.body.keterangan,
                    nominal: req.body.nominal,
                    no_rek: req.body.no_rek,
                    kurir: req.body.kurir,
                    nama_file: "pembayaran_"+userId+".png"
                };

                // Jika userid ada maka hapus pembayaran
                Pembayaran.destroy({where: {userid: userId}});

                // Ganti nama setelah upload flie menjadi value.nama_file
                if (file) {
                    fs.rename('./public/images/'+req.file.originalname,'./public/images/'+values.nama_file, function(err) {
                        if ( err ) console.log('ERROR: ' + err);
                    });
                    Pembayaran.create(values)
                        .then(function(data) {
                            if (data) {
                                res.send({msg: "Berhasil input pembayaran", status: true});
                            } else {
                                res.send({msg: "Gagal input pembayaran", status: false});
                            }
                        });
                } else {
                    res.send({msg: "Gagal input pembayaran", status: false});
                }

                // Upload file
                //                decode_base64(req.body.gambar, values.nama_file);
            }
        });
    }
});

// Halaman Pembayaran

router.get('/page', function(req, res, next) {
    var data_pembayaran = [];
    var data_profile = [];
    var data_user = [];
    // Ambil join
    //db.query("SELECT pembayarans.nominal as nominal, pembayarans.userid as userid, profiles.alamat as alamat FROM pembayarans JOIN profiles ON pembayarans.userid = profiles.user_id", {type: db.QueryTypes.SELECT}).then(function(data) {
    // Ambil semua data pembayaran
    Pembayaran.findAll().then(function(data) {
        if (data) {
            data_pembayaran = data;
            Profile.findAll().then(function(data) {
                if (data) {
                    data_profile = data;
                    User.findAll().then(function(data) {
                        if (data) {
                            data_user = data;
                            res.render('pembayaran.ejs', {
                                title: 'Pembayaran', 
                                pembayaran: data_pembayaran, 
                                profile: data_profile,
                                user: data_user
                            });
                        }
                    });
                }
            });
        } else {
            data_pembayaran = {};
        }
    });
});

// Read Pembayaran
router.get('/', function(req, res, next) {
    Pembayaran.findAll()
        .then(function(data) {
            if (data) {
                res.send({data, status: true});
            } else {
                res.send({data, status: false});
            }
        });
});

router.get('/:id', function(req, res, next) {
    Pembayaran.findAll({where: {userid: req.params.id}})
        .then(function(data) {
            if (data) {
                res.send({data, status: true});
            } else {
                res.send({data, status: false});
            }
        });
});

// Update Pembayaran
router.post('/:id', function(req, res, next) {
    Pembayaran.update(values, {where: {userid: req.params.id}})
        .then(function(data) {
            if (data) {
                res.send({data, status: true});
            } else {
                res.send({data, status: false});
            }
        });
});

// Delete Pembayaran | hanya untuk admin
router.delete('/:id', function(req, res, next) {
    Pembayaran.destroy({where: {userid: req.params.id}})
        .then(function(data) {
            if (data) {
                res.send({data, status: true});
            } else {
                res.send({data, status: false});
            }
        });
});

module.exports = router;
