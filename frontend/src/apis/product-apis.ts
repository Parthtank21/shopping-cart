import { IResponse } from "@/interfaces/response.interface";
import http from "./axios-instance";
import { IAddProduct, IProduct } from "@/interfaces/product.interface";

export const getAllProducts = async (
  page: number,
  limit: number
): Promise<IResponse<IProduct[]>> => {
  const res = await http.get(`/products?page=${page}&limit=${limit}`);
  const data = await res.data;
  return data;
};

export const addProduct = async (
  input: IAddProduct
): Promise<IResponse<IProduct>> => {
  const res = await http.post("/products", input);
  const data = res.data;
  return data;
};

export const deleteProduct = async (
  productId: string
): Promise<IResponse<{}>> => {
  const res = await http.delete(`/products/${productId}`);
  const data = res.data;
  return data;
};
