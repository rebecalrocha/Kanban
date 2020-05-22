'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema ({
    id: mongoose.Types.ObjectId,
    description: { type: String, required: [true,'É necessário possuir uma descrição'] },
    status: { type: String, enum: ['todo', 'doing', 'done'] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
    
});

module.exports = mongoose.model('Card', cardSchema);