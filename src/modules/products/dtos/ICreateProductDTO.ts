interface ICreateProductDTO {
  id: string;
  name: string;
  price: number;
  lactose_free: boolean;
  description?: string | undefined;
  image?: string | undefined;
  user_id: string;
}

export { ICreateProductDTO };
