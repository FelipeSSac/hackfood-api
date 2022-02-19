import { inject, injectable } from 'tsyringe';

import { IIdGeneratorProvider } from '@shared/container/providers/IdGeneratorProvider/entities/IIdGeneratorProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { IUser } from '../entities/IUser';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({ name, email }: IRequest): Promise<IUser> {
    const user = this.usersRepository.create({
      id: this.idGeneratorProvider.generate(),
      name,
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
