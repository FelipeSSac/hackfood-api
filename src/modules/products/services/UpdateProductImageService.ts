import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/entities/IStorageProvider';
import { IProductsRepository } from '../repositories/IProductsRepository';

import { IProduct } from '../entities/IProduct';

interface IRequest {
  user_id: string;
  product_id: string;
  filename?: string;
}

@injectable()
class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

  ) {}

  public async execute({
    product_id,
    user_id,
    filename,
  }: IRequest): Promise<IProduct> {
    if (!filename) {
      throw new AppError('Imagem não encontrada!', 404);
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Produto não encontrado!', 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    if (user.id !== product.user_id) {
      throw new AppError('Usuário não autorizado', 401);
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    Object.assign(product, {
      image: filename,
    });

    await this.storageProvider.saveFile(filename);
    await this.productsRepository.save(product);

    return product;
  }
}

export { UpdateProductImageService };
