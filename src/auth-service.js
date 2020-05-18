'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorizeUser = function(req, res, next) {
    let token = req.headers['x-api-key']
    if(!token){
        res.status(401).json({ message: 'Acesso Restrito' });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if(error)
                res.status(401).json({ messagem: 'Token Inválido' });
            else
                next();
        });
    }

}