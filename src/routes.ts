import express from 'express';
import * as login from './controllers/loginController';
import * as kanban from './controllers/kanbanController';
import { isLogged } from './middlewares/middlewares';
const route = express.Router();

// Account rotes
route.get('/account/index', login.index);
route.post('/account/login', login.login);
route.post('/account/register', login.register);
route.get('/account/logout', login.logout);

// Kanban Routes
route.post('/kanban/create', isLogged, kanban.create);
route.put('/kanban/update', isLogged, kanban.updateTopic);


export default route;
