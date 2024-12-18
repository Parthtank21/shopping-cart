import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: ""
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
});

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
