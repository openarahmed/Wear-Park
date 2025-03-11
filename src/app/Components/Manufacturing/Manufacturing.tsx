import React from "react";

const Manufacturing = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 md:px-12 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
      {/* Left Side: How It Works */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left leading-tight">
          Need Custom Clothes?
        </h2>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left mt-2">
          Fabrics that Match Your Personality
        </h2>
        <p className="text-gray-600 mt-4 text-sm md:text-base text-center md:text-left">
          Order 500+ custom T-shirts with high-quality production and fast
          delivery.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          {[
            {
              step: "1",
              title: "Submit Requirements",
              desc: "Choose product type, quantity, and design.",
            },
            {
              step: "2",
              title: "Get a Quote",
              desc: "Receive a price estimate within 24 hours.",
            },
            {
              step: "3",
              title: "Production Begins",
              desc: "We start manufacturing after confirmation.",
            },
            {
              step: "4",
              title: "Delivery & Payment",
              desc: "Receive the products at your doorstep.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 text-center"
            >
              <h3 className="text-lg md:text-xl font-semibold text-blue-600">
                {item.step}
              </h3>
              <h4 className="text-sm md:text-lg font-medium mt-2 text-gray-800">
                {item.title}
              </h4>
              <p className="text-gray-500 mt-2 text-xs md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Inquiry Form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-8 shadow-lg rounded-lg border border-gray-200">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Request a Quote
        </h3>
        <form className="grid gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-3 rounded w-full text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border p-3 rounded w-full text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Quantity (500+)"
            className="border p-3 rounded w-full text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Additional Details"
            className="border p-3 rounded w-full h-20 text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg w-full font-medium shadow-lg  transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Manufacturing;
