const mongoose = require('mongoose');
const authService = require('../auth-service');

const Board = mongoose.model('Board');
const Card = mongoose.model('Card');
const User = mongoose.model('User');

function addBoardToUser(board) {
	return User.findByIdAndUpdate(board.owner, {$push: {boards: board._id}}, {upsert: true},
        function (err, data) {
            if (err) throw err;
            console.log('board added: ', data); 
        });
};

function removeBoardToUser(board) {
    return User.findByIdAndUpdate(board.owner, {$pull: {boards: board._id}}, 
        function (err, data){
            if (err) throw err;
            console.log('deleted users board: ', data);
        })
};

function removeCardsFromBoard(board) {
    return Card.deleteMany({board: board._id}, 
        function (err, result){
            if (err) throw err;
            console.log('deleted boards cards: ', result);
        })
};


//Retorna um board
exports.get = async (req, res) => {
    let id = req.params.id;
    let title;
    let theme;
    let board;
    let task = { todo: [], doing: [], done: [] }

    Board.find({_id: req.params.id})
    .then(data => {
        title = data[0].title;
        theme = data[0].theme;
        

    }).catch(error => {
        res.status(404).send(error)
    })

    Card.find({ board: req.params.id })
    .then(data => {
        task.todo = data.filter(card => card.status == 'todo');
        task.doing = data.filter(card => card.status == 'doing');
        task.done = data.filter(card => card.status == 'done');
        board = { id, title, theme, task }
        res.status(200).send(board); //ok 
    }).catch(error => {
        res.status(404).send(error)
    });
};

//Cria novo board
exports.post = async (req, res) => {
    let board = await Board.find({ title: req.body.title });

    if(board.length) 
        return res.status(400).send({ message: 'There is already a board with this name!' })

    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);

    board = new Board();

    board.title = req.body.title; 
    board.owner = auth.user_id;
    board.theme = 'light';
    
    board.save()
    .then(data => {
        addBoardToUser(data);
        res.status(201).send({ message: 'Board successfully created!', data: data }); //created 
    }).catch(error => {
        res.status(400).send({ message: 'Failed to create board', data: error })
    });
};

exports.put = (req, res) => {
    //Altera tema do board
    if(req.body.theme){
        
        Board.findByIdAndUpdate(req.params.id, { $set: { theme : req.body.theme } }, { new:true })
        .then(data => {
            res.status(201).send({ message: 'Board theme successfully edited!', data: data });  
        }).catch(error => {
            res.status(400).send({ message: 'Failed to edit board theme', data: error })
        });
    } 
    //Altera título do board
    if(req.body.title){ 
        Board.findByIdAndUpdate(req.params.id, { $set: { title : req.body.title } }, { new:true })
        .then(data => {
            res.status(201).send({ message: 'Board title successfully  edited!', data: data });  
        }).catch(error => {
            res.status(400).send({ message: 'Failed to edit board title', data: error })
        });
    }
};

//Deleta board
exports.delete = (req, res) => {
    Board.findByIdAndDelete(req.params.id)
   .then(async data => {
       await removeBoardToUser(data);
       await removeCardsFromBoard(data);
       res.status(200).send({message: 'Board successfully  deleted!', data: data}); 
   }).catch(error => {
       res.status(400).send({message: 'Failed to delete board', data: error})
   });
};