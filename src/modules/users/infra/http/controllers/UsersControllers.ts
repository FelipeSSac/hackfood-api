import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { CreateUserService } from '@modules/users/services/CreateUserService';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(
      CreateUserService,
    );

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }
}

export { UsersControllers };
