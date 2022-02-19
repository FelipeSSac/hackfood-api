import { Router } from 'express';

import { UsersControllers } from '../controllers/UsersControllers';

import { create } from '../validations/users.validation';

const usersRouter = Router();
const usersControllers = new UsersControllers();

usersRouter.post('/', create, usersControllers.create);

export { usersRouter };
