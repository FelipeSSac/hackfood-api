import { container } from 'tsyringe';

import { TranslatorProvider } from './implementations/TranslatorProvider';
import { ITranslatorProvider } from './entities/ITranslatorProvider';

container.registerSingleton<ITranslatorProvider>(
  'TranslatorProvider',
  TranslatorProvider,
);
