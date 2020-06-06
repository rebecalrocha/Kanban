'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const authService = require('../auth-service');
const md5 = require('md5');

exports.get = async (req, res) => {
    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);
    if (auth !== false) {
        return res.status(200).send({ message: "token valid" });
    }

    return res.status(401).send({ message: "token invalid" });
};

//Cria novo usuário
exports.signup = async (req, res) => {
    let user = await User.find({ email: req.body.email });

    if(user.length) 
        return res.status(400).send({ message: 'Email não disponível' })

    user = new User();
    user.name = req.body.name;

    let emailRegex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    if (emailRegex.test(req.body.email)) { user.email = req.body.email }; //não seta email inválido
        
    if (req.body.password) { user.password = md5(req.body.password + global.SALT_KEY) }; //não seta hash em string vazia

    user.save()
    .then(data => {
        res.status(201).send({ message: 'Usuário cadastrado com sucesso', data: data });
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao cadastrar usuário', data: error })
    });
};

//Loga usuário
exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: md5(req.body.password + global.SALT_KEY) });
        if(!user) {
            res.status(404).send({ message: 'Usuário ou senha inválidos' })
            return;
        }

        const token = await authService.generateToken({user_id: user._id});
        res.status(201).send({ token: token, message: 'Usuário logado com sucesso!', user: user });

    } catch (error) {
        res.status(400).send({ message: 'Falha ao logar usuário', data: error })
    }
};