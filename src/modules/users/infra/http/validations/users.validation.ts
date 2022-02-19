import { Joi, Segments, celebrate } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});
