/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

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

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && Array.isArray(parsedData.cartItems)) {
          setCheckoutData({
            cartItems: parsedData.cartItems.map(
              (item: { price: any; quantity: any }) => ({
                ...item,
                price: Number(item.price) || 0,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    emailjs
      .sendForm(
        "service_lo56j5m",
        "template_1buhjgc",
        e.currentTarget,
        "97jtqzztSIEkmp02_"
      )
      .then(
        (result) => {
          setFormStatus({ loading: false, success: true, error: null });
          Swal.fire({
            title: "Order Placed!",
            text: "Your order has been successfully placed.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setFormData({ name: "", address: "", phone: "" });
          localStorage.removeItem("checkoutData");
          setCheckoutData({ cartItems: [], shippingCost: 120 });
        },
        (error) => {
          setFormStatus({ loading: false, success: false, error: error.text });
          Swal.fire({
            title: "Error!",
            text: "There was an issue placing your order. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      );
  };

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Billing & Shipping</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            আপনার নাম *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="আপনার নাম লিখুন"
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </label>
          <label className="block">
            আপনার ঠিকানা *
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="আপনার ঠিকানা লিখুন"
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </label>
          <label className="block">
            আপনার মোবাইল *
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="আপনার মোবাইল নাম্বার লিখুন"
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </label>

          {/* Shipping Location Radio Buttons */}
          <div className="block">
            <p className="font-medium mb-2">Shipping Location *</p>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="shippingLocation"
                checked={checkoutData.shippingCost === 80}
                onChange={() => {
                  setCheckoutData((prev) => ({
                    ...prev,
                    shippingCost: 80,
                  }));
                }}
              />
              <span>ঢাকার ভিতরে: (80৳)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shippingLocation"
                checked={checkoutData.shippingCost === 120}
                onChange={() => {
                  setCheckoutData((prev) => ({
                    ...prev,
                    shippingCost: 120,
                  }));
                }}
              />
              <span>ঢাকার বাইরে: (120৳)</span>
            </label>
          </div>

          <input
            type="hidden"
            name="orderDetails"
            value={checkoutData.cartItems
              .map(
                (item) =>
                  `- ${item.name} (Size: ${item.size}, Qty: ${item.quantity}, Price: ${item.price}৳)`
              )
              .join("\n")}
          />
          <input type="hidden" name="totalPrice" value={total.toString()} />

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-6"
          >
            {formStatus.loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>

      {/* Order Summary Section (Remains Unchanged) */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
        <div className="space-y-5">
          {checkoutData.cartItems.length > 0 ? (
            checkoutData.cartItems.map((item) => (
              <div
                key={item.id}
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
