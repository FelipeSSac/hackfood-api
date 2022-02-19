import { container } from 'tsyringe';

import { IHashProvider } from './entities/IHashProvider';
import { HashProvider } from './implementations/HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
