import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/Users.routes';

const routes = Router();

routes.use('/users', usersRouter);

export { routes };
