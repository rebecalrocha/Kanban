'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    id: mongoose.Types.ObjectId,
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

module.exports = mongoose.model('List', listSchema);