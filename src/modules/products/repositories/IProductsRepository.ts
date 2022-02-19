import { IProduct } from '../entities/IProduct';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';

interface IProductsRepository {
  create(data: ICreateProductDTO): IProduct;
  index(): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | undefined>;
  findByUserId(userId: string): Promise<IProduct[]>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
}

export { IProductsRepository };
