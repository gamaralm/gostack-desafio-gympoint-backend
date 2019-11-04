import { Router } from 'express';

import AnswerController from './app/controllers/AnswerController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import StudentController from './app/controllers/StudentController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

/**
 * Checkins
 */
routes.get('/students/:student_id/checkins', CheckinController.index);

/**
 * Help Orders
 */
routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);
routes.post('/help-orders/:id/answer', AnswerController.store);

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
routes.get('/students/:student_id/registrations', RegistrationController.index);
routes.post(
  '/students/:student_id/registrations',
  RegistrationController.store
);
routes.get(
  '/students/:student_id/registrations/:id',
  RegistrationController.show
);
routes.put(
  '/students/:student_id/registrations/:id',
  RegistrationController.update
);
routes.delete(
  '/students/:student_id/registrations/:id',
  RegistrationController.delete
);

export default routes;
