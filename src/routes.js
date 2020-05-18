'use strict'

const express = require('express');
const router = express.Router();
const userController = require('./controllers/user-controller');
const listController = require('./controllers/list-controller');
const cardController = require('./controllers/card-controller');
const authService = require('./auth-service');

router.get('/users', userController.get);
router.post('/signup', userController.post);
router.post('/login', userController.login);
router.delete('/users/:id', userController.delete);

router.get('/lists', authService.authorizeUser, listController.get);

router.get('/cards', cardController.get);
//router.get('/cards/:id', cardController.get);
router.post('/cards', cardController.post);
router.put('/cards/:id', cardController.put);
router.put('/cards/:id', cardController.edit);
router.delete('/cards/:id', cardController.delete);

module.exports = router;