"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

type ProductType = {
  [x: string]: ReactNode;
  id: number;
  name: string;
  base: string;
  price: number;
  salePrice?: number;
  rating: number;
  image: string;
  isOnSale: boolean;
  quantity?: number;
};

const products: ProductType[] = [
  {
    id: 1,
    name: "Blouse 1",
    base: "Women's Collection",
    price: 280.0,
    salePrice: 280.0,
    rating: 4.5,
    image:
      "https://oval-square.com/cdn/shop/files/20389-7016_13_800x.jpg?v=1723646356",
    isOnSale: true,
  },
  {
    id: 2,
    name: "Blouse 2",
    base: "Summer Collection",
    price: 305.0,
    rating: 4,
    image:
      "https://oval-square.com/cdn/shop/files/20389-6009_13_1600x.jpg?v=1723646324",
    isOnSale: false,
  },
  {
    id: 3,
    name: "Blouse 3",
    base: "Summer Collection",
    price: 305.0,
    rating: 4,
    image:
      "https://oval-square.com/cdn/shop/files/20389-6009_13_1600x.jpg?v=1723646324",
    isOnSale: false,
  },
  {
    id: 4,
    name: "Blouse ",
    base: "Summer Collection",
    price: 305.0,
    rating: 4,
    image:
      "https://oval-square.com/cdn/shop/files/20389-6009_13_1600x.jpg?v=1723646324",
    isOnSale: false,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(120);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartProducts = products
      .filter((product) =>
        storedCart.some((item: { id: number }) => item.id === product.id)
      )
      .map((product) => {
        const storedItem = storedCart.find(
          (item: { id: number }) => item.id === product.id
        );
        return {
          ...product,
          quantity: storedItem.quantity,
          size: storedItem.size,
        };
      });
    setCartItems(cartProducts);
  }, []);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + newQuantity }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart.map((item) => item.id))
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const total = subtotal + shippingCost;

  return (
    <div className="flex justify-between px-10 py-5">
      <table className="w-3/4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border border-gray-300">Remove</th>
            <th className="p-3 border border-gray-300">Thumbnail</th>
            <th className="p-3 border border-gray-300">Product Title</th>
            <th className="p-3 border border-gray-300">Size</th>
            <th className="p-3 border border-gray-300">Price</th>
            <th className="p-3 border border-gray-300">Quantity</th>
            <th className="p-3 border border-gray-300">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border border-gray-300">
              <td className="p-3 text-center">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 text-lg"
                >
                  ✖
                </button>
              </td>
              <td className="p-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.size}</td>
              <td className="p-3">{item.price}৳</td>
              <td className="p-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      Number(e.target.value) - (item.quantity || 1)
                    )
                  }
                  className="w-12 text-center border border-gray-300"
                />
              </td>
              <td className="p-3">{(item.quantity || 1) * item.price}৳</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-1/4 p-5 border border-gray-300 bg-gray-100">
        <h2 className="text-lg font-semibold mb-3">Cart totals</h2>
        <div className="flex justify-between border-b pb-2">
          <span>Subtotal</span>
          <span>{subtotal}৳</span>
        </div>
        <div className="mt-3">
          <p className="font-semibold">Shipping</p>
          <label className="flex items-center">
            <input
              type="radio"
              name="shipping"
              value="120"
              checked={shippingCost === 120}
              onChange={() => setShippingCost(120)}
              className="mr-2"
            />
            ঢাকার বাইরে: 120.00৳
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              name="shipping"
              value="80"
              checked={shippingCost === 80}
              onChange={() => setShippingCost(80)}
              className="mr-2"
            />
            ঢাকার ভিতরে: 80.00৳
          </label>
          <p className="mt-2">
            Shipping to <strong>Dhaka</strong>.
          </p>
          <button className="text-red-500 text-sm mt-1">Change address</button>
        </div>
        <div className="flex justify-between mt-3 border-t pt-2">
          <span>Total</span>
          <span>{total}৳</span>
        </div>
        <button
          className="w-full mt-4 bg-black text-white py-2 text-lg"
          onClick={() => {
            const checkoutData = {
              cartItems: cartItems.map(
                ({ id, name, base, price, image, size, quantity }) => ({
                  id,
                  name,
                  base,
                  price,
                  image,
                  size,
                  quantity: quantity || 1, // Ensure quantity is at least 1,
                })
              ),
              shippingCost,
            };
            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
            window.location.href = "/checkout"; // Navigate to the Checkout page
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
