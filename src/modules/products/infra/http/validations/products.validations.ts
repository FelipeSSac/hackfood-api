import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string(),
  },
});

export const update = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    price: Joi.number().min(0),
    lactose_free: Joi.boolean(),
    description: Joi.string(),
  },
});

export const updateImage = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().required(),
  },
});

export const remove = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().required(),
  },
});
