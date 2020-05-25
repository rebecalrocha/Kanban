'use strict'

const mongoose = require('mongoose');
const authService = require('../auth-service');

const Card = mongoose.model('Card');
const User = mongoose.model('User');

function addCardToUser(card) {
    console.log('id do user:   ',card.owner);
    console.log('id do card:    ', card._id);
	return User.findByIdAndUpdate(card.owner, {$push: {cards: card._id}}, {upsert: true},
        function (err, data) {
            if (err) throw err;
            console.log('card adicionado: ', data); 
        });
};

function removeCardToUser(card) {
    console.log(card._id, card.owner);
    return User.findByIdAndDelete(card.owner, {$pop: {cards: card._id}}, 
        function (err, data){
            if (err) throw err;
            console.log('card deletado: ', data);
        })
};

//Retorna um card
exports.getOne = async (req, res) => {
    Card.findOne({ _id: req.params.id })
    .then(data => {
        console.log(data);
        res.status(200).send(data); //ok 
    }).catch(error => {
        res.status(400).send(error)
    });
};

//Retorna todos os cards de um user
exports.getAll = async (req, res) => {
    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);

    let response = { todo: [], doing: [], done: [] }
    Card.find({ owner: auth.user_id })
    .then(data => {
        response.todo = data.filter(card => card.status == 'todo');
        response.doing = data.filter(card => card.status == 'doing');
        response.done = data.filter(card => card.status == 'done');
        res.status(200).send(response); //ok 
    }).catch(error => {
        res.status(400).send(error)
    });
};

//Cria novo card
exports.post = async (req, res) => {
    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);

    let card = new Card();
    card.description = req.body.description; //informação do card
    card.status = req.body.status;
    card.owner = auth.user_id;
    
    card.save()
    .then(data => {
        addCardToUser(data);
        res.status(201).send({ message: 'Card registrado com sucesso', data: data }); //created 
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao registrar card', data: error })
    });
};


exports.put = async (req, res) => {
    //Altera status do card
    if(req.body.status){
        Card.findByIdAndUpdate(req.params.id, { $set: { status : req.body.status } }, { new:true })
        .then(data => {
            res.status(201).send({ message: 'Status do card alterado com sucesso', data: data });  
        }).catch(error => {
            res.status(400).send({ message: 'Falha ao alterar status do card', data: error })
        });
    }
    //Altera conteúdo do card
    if(req.body.description){
        Card.findByIdAndUpdate(req.params.id, { $set: { description : req.body.description } }, { new:true })
    .then(data => {
        res.status(201).send({ message: 'Card editado com sucesso', data: data });  
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao editado card', data: error })
    });
    }
    
};

//Deleta card
exports.delete = (req, res) => {
     Card.findByIdAndDelete(req.params.id)
    .then(async data => {
        await removeCardToUser(data);
        res.status(200).send({message: 'Card removido com sucesso', data: data}); 
    }).catch(error => {
        res.status(400).send({message: 'Falha ao remover card', data: error})
    });
};