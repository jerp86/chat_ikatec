import { Router } from 'express';

// importação dos Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MessageController from './app/controllers/MessageController';

// importação do middleware de autenticação
import authMiddleware from './app/middleware/auth';

// importação das rotas
const routes = new Router();

routes.get('/users', UserController.index); // listagem dos usuários cadastrados
routes.get('/users/', UserController.show); // listagem de 1 usuário
routes.post('/users', UserController.store); // criação de usuário
routes.post('/sessions', SessionController.store); // criação de sessão

// utilizando o middleware em todas as rotas a seguir
routes.use(authMiddleware);

routes.put('/users', UserController.update); // alteração do nome do usuário

routes.get('/messages', MessageController.index); // listagem das mensagens
routes.post('/messages', MessageController.store); // listagem das mensagens

export default routes;
