import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { uploadConfig } from '@config/upload';

import { ProductsControllers } from '../controllers/ProductsControllers';
import {
  create, remove,
  update, updateImage,
} from '../validations/products.validations';

const productsRouter = Router();
const productsControllers = new ProductsControllers();

const upload = multer(uploadConfig.multer);

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  upload.single('image'),
  create,
  productsControllers.create,
);

productsRouter.put(
  '/:product_id',
  update,
  productsControllers.update,
);

productsRouter.patch(
  '/:product_id/image',
  upload.single('image'),
  updateImage,
  productsControllers.updateImage,
);

productsRouter.delete(
  '/:product_id',
  remove,
  productsControllers.remove,
);

export { productsRouter };
