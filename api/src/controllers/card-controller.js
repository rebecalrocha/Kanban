'use strict'

const mongoose = require('mongoose');

const Card = mongoose.model('Card');
const Board = mongoose.model('Board');

function addCardToBoard(card) {
    console.log('id do board:   ',card.board);
    console.log('id do card:    ', card._id);
	return Board.findByIdAndUpdate(card.board, {$push: {cards: card._id}}, {upsert: true},
        function (err, data) {
            if (err) throw err;
            console.log('card adicionado: ', data); 
        });
};

function removeCardToBoard(card) {
    console.log(card._id, card.owner);
    return Board.findByIdAndUpdate(card.board, {$pull: {cards: card._id}}, 
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

//Retorna todos os cards de um board
exports.getAll = async (req, res) => {
    let response = { todo: [], doing: [], done: [] }

    Card.find({ board: req.body.board_id })
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
    let card = new Card();
    card.description = req.body.description; //informação do card
    card.status = req.body.status;
    card.board = req.body.board_id;
    
    card.save()
    .then(data => {
        addCardToBoard(data);
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
        res.status(400).send({ message: 'Falha ao editar card', data: error })
    });
    }
    
};

//Deleta card
exports.delete = (req, res) => {
     Card.findByIdAndDelete(req.params.id)
    .then(async data => {
        await removeCardToBoard(data);
        res.status(200).send({message: 'Card removido com sucesso', data: data}); 
    }).catch(error => {
        res.status(400).send({message: 'Falha ao remover card', data: error})
    });
};