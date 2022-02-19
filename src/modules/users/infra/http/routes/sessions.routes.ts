import { Router } from 'express';

import { SessionsControllers } from '../controllers/SessionsControllers';
import { create } from '../validations/sessions.validation';

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionsRouter.post('/', create, sessionsControllers.create);

export { sessionsRouter };
