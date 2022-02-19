import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IProductsRepository } from '../repositories/IProductsRepository';

import { IProduct } from '../entities/IProduct';

interface IRequest {
  user_id: string;
  productData: {
    id: string;
    name?: string;
    price?: number;
    has_lactose?: boolean;
    description?: string;
  };
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    productData,
    user_id,
  }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(productData.id);

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

    Object.assign(product, productData);

    await this.productsRepository.save(product);

    return product;
  }
}

export { UpdateProductService };
