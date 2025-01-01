"use client";

import React from "react";

const FeatureSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-10">
      {/* Left Section */}
      <div className="relative h-[500px] flex items-end group overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://thumbs.dreamstime.com/b/two-diverse-women-shopping-fashion-clothing-store-choosing-seasonal-updates-wardrobe-empty-space-two-women-shopping-159452111.jpg')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Content */}
        <div className="relative text-white text-center p-6 w-full z-10">
          <h4 className="text-sm uppercase tracking-widest mb-2">
            Mix and Match
          </h4>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Effortlessly Chic
          </h2>
          <p className="text-sm mb-4">
            Refresh your closet with wardrobe staples.
          </p>
          <button className="px-6 py-2 bg-white text-black font-semibold uppercase text-sm hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative h-[500px] flex items-end group overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/three-attractive-african-american-woman-brown-tunic-dress-posed-clothes-store-it-s-time-shopping-credit-cards-money-hands_627829-744.jpg')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Content */}
        <div className="relative text-white text-center p-6 w-full z-10">
          <h4 className="text-sm uppercase tracking-widest mb-2">
            The Best Basics
          </h4>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Essentials Only
          </h2>
          <p className="text-sm mb-4">
            Easy additions to incorporate into your closet.
          </p>
          <button className="px-6 py-2 bg-white text-black font-semibold uppercase text-sm hover:bg-gray-200 transition">
            Ship Essentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
