import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import { Product, products } from "../products/products";
import { ItemCard } from "@/shoping-cart/components/ItemsCard";
import { WidgetItem } from "../../components/WidgetItem";

export const metadata: Metadata = {
  title: "Products Cart",
  description: "Products cart page",
};

interface Element {
  [id: string]: number;
}

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductInCart = (cart: Element): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);

    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

const CartPage = () => {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as Element;
  const productsInCart = getProductInCart(cart);
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );
  return (
    <div>
      <h1 className="text-3xl">Products in Cart</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => {
            return (
              <ItemCard
                key={product.id}
                product={product}
                quantity={quantity}
              />
            );
          })}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total Amount">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                {(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Taxes to pay: {(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
