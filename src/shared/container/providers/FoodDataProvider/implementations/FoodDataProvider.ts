import { AxiosInstance } from 'axios';

import { FoodApi } from '@shared/services/FoodApi';

import { IFoodDataProvider } from '../entities/IFoodDataProvider';
import { IFood } from '../entities/IFood';

class FoodDataProvider implements IFoodDataProvider {
  private api: AxiosInstance;

  constructor() {
    this.api = FoodApi;
  }

  public async lactoseFree(rawName: string): Promise<boolean> {
    const name = rawName.toLowerCase();

    try {
      const response = await this.api.get('/search', {
        params: {
          api_key: process.env.FOOD_API_KEY,
          query: name,
        },
      });

      const { foods } = response.data || [];

      const food: IFood = foods.find((findFood: IFood) => {
        const descriptionKeys: Array<string> = findFood
          .lowercaseDescription
          .replace(/,/g, '')
          .split(' ');

        const foodKeys: Array<string> = name
          .replace(/,/g, '')
          .split(' ');

        const reducer = (acc: Array<string>, key: string) => {
          if (descriptionKeys.includes(key)) {
            acc.push(key);

            return acc;
          }

          return acc;
        };

        const matchedKeys = foodKeys.reduce(reducer, []);

        return (matchedKeys.length === foodKeys.length
          && Math.floor(2 * foodKeys.length) > descriptionKeys.length);
      });

      if (!food) {
        return false;
      }

      const { ingredients } = food;

      const regExKeys = /(MILK)|(LACTOSE)|(LEITE)/;
      const [match] = ingredients.match(regExKeys) || [false];

      return !match;
    } catch (error: any) {
      return false;
    }
  }
}

export { FoodDataProvider };
