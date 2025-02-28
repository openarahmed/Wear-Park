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
    const storedData = JSON.parse(localStorage.getItem("checkoutData") || "{}");
    if (storedData.cartItems) {
      setCheckoutData(storedData);
    }
  }, []);

  const subtotal = checkoutData.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + checkoutData.shippingCost;

  return (
    <div className="p-10 grid grid-cols-2 gap-20">
      {/* Billing Section */}
      <div className="w-full">
        <h1 className="text-xl font-semibold mb-4">Billing & Shipping</h1>
        <form className="space-y-3">
          <label className="block">
            আপনার নাম *
            <input
              type="text"
              placeholder="আপনার নাম লিখুন"
              className="w-full border p-2 mt-1"
            />
          </label>
          <label className="block">
            আপনার সম্পূর্ণ ঠিকানা *
            <input
              type="text"
              placeholder="রোড নাম্বার, বাসা নাম্বার, সহ সম্পূর্ণ ঠিকানা"
              className="w-full border p-2 mt-1"
            />
          </label>
          <label className="block">
            আপনার মোবাইল নাম্বার *
            <input
              type="text"
              placeholder="01XXXXXXXXX"
              className="w-full border p-2 mt-1"
            />
          </label>
        </form>
      </div>

      {/* Order Summary Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <div className="p-5 border rounded-lg shadow-md bg-white">
          {checkoutData.cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 border-b"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm">
                  Quantity: <strong>{item.quantity}</strong>
                </p>
                <p className="text-sm">
                  Price: <strong>{item.price}৳</strong>
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4 space-y-2">
            <div className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>{subtotal}৳</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{checkoutData.shippingCost}৳</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>{total}৳</span>
            </div>
          </div>
        </div>

        {/* Payment Option */}
        <div className="mt-5 p-4 border bg-gray-100 rounded-md">
          <p className="font-medium">Payment Method</p>
          <p className="text-sm text-gray-600">Cash on Delivery</p>
        </div>

        {/* Place Order Button */}
        <button className="w-full mt-4 bg-black text-white py-3 text-lg font-semibold rounded-md">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
