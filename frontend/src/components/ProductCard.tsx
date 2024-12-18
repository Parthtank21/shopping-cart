"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { ICartProduct, IProduct } from "@/interfaces/product.interface";
import { addToCart, removeFromCart } from "@/features/cart/cartSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addProductToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  const index = cartItems.findIndex(
    (item: ICartProduct) => item._id === product._id
  );

  const removeProductFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Card className="w-[300px] group relative space-y-2 overflow-hidden max-w-sm">
      <CardHeader>
        <Image
          className="w-full"
          src={product.image}
          width={300}
          height={400}
          alt={product.name}
        />
      </CardHeader>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg">{product.name}</h3>
          </div>
          <p className="text-lg font-semibold">${product.price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        {index === -1 ? (
          <Button
            className="w-full"
            onClick={() => addProductToCart(product)}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex justify-between items-center w-full">
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => removeProductFromCart(product._id)}
            >
              Remove from Cart
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
