const mongoose = require('mongoose');
const authService = require('../auth-service');

const Board = mongoose.model('Board');
const Card = mongoose.model('Card');
const User = mongoose.model('User');

function addBoardToUser(board) {
	return User.findByIdAndUpdate(board.owner, {$push: {boards: board._id}}, {upsert: true},
        function (err, data) {
            if (err) throw err;
            console.log('board adicionado: ', data); 
        });
};

function removeBoardToUser(board) {
    return User.findByIdAndUpdate(board.owner, {$pull: {boards: board._id}}, 
        function (err, data){
            if (err) throw err;
            console.log('board deletado do user: ', data);
        })
};

function removeCardsFromBoard(board) {
    console.log('remove cards', board);
    return Card.deleteMany({board: board._id}, 
        function (err, result){
            if (err) throw err;
            console.log('resultado delete many: ', result);
        })
};


//Retorna um board
exports.get = async (req, res) => {
    // let board = { id, title, theme, response }
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
        console.log(error);
    })

    Card.find({ board: req.params.id })
    .then(data => {
        task.todo = data.filter(card => card.status == 'todo');
        task.doing = data.filter(card => card.status == 'doing');
        task.done = data.filter(card => card.status == 'done');
        board = { id, title, theme, task }
        res.status(200).send(board); //ok 
    }).catch(error => {
        res.status(400).send(error)
    });
};

//Cria novo board
exports.post = async (req, res) => {
    console.log('post create');
    let board = await Board.find({ title: req.body.title });

    if(board.length) 
        return res.status(400).send({ message: 'Já existe um board com este nome' })

    const token = req.headers['x-api-key'];
    const auth = await authService.decodeToken(token);

    board = new Board();

    board.title = req.body.title; 
    board.owner = auth.user_id;
    board.theme = 'light';
    
    board.save()
    .then(data => {
        console.log('data que vai para o addBoardToUser',data)
        addBoardToUser(data);
        res.status(201).send({ message: 'Board criado com sucesso', data: data }); //created 
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao criar', data: error })
    });
};

//Altera título ou tema do board
exports.put = (req, res) => {

    if(req.body.theme){
        Board.findByIdAndUpdate(req.params.id, { $set: { theme : req.body.theme } }, { new:true })
        .then(data => {
            console.log('encontrei o board para editar: ', data)
            res.status(201).send({ message: 'Tema editado com sucesso', data: data });  
        }).catch(error => {
            console.log('erro ao alterar:', error);
            res.status(400).send({ message: 'Falha ao trocar o tema do board', data: error })
        });
    } 
    
    if(req.body.title){ 
        Board.findByIdAndUpdate(req.params.id, { $set: { title : req.body.title } }, { new:true })
        .then(data => {
            console.log('encontrei o board para editar: ', data)
            res.status(201).send({ message: 'Título do board editado com sucesso', data: data });  
        }).catch(error => {
            console.log('erro ao alterar:', error);
            res.status(400).send({ message: 'Falha ao editar título do board', data: error })
        });
    }
};

//Deleta board
exports.delete = (req, res) => {
    Board.findByIdAndDelete(req.params.id)
   .then(async data => {
       console.log('then do delete', data._id, data.owner);
       await removeBoardToUser(data);
       await removeCardsFromBoard(data);
       res.status(200).send({message: 'Board deletado com sucesso!', data: data}); 
   }).catch(error => {
       res.status(400).send({message: 'Falha ao remover board', data: error})
   });
};