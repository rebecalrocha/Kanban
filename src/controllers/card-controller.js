'use strict'

const mongoose = require('mongoose');
const list = require("../models/list");
const authService = require('../auth-service');

const Card = mongoose.model('Card');
const List = mongoose.model('List');

function addCardToList(card) {
    console.log('id da lista:   ',card.status);
    console.log('id do card:    ', card._id);
	return List.findByIdAndUpdate(card.status, { $push: { cards: card._id } }, { new: true , upsert: true },
        function (err, data) {
            if (err) throw err;
            console.log(data); 
        });
};

function removeCardToList(card_id, list_id) {
    console.log(card_id, list_id);
    return List.findByIdAndDelete(list_id, {$pop: {cards: card_id}}, 
        function (err, data){
            if (err) throw err;
            console.log('data do if: ', data);
        })
        .then(data => console.log('data do then: ', data))
        .catch(error => console.error('error: ', error));
};
//retorna um card
exports.get = async (req, res) => {
    Card.findOne({ id: req.params.id })
    .then(data => {
        res.status(200).send(data); //ok 
    }).catch(error => {
        res.status(400).send(error)
    });
};


exports.get = async (req, res) => {
    Card.find({})
    .then(data => {
        res.status(200).send(data); //ok 
    }).catch(error => {
        res.status(400).send(error)
    });
};

//Cria novo card
exports.post = async (req, res) => {

    let card = new Card();
    card.description = req.body.description; //informação do card
    card.status = req.body.status;
    addCardToList(card);
    card.save()
    .then(data => {
        res.status(201).send({ message: 'Card registrado com sucesso', data: data }); //created 
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao registrar card', data: error })
    });
};

//Altera status
exports.put = async (req, res) => {
    await removeCardToList (req.params.id, req.body.old_status);
    const card = await Card.findByIdAndUpdate(req.params.id, { $set: { status : req.body.new_status } }, { new:true })

    addCardToList(data)
    .then(data => {
        res.status(201).send({ message: 'Card alterado com sucesso', data: data }); //created 
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao alterar card', data: error })
    });
};

exports.edit = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, { $set: { status : req.body.status } }, { new:true })
    .then(data => {
        res.status(201).send({ message: 'Card editado com sucesso', data: data }); //created 
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao editado card', data: error })
    });
};

exports.delete = (req, res) => {
    Card.findByIdAndRemove(req.params.id)
    .then(data => {
        res.status(200).send({message: 'Card removido com sucesso', data: data}); //ok
    }).catch(error => {
        res.status(400).send({message: 'Falha ao remover card', data: error})
    });
};