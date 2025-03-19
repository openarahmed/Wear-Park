"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Manufacturing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: "",
    details: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    emailjs
      .send(
        "service_5notukm",
        "template_ppz2a6u",
        formData,
        "UANiDaV9CE5zcmzkX"
      )
      .then(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (result) => {
          setFormStatus({ loading: false, success: true, error: null });
          Swal.fire({
            title: "Request Submitted!",
            text: "We will get back to you soon.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setFormData({ name: "", email: "", quantity: "", details: "" });
        },
        (error) => {
          setFormStatus({ loading: false, success: false, error: error.text });
          Swal.fire({
            title: "Error!",
            text: "There was an issue submitting your request. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      );
  };

  return (
    <div className="bg-gray-50 py-16 px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Need Custom Clothes?
        </h2>
        <p className="text-gray-600 mt-4">
          Order 500+ custom T-shirts with high-quality production and fast
          delivery.
        </p>
        <div className="grid grid-cols-2 gap-6 mt-8">
          {[
            "Submit Requirements",
            "Get a Quote",
            "Production Begins",
            "Delivery & Payment",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-lg rounded-lg border text-center"
            >
              <h3 className="text-lg font-semibold text-blue-600">
                {index + 1}
              </h3>
              <h4 className="text-lg font-medium mt-2 text-gray-800">
                {title}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white p-6 md:p-8 shadow-lg rounded-lg border">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Request a Quote
        </h3>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your Name"
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Your Email"
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            placeholder="Quantity (500+)"
            className="border p-3 rounded w-full"
            required
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            placeholder="Additional Details"
            className="border p-3 rounded w-full h-20"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg w-full"
          >
            {formStatus.loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Manufacturing;
