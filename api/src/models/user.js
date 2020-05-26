'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    id: mongoose.Types.ObjectId,
    name: { type: String, required: [true,'É necessário possuir um nome'] },
    email: { type: String, required: [true,'É necessário possuir um email válido'] },
    password: { type: String, required: [true,'É necessário possuir uma senha'] },
    boards: [ { type: Schema.Types.ObjectId, ref: 'Board' } ]
});

module.exports = mongoose.model('User', userSchema);