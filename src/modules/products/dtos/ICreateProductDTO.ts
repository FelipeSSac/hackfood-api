interface ICreateProductDTO {
  id: string;
  name: string;
  price: number;
  has_lactose: boolean;
  description?: string | undefined;
  image?: string | undefined;
  user_id: string;
}

export { ICreateProductDTO };
