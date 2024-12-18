import Product from "./product.model";
import NotFoundError from "../../errors/not-found";

interface ProductInput {
  name: string;
  price: number;
  image: string;
  description: string;
}

export const addProduct = async (input: ProductInput) => {
  const product = await Product.create(input);
  return product;
};

export const getAllProducts = async (limit: number, skip: number) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return products;
};

export const getTotalProductsCount = async () => {
  const totalProducts = await Product.countDocuments();
  return totalProducts;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
};
