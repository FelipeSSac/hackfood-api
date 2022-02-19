import { container } from 'tsyringe';

import { IRepositoryUtils } from './entities/IRepositoryUtils';

import { RepositoryUtils } from './implementations/RepositoryUtils';

container.register<IRepositoryUtils>('RepositoryUtils', RepositoryUtils);
