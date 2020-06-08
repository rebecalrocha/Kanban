'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const authService = require('../auth-service');
const md5 = require('md5');

exports.get = async (req, res) => {
    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);
    if (auth !== false) {
        return res.status(200).send({ message: "Token Valid" });
    }

    return res.status(401).send({ message: "Token Invalid" });
};

//Cria novo usuário
exports.signup = async (req, res) => {
    let user = await User.find({ email: req.body.email });

    if(user.length) 
        return res.status(400).send({ message: 'Email address not available!' })

    user = new User();
    user.name = req.body.name;

    let emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    if (emailRegex.test(req.body.email)) { user.email = req.body.email }; //não seta email inválido
        
    if (req.body.password) { user.password = md5(req.body.password + global.SALT_KEY) }; //não seta hash em string vazia

    user.save()
    .then(data => {
        res.status(201).send({ message: 'User successfully registered!', data: data });
    }).catch(error => {
        res.status(400).send({ message: 'Failed to register user', data: error })
    });
};

//Loga usuário
exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: md5(req.body.password + global.SALT_KEY) });
        if(!user) {
            res.status(404).send({ message: 'Username or password is invalid!' })
            return;
        }

        const token = await authService.generateToken({user_id: user._id});
        res.status(201).send({ token: token, message: 'User successfully logged in!', user: user });

    } catch (error) {
        res.status(400).send({ message: 'Login failed for user', data: error })
    }
};