'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema ({
    id: mongoose.Types.ObjectId,
    description: { type: String, required: [true,'É necessário possuir uma descrição'] },
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
    
});

module.exports = mongoose.model('Card', cardSchema);