import { container } from 'tsyringe';

import { IIdGeneratorProvider } from './entities/IIdGeneratorProvider';
import { IdGeneratorProvider } from './implementations/IdGeneratorProvider';

container.registerSingleton<IIdGeneratorProvider>(
  'IdGeneratorProvider',
  IdGeneratorProvider,
);
