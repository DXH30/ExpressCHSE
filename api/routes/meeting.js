var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

router.get('/', function(req, res, next) {
    res.render('meeting', {title: 'Meeting'});
});

router.get('/get_meeting', function(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        jwt.verify(token, accessTokenSecret, function(err, decodedToken) {
            if (err) { res.send(500);}
            else {
                userId = decodedToken.id;
                userName = decodedToken.username;
                first_name = decodedToken.first_name;
            }
        });
        var output = {
            user_id: userId,
            username: userName,
            first_name: first_name,
//            meeting_id: "98845976373",
//            meeting_id: "91837790628",            
            meeting_id: "98845976373",            
            passcode: "bagus",
            role: 0,
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

router.post('/create_meeting', function(req, res, next) {
    var authorize_url = "https://zoom.us/oauth/authorize";
    var access_token_url = "https://zoom.us/oauth/token";
    var room_url = "https://api.zoom.us/v2/rooms";
    // MeetingID
    // Passcode
});

router.post('/add_peserta', function(req, res, next) {
    // ID
    // MeetingID
    // Role
});

module.exports = router;
