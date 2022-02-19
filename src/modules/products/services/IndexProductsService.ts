import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

import { IProduct } from '../entities/IProduct';

@injectable()
class IndexProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<IProduct[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const products = await this.productsRepository.findByUserId(user.id);

    if (products.length < 1) {
      throw new AppError('Nenhum produto encontrado!', 404);
    }

    return products;
  }
}

export { IndexProductsService };
