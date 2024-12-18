"use client";

import { useDispatch } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/features/cart/cartSlice";
import { ICartProduct } from "@/interfaces/product.interface";

const CartItemList = ({ products }: { products: ICartProduct[] }) => {
  const dispatch = useDispatch();

  const handleQuantity = (productId: string, type: "INC" | "DEC") => {
    if (type === "INC") {
      dispatch(incrementQuantity(productId));
    } else if (type === "DEC") {
      dispatch(decrementQuantity(productId));
    }
  };

  const removeProductFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const totalAmount = products.reduce(
    (acc: number, curr: ICartProduct) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Product Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: ICartProduct) => (
          <TableRow key={product._id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
              <Button
                className="text-lg"
                size="icon"
                variant="outline"
                onClick={() => handleQuantity(product._id, "DEC")}
              >
                -
              </Button>
              <span className="px-5">{product.quantity}</span>
              <Button
                className="text-lg"
                size="icon"
                variant="outline"
                onClick={() => handleQuantity(product._id, "INC")}
              >
                +
              </Button>
            </TableCell>
            <TableCell className="text-right w-[200px]">
              ${product.price * product.quantity}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProductFromCart(product._id)}
              >
                X
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Amount</TableCell>
          <TableCell className="text-right">${totalAmount}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CartItemList;
