'use strict'

const mongoose = require('mongoose');
const authService = require('../auth-service');

const List = mongoose.model('List');

function createList(listName, user_id){
    const query = { name: listName, owner: user_id };
    const update = { 
        $setOnInsert:{
            name: listName, 
            owner: user_id
        }
    };

    const options = { upsert: true };
    List.findOneAndUpdate(query, update, options)
        .then(data => console.log(""))
        .catch(error => console.error(error));
}

exports.get = async (req, res) => {
    const token = req.headers['x-api-key'];
    const data = await authService.decodeToken(token);
;

    createList('todo', data.user_id);
    createList('doing', data.user_id);
    createList('done', data.user_id);

    List.find({ owner: data.user_id })
        .then(data => {
            res.status(200).send(data); //ok 
        }).catch(error => {
            res.status(400).send(error)
        });
};
