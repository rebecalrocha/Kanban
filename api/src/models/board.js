'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema ({
    id: mongoose.Types.ObjectId,
    title: { type: String, required: [true,'É necessário possuir um título'] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    cards: [ { type: Schema.Types.ObjectId, ref: 'Card' } ],
    theme: { type: String }
    
});

module.exports = mongoose.model('Board', boardSchema);