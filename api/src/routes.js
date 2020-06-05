'use strict'

const express = require('express');
const router = express.Router();
const userController = require('./controllers/user-controller');
const boardController = require('./controllers/board-controller');
const cardController = require('./controllers/card-controller');
const authController = require('./controllers/auth-controller');
const authService = require('./auth-service');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/auth', authController.get);

router.get('/users', authService.authorizeUser, userController.get);
router.put('/users/:id', authService.authorizeUser, userController.put);
router.delete('/users/:id', authService.authorizeUser, userController.delete);

router.post('/boards', authService.authorizeUser, boardController.post);
router.get('/boards/:id', authService.authorizeUser, boardController.get);
router.put('/boards/:id', authService.authorizeUser, boardController.put);
router.delete('/boards/:id', authService.authorizeUser, boardController.delete);

router.post('/cards', authService.authorizeUser, cardController.post);
router.get('/cards/:id', authService.authorizeUser, cardController.getOne); 
router.put('/cards/:id', authService.authorizeUser, cardController.put);
router.delete('/cards/:id', authService.authorizeUser, cardController.delete);

module.exports = router;