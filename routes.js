const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

routes.get('/users', UserController.index);

routes.put('/users', UserController.update);


module.exports = routes;