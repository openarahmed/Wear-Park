"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, [auth]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white text-black relative px-5 z-50 shadow-md">
      <div className="flex items-center justify-between mx-auto py-4 max-w-screen-xl">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="relative w-40 h-12">
              {" "}
              {/* Adjust width and height as needed */}
              <Link href="/">
                <div className="relative w-52 h-16">
                  {" "}
                  {/* Increased from w-40 h-12 */}
                  <Image
                    src="https://i.postimg.cc/pVZf3qSN/wear-park-logo.jpg"
                    alt="Wear Park Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="relative md:flex space-x-8">
          <Link href="/cart">
            <FaShoppingCart className="text-3xl cursor-pointer" />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 right-[1px] md:right-[75px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}

          {/* Navbar Links for Desktop */}
          <div className="hidden md:flex space-x-8">
            {auth?.isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-xl hover:text-gray-700">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    auth.logout();
                    router.push("/login");
                  }}
                  className="flex items-center space-x-2 text-xl hover:text-gray-700"
                >
                  <FaUserCircle className="text-xl" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                className="text-xl hover:text-gray-700"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-3xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white absolute top-16 left-0 right-0 shadow-lg`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {auth?.isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-xl hover:text-gray-700">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  auth.logout();
                  router.push("/login");
                }}
                className="text-xl hover:text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-xl hover:text-gray-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
