import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/entities/IStorageProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  user_id: string;
  product_id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    product_id,
  }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.id !== product.user_id) {
      throw new AppError('Usuário não autorizado', 401);
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    await this.productsRepository.remove(product);
  }
}

export { DeleteProductService };
