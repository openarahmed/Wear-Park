/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ProductType = {
  id: number;
  name: string;
  base: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
};

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState<{
    cartItems: ProductType[];
    shippingCost: number;
  }>({
    cartItems: [],
    shippingCost: 120,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Loaded Checkout Data:", parsedData);

        if (parsedData && Array.isArray(parsedData.cartItems)) {
          setCheckoutData({
            cartItems: parsedData.cartItems.map(
              (item: { price: any; quantity: any }) => ({
                ...item,
                price: Number(item.price) || 0, // Ensure price is a valid number
                quantity: Number(item.quantity) || 1,
              })
            ),
            shippingCost: Number(parsedData.shippingCost) || 120,
          });
        }
      } catch (error) {
        console.error("Error parsing checkout data:", error);
      }
    }
  }, []);

  const subtotal = checkoutData.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + checkoutData.shippingCost;

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Billing & Shipping</h1>
        <form className="space-y-5">
          <label className="block">
            আপনার নাম *
            <input
              type="text"
              placeholder="আপনার নাম লিখুন"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </label>
          <label className="block">
            আপনার ঠিকানা *
            <input
              type="text"
              placeholder="আপনার ঠিকানা লিখুন"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </label>
          <label className="block">
            আপনার মোবাইল *
            <input
              type="text"
              placeholder="আপনার মোবাইল নাম্বার লিখুন"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </label>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
        <div className="space-y-5">
          {checkoutData.cartItems.length > 0 ? (
            checkoutData.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-6 p-4 border-b"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm">Size: {item.size}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm font-semibold">Price: {item.price}৳</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No items in checkout</p>
          )}
        </div>

        <div className="mt-6 border-t pt-4">
          <p className="flex justify-between font-semibold text-lg">
            Subtotal: <span>{subtotal}৳</span>
          </p>
          <p className="flex justify-between font-semibold text-lg">
            Shipping: <span>{checkoutData.shippingCost}৳</span>
          </p>
          <p className="flex justify-between font-bold text-xl mt-3">
            Total: <span>{total}৳</span>
          </p>
          <div className="bg-blue-50 p-4 mt-10 rounded-md">
            <p className="text-gray-700 font-medium">Cash on delivery</p>
            <div className="bg-blue-100 p-3 rounded-md mt-2">
              <p className="text-gray-700">Pay with cash upon delivery.</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-6">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
