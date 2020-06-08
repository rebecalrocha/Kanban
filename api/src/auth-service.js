'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '14h' });
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY, (err, decode) => {
        if (err) {
            return false;
        }

        return decode;
    });

    return data;
}

exports.authorizeUser = function(req, res, next) {
    let token = req.headers['x-api-key']
    if(!token){
        res.status(401).json({ message: 'Restricted Access' });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if(error)
                res.status(401).json({ messagem: 'Invalid Token' });
            else
                next();
        });
    }

}