"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItemList from "@/components/CartItemList";

const Page = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p>Review the items in your cart and proceed to checkout.</p>
      </div>

      <div className="flex justify-center">
        {cartItems.length === 0 ? (
          <p>Cart is empty. Please add products.</p>
        ) : (
          <CartItemList products={cartItems} />
        )}
      </div>
    </div>
  );
};

export default Page;
