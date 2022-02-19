import { container } from 'tsyringe';

import { StorageProvider } from './implementations/StorageProvider';
import { IStorageProvider } from './entities/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider,
);
