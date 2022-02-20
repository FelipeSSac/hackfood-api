import { container } from 'tsyringe';

import { IFoodDataProvider } from './entities/IFoodDataProvider';
import { FoodDataProvider } from './implementations/FoodDataProvider';

container.registerSingleton<IFoodDataProvider>(
  'FoodDataProvider',
  FoodDataProvider,
);
