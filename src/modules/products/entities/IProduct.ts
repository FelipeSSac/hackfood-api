interface IProduct {
  id: string;

  name: string;

  price: number;

  lactose_free: boolean;

  description?: string;

  image?: string;

  user_id: string;

  created_at: string;

  updated_at: string;
}

export { IProduct };
