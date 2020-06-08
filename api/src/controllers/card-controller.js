'use strict'

const mongoose = require('mongoose');

const Card = mongoose.model('Card');
const Board = mongoose.model('Board');

function addCardToBoard(card) {
	return Board.findByIdAndUpdate(card.board, {$push: {cards: card._id}}, {upsert: true},
        function (err, data) {
            if (err) throw err;
            console.log('card added: ', data); 
        });
};

function removeCardToBoard(card) {
    console.log(card._id, card.owner);
    return Board.findByIdAndUpdate(card.board, {$pull: {cards: card._id}}, 
        function (err, data){
            if (err) throw err;
            console.log('card deleted: ', data);
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

//Cria novo card
exports.post = async (req, res) => {
    let card = new Card();
    card.description = req.body.description;
    card.status = req.body.status;
    card.board = req.body.board_id;
    
    card.save()
    .then(data => {
        addCardToBoard(data);
        res.status(201).send({ message: 'Card successfully created!', data: data });
    }).catch(error => {
        res.status(400).send({ message: 'Failed to create card', data: error })
    });
};


exports.put = async (req, res) => {
    //Altera status do card
    if(req.body.status){
        Card.findByIdAndUpdate(req.params.id, { $set: { status : req.body.status } }, { new:true })
        .then(data => {
            res.status(201).send({ message: 'Card status successfully edited!', data: data });  
        }).catch(error => {
            res.status(400).send({ message: 'Failed to edit card status', data: error })
        });
    }
    //Altera conteúdo do card
    if(req.body.description){
        Card.findByIdAndUpdate(req.params.id, { $set: { description : req.body.description } }, { new:true })
    .then(data => {
        res.status(201).send({ message: 'Card content successfully edited!', data: data });  
    }).catch(error => {
        res.status(400).send({ message: 'Failed to edit card content', data: error })
    });
    }
    
};

//Deleta card
exports.delete = (req, res) => {
     Card.findByIdAndDelete(req.params.id)
    .then(async data => {
        await removeCardToBoard(data);
        res.status(200).send({message: 'Card successfully  deleted!', data: data}); 
    }).catch(error => {
        res.status(400).send({message: 'Failed to delete card', data: error})
    });
};