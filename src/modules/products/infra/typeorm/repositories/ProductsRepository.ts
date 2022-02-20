import { getRepository, Repository } from 'typeorm';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

import { IProduct } from '@modules/products/entities/IProduct';
import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<IProduct>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public create({
    name,
    price,
    lactose_free,
    description,
    image,
    user_id,
  }: ICreateProductDTO): IProduct {
    const product = this.ormRepository.create({
      name,
      price,
      lactose_free,
      description,
      image,
      user_id,
    });

    return product;
  }

  public async index(): Promise<IProduct[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findByUserId(userId: string): Promise<IProduct[]> {
    const products = this.ormRepository.find({
      where: {
        user_id: userId,
      },
    });

    return products;
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    const productSaved = await this.ormRepository.save(product);

    return productSaved;
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export { ProductsRepository };
