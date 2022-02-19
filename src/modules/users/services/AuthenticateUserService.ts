import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { auth } from '@config/auth';

import { IHashProvider } from '@shared/container/providers/HashProvider/entities/IHashProvider';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUser } from '../entities/IUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email não encontrado', 404);
    }

    const correctPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!correctPassword) {
      throw new AppError('Email ou senha incorreto', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
