/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";

// Define the type for dropdownOpen state
type DropdownState = {
  shop: boolean;
  pages: boolean;
};

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    shop: false,
    pages: false,
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white text-black relative px-5 z-50 shadow-md">
      <div className="flex items-center justify-between mx-auto py-4 max-w-screen-xl">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            {" "}
            <span className="text-3xl font-bold">iShopMat</span>
          </Link>{" "}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search ..."
            className="w-full p-2 pl-4 pr-10 border border-black rounded-md focus:outline-none"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-black text-white px-4 flex items-center justify-center rounded-r-md">
            <FaSearch />
          </button>
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <Link href="/cart">
            <FaShoppingCart className="text-5xl cursor-pointer" />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
