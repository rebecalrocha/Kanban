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
        res.status(404).send(error)
    });
};

//Edit name
exports.put = async (req, res) => {
    if(!req.body.name) {
        res.status(400).send({ message: 'User must have a name.' })
        return;
    }

    await User.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name}}, {upsert: true})
    .then(data => {
        res.status(201).send({ message: 'Nome editado com sucesso', data: data });  
    }).catch(error => {
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