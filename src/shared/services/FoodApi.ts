import axios from 'axios';

const FoodApi = axios.create({
  baseURL: process.env.FOOD_API_URL,
});

export { FoodApi };
