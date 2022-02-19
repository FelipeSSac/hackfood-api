import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IIdGeneratorProvider } from '@shared/container/providers/IdGeneratorProvider/entities/IIdGeneratorProvider';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/entities/IStorageProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

import { IProduct } from '../entities/IProduct';

interface IRequest {
  name: string;
  price: number;
  has_lactose: boolean;
  description?: string | undefined;
  image?: string | undefined;
  user_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({
    name,
    price,
    has_lactose,
    description,
    image,
    user_id,
  }: IRequest): Promise<IProduct> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('Usuário não encontrado', 400);
    }

    const product = this.productsRepository.create({
      id: this.idGeneratorProvider.generate(),
      name,
      price,
      has_lactose,
      description,
      user_id,
    });

    if (image) {
      const fileName = await this.storageProvider.saveFile(image);

      Object.assign(product, { image: fileName });
    }

    await this.productsRepository.save(product);

    return product;
  }
}

export { CreateProductService };
