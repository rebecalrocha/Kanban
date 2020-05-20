'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const app = express();

//Conecta ao banco
const mongoose = require('mongoose');
mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

//Carrega os Models
require('./models/user');
require('./models/card');

//Carrega as Rotas
const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //http://localhost:4200
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    app.use(cors());
    next();
});

app.use('/', routes);

module.exports = app;
