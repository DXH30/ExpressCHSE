var jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[0];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log(token);
                return res.status(403).send({msg: "Maaf terjadi keasalahan"});
//return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).send({msg: "Maaf anda belum login", status: 401});
    }
};

module.exports = authenticateJWT;
