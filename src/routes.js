'use strict'

const express = require('express');
const router = express.Router();
const userController = require('./controllers/user-controller');
const cardController = require('./controllers/card-controller');
const authService = require('./auth-service');

router.get('/users', userController.get);
router.post('/signup', userController.post);
router.post('/login', userController.login);
router.delete('/users/:id', userController.delete);

router.get('/cards/:id', cardController.getOne); //utilizar authService no futuro
router.get('/cards', authService.authorizeUser, cardController.getAll);
router.post('/cards', authService.authorizeUser, cardController.post);
router.put('/cards/:id', cardController.put); //utilizar authService no futuro
router.delete('/cards/:id', authService.authorizeUser, cardController.delete);

module.exports = router;