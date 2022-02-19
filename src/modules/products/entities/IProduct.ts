interface IProduct {
  id: string;

  name: string;

  price: number;

  has_lactose: boolean;

  description?: string;

  image?: string;

  user_id: string;

  created_at: string;

  updated_at: string;
}

export { IProduct };
