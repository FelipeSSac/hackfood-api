import { inject, injectable } from 'tsyringe';

import { IIdGeneratorProvider } from '@shared/container/providers/IdGeneratorProvider/entities/IIdGeneratorProvider';
import { IHashProvider } from '@shared/container/providers/HashProvider/entities/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { IUser } from '../entities/IUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    const hash = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      id: this.idGeneratorProvider.generate(),
      name,
      email,
      password: hash,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
