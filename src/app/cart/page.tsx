"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type ProductType = {
  _id: string;
  name: string;
  base: string;
  price: number;
  rating: number;
  image: string;
  isOnSale: boolean;
  quantity?: number;
  size?: string;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(120);

  // Load cart items from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const cartProducts: ProductType[] = storedCart.map(
      (item: Partial<ProductType>) => ({
        _id: item._id || Math.random().toString(36).substr(2, 9),
        name: item.name || "Unknown Product",
        base: item.base || "Default Base",
        price: item.price ?? 0,
        rating: item.rating ?? 0,
        image: item.image || "https://via.placeholder.com/64",
        isOnSale: item.isOnSale ?? false,
        quantity: item.quantity ?? 1,
        size: item.size || "M",
      })
    );

    setCartItems(cartProducts);
  }, []);

  // Handle quantity change in cart
  const handleQuantityChange = (id: string, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle removing an item from the cart
  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate subtotal and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 1),
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
            <tr key={item._id} className="border border-gray-300">
              <td className="p-3 text-center">
                <button
                  onClick={() => handleRemove(item._id)}
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
                  value={item.quantity ?? 1}
                  onChange={(e) =>
                    handleQuantityChange(item._id, Number(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300"
                />
              </td>
              <td className="p-3">{(item.quantity ?? 1) * item.price}৳</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-1/4 p-5 border border-gray-300 bg-gray-100">
        <h2 className="text-lg font-semibold mb-3">Cart totals</h2>
        <div className="flex justify-between border-b pb-2">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}৳</span>
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
          <span>{total.toFixed(2)}৳</span>
        </div>
        <button
          className="w-full mt-4 bg-black text-white py-2 text-lg"
          onClick={() => {
            const checkoutData = {
              cartItems: cartItems.map(
                ({ name, price, size, quantity, image }) => ({
                  name,
                  price,
                  size,
                  quantity,
                  image,
                })
              ),
              shippingCost,
            };
            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
            window.location.href = "/checkout";
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
