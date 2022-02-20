import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { IndexProductsService } from '@modules/products/services/IndexProductsService';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { UpdateProductService } from '@modules/products/services/UpdateProductService';
import { UpdateProductImageService } from '@modules/products/services/UpdateProductImageService';
import { DeleteProductService } from '@modules/products/services/DeleteProductService';

class ProductsControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.body;

    const indexProductsService = container.resolve(IndexProductsService);

    const products = await indexProductsService.execute(userId);

    return response.status(200).json(instanceToInstance(products));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const filename = request?.file?.filename;
    const {
      name,
      price,
      description,
    } = request.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      name,
      price,
      description,
      image: filename,
      user_id,
    });

    return response.status(201).json(instanceToInstance(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { product_id } = request.params;
    const data = request.body;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      user_id,
      productData: {
        id: product_id,
        ...data,
      },
    });

    return response.status(200).json(instanceToInstance(product));
  }

  public async updateImage(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { product_id } = request.params;
    const filename = request?.file?.filename;

    const updateProductImageService = container.resolve(UpdateProductImageService);

    const product = await updateProductImageService.execute({
      user_id,
      product_id,
      filename,
    });

    return response.status(200).json(instanceToInstance(product));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { product_id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({
      user_id,
      product_id,
    });

    return response.status(204).send();
  }
}

export { ProductsControllers };
