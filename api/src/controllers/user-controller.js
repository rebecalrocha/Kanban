'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Board = mongoose.model('Board');
const authService = require('../auth-service');
const md5 = require('md5');

//Retorna boards do user
exports.get = async (req, res) => {
    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);

    Board.find({ owner: auth.user_id })
    .then(data => {
        res.status(200).send(data); //ok 
    }).catch(error => {
        res.status(400).send(error)
    });
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

//Edit name
exports.put = async (req, res) => {
    if(!req.body.name) {
        res.status(400).send({ message: 'User must have a name.' })
        return;
    }

    await User.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name}}, {upsert: true})
    .then(data => {
        console.log(data)
        res.status(201).send({ message: 'Nome editado com sucesso', data: data });  
    }).catch(error => {
        console.log(error);
        res.status(400).send({ message: 'Falha ao editar nome do usuário', data: error })
    });
}

//Deleta usuário
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(data => {
        res.status(200).send({message: 'Usuário removido com sucesso!', data: data}); //ok
    }).catch(error => {
        res.status(400).send({message: 'Falha ao remover usuário', error: error})
    });
};