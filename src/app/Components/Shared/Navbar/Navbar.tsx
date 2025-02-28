/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

// Define the type for dropdownOpen state
type DropdownState = {
  shop: boolean;
  pages: boolean;
};

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    // Run on mount
    updateCartCount();

    // Listen for storage changes (when an item is added from another component)
    window.addEventListener("storage", updateCartCount);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    shop: false,
    pages: false,
  });

  // Toggle function for the hamburger menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle hover to open/close dropdowns
  const handleDropdownEnter = (menu: "shop" | "pages") => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: true,
    }));
  };

  const handleDropdownLeave = (menu: "shop" | "pages") => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: false,
    }));
  };

  return (
    <div className="bg-white text-black relative px-5 z-50 group">
      {/* Navbar Container */}
      <div className="flex items-center justify-between mx-auto py-5 max-w-screen-xl">
        {/* Left Side Links (Big Screen) */}
        <div className="hidden md:flex gap-5">
          <Link href="/" className="hover:text-gray-400 py-2">
            Home
          </Link>
          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("shop")}
            onMouseLeave={() => handleDropdownLeave("shop")}
          ></div>
        </div>

        {/* Center - Company Name */}
        <div className=" flex items-center gap-10">
          {/* Toggle between hamburger and close icon */}
          {isOpen ? (
            <FaTimes
              className="text-xl hover:text-gray-400 cursor-pointer md:hidden"
              onClick={toggleMenu}
            />
          ) : (
            <FaBars
              className="text-xl hover:text-gray-400 cursor-pointer md:hidden"
              onClick={toggleMenu}
            />
          )}
          <Link
            href="/"
            className=" md:pr-20 text-2xl md:text-3xl font-bold text-center"
          >
            ShopiMat
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-4xl hover:text-gray-400 cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>{" "}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      {isOpen && (
        <div className=" p-4 text-black md:hidden z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="block  hover:bg-gray-600 px-3 rounded-xl  px-3 rounded-xl  py-2"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block  hover:bg-gray-600 px-3 rounded-xl  py-2"
            >
              Shop
            </Link>
            <Link
              href="/product"
              className="block  hover:bg-gray-600 px-3 rounded-xl  py-2"
            >
              Product
            </Link>
            <Link
              href="/blog"
              className="block  hover:bg-gray-600 px-3 rounded-xl  py-2"
            >
              Blog
            </Link>
            <Link
              href="/pages"
              className="block  hover:bg-gray-600 px-3 rounded-xl  py-2"
            >
              Pages
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
