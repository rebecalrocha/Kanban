'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

//Conecta ao banco
const mongoose = require('mongoose');
mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

//Carrega os Models
require('./models/user');
require('./models/list');
require('./models/card');

//Carrega as Rotas
const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

module.exports = app;
