'use strict'

const express = require('express');
const router = express.Router();
const userController = require('./controllers/user-controller');
const cardController = require('./controllers/card-controller');
const authService = require('./auth-service');

router.get('/users', userController.get);
router.post('/signup', userController.post);
router.post('/login', userController.login);
router.delete('/users/:id', authService.authorizeUser, userController.delete);

router.get('/cards/:id', authService.authorizeUser, cardController.getOne); 
router.get('/cards', authService.authorizeUser, cardController.getAll);
router.post('/cards', authService.authorizeUser, cardController.post);
router.put('/cards/:id', authService.authorizeUser, cardController.put);
router.delete('/cards/:id', authService.authorizeUser, cardController.delete);

module.exports = router;