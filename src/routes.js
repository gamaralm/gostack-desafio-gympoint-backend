import { Router } from 'express';

import PlanController from './app/controllers/PlanController';
import StudentController from './app/controllers/StudentController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

/**
 * Plans
 */
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

/**
 * Students
 */
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

/**
 * Students
 */
routes.get('/students/:studentId/registrations', RegistrationController.index);
routes.post('/students/:studentId/registrations', RegistrationController.store);
routes.get(
  '/students/:studentId/registrations/:registrationId',
  RegistrationController.show
);
routes.put(
  '/students/:studentId/registrations/:registrationId',
  RegistrationController.update
);
routes.delete(
  '/students/:studentId/registrations/:registrationId',
  RegistrationController.delete
);

export default routes;
