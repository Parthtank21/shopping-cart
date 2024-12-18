export interface IAddProduct {
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface IProduct extends IAddProduct {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartProduct extends IProduct {
  quantity: number;
}
