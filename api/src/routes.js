'use strict'

const express = require('express');
const router = express.Router();
const userController = require('./controllers/user-controller');
const boardController = require('./controllers/board-controller');
const cardController = require('./controllers/card-controller');
const authService = require('./auth-service');

router.post('/signup', userController.post);
router.post('/login', userController.login);
// router.get('/users', userController.get);
router.get('/users', userController.getAll);
router.delete('/users/:id', authService.authorizeUser, userController.delete);

router.post('/boards', authService.authorizeUser, boardController.post);
router.get('/boards/:id', boardController.get);
router.put('/boards/:id', boardController.put);
router.delete('/boards/:id', boardController.delete);

// router.get('/cards', cardController.getAll);
router.post('/cards', cardController.post);
router.get('/cards/:id', cardController.getOne); 
router.put('/cards/:id', cardController.put);
router.delete('/cards/:id', cardController.delete);

module.exports = router;