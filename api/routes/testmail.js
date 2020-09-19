var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var qrcode = require('qrcode');

router.get('/', function(req, res, next) {
    var transport = nodemailer.createTransport({
        host: "mail.mice.id",
        port: 587,
        auth: { 
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    // Percobaan pengiriman Vcard QRCode
    var vcard = `
        BEGIN:VCARD
        VERSION:3.0
        N:Doe;John;;;
        FN:John Doe
        ORG:Example.com Inc.;
        TITLE:Imaginary test person
        EMAIL;type=INTERNET;type=WORK;type=pref:johnDoe@example.org
        TEL;type=WORK;type=pref:+1 617 555 1212
        TEL;type=CELL:+1 781 555 1212
        TEL;type=HOME:+1 202 555 1212
        TEL;type=WORK:+1 (617) 555-1234
        item1.ADR;type=WORK:;;2 Example Avenue;Anytown;NY;01111;USA
        item1.X-ABADR:us
        item2.ADR;type=HOME;type=pref:;;3 Acacia Avenue;Newtown;MA;02222;USA
        item2.X-ABADR:us
        NOTE:John Doe has a long and varied history\, being documented on more police files that anyone else. Reports of his death are alas numerous.
        item3.URL;type=pref:http\://www.example/com/doe
        item3.X-ABLabel:_$!<HomePage>!$_
        item4.URL:http\://www.example.com/Joe/foaf.df
        item4.X-ABLabel:FOAF
        item5.X-ABRELATEDNAMES;type=pref:Jane Doe
        item5.X-ABLabel:_$!<Friend>!$_
        CATEGORIES:Work,Test group
        X-ABUID:5AD380FD-B2DE-4261-BA99-DE1D1DB52FBE\:ABPerson
        END:VCARD`;
    const urlapi = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=";
    const data = encodeURI(vcard);
    const message = {
        from: 'info@mice.id',
        to: 'dhs0223@gmail.com',
        subject: "Percobaan kirim email",
        //text: "The quick brown fox jumped over the lazy dogs",
        html: "Test ini qrcode <img src='"+urlapi+data+"'>"
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
});

module.exports = router;
