import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IIdGeneratorProvider } from '@shared/container/providers/IdGeneratorProvider/entities/IIdGeneratorProvider';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/entities/IStorageProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ITranslatorProvider } from '@shared/container/providers/TranslatorProvider/entities/ITranslatorProvider';
import { IFoodDataProvider } from '@shared/container/providers/FoodDataProvider/entities/IFoodDataProvider';
import { IProductsRepository } from '../repositories/IProductsRepository';

import { IProduct } from '../entities/IProduct';

interface IRequest {
  name: string;
  price: number;
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

    @inject('TranslatorProvider')
    private translatorProvider: ITranslatorProvider,

    @inject('FoodDataProvider')
    private foodDataProvider: IFoodDataProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) {}

  public async execute({
    name,
    price,
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
      lactose_free: false,
      description,
      user_id,
    });

    const globalName = await this.translatorProvider.translateToEng(name);

    const lactose_free = await this.foodDataProvider.lactoseFree(globalName);

    Object.assign(product, { lactose_free: lactose_free || false });

    if (image) {
      const fileName = await this.storageProvider.saveFile(image);

      Object.assign(product, { image: fileName });
    }

    await this.productsRepository.save(product);

    return product;
  }
}

export { CreateProductService };
