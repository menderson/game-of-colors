import express, { request } from 'express';

import ScoresController from './controllers/ScoresController';

const routes = express.Router();

const scoresController = new ScoresController();

routes.post('/scores', scoresController.create);
routes.get('/scores', scoresController.index);

 export default routes;