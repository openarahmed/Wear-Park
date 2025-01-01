"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

// Define the type for dropdownOpen state
type DropdownState = {
  shop: boolean;
  pages: boolean;
};

const Navbar = () => {
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
          >
            <div className="hover:text-gray-400 py-2 cursor-pointer">Shop</div>
            {dropdownOpen.shop && (
              <div className="absolute bg-white text-black w-screen mt-2 shadow-lg z-50 p-5 grid grid-cols-3 gap-5 -left-[83px] top-12">
                <div>
                  <h4 className="font-bold mb-2">Layout</h4>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/shop/filter-vertical">
                        1 - Filter Vertical
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-top">2 - Filter Top</Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-drawer-right">
                        3 - Filter Drawer Right
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-drawer-left">
                        4 - Filter Drawer Left
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-collapse-right">
                        5 - Filter Collapse Right
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-collapse-left">
                        6 - Filter Collapse Left
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-2-columns">Grid - 2 Columns</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-3-columns">Grid - 3 Columns</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-4-columns">Grid - 4 Columns</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Features</h4>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/shop/without-filter">Without Filter</Link>
                    </li>
                    <li>
                      <Link href="/shop/banner-image">Banner Image</Link>
                    </li>
                    <li>
                      <Link href="/shop/banner-no-image">Banner No Image</Link>
                    </li>
                    <li>
                      <Link href="/shop/banner-split">Banner Split</Link>
                    </li>
                    <li>
                      <Link href="/shop/collection-list">Collection List</Link>
                    </li>
                    <li>
                      <Link href="/shop/pagination">Pagination</Link>
                    </li>
                    <li>
                      <Link href="/shop/infinity">Infinity</Link>
                    </li>
                    <li>
                      <Link href="/shop/load-more">Load More</Link>
                    </li>
                    <li>
                      <Link href="/shop/list-color">List Color</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Hover Style</h4>
                  <ul className="space-y-1">
                    {[...Array(12)].map((_, i) => (
                      <li key={i}>
                        <Link href={`/shop/hover-style-${i + 1}`}>
                          Hover Style {i + 1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("pages")}
            onMouseLeave={() => handleDropdownLeave("pages")}
          >
            <div className="hover:text-gray-400 py-2 cursor-pointer">Pages</div>
            {dropdownOpen.pages && (
              <div className="absolute bg-white text-black w-screen mt-2 shadow-lg z-50 p-5 grid grid-cols-3 gap-5 -left-[139px] top-12">
                <div>
                  <h4 className="font-bold mb-2">Layout</h4>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/shop/filter-vertical">
                        1 - Filter Vertical
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-top">2 - Filter Top</Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-drawer-right">
                        3 - Filter Drawer Right
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-drawer-left">
                        4 - Filter Drawer Left
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-collapse-right">
                        5 - Filter Collapse Right
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/filter-collapse-left">
                        6 - Filter Collapse Left
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-2-columns">Grid - 2 Columns</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-3-columns">Grid - 3 Columns</Link>
                    </li>
                    <li>
                      <Link href="/shop/grid-4-columns">Grid - 4 Columns</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Features</h4>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/shop/without-filter">Without Filter</Link>
                    </li>
                    <li>
                      <Link href="/shop/banner-image">Banner Image</Link>
                    </li>
                    <li>
                      <Link href="/shop/banner-no-image">Banner No Image</Link>
                    </li>
                    <li>
                      <Link href="/shop/banner-split">Banner Split</Link>
                    </li>
                    <li>
                      <Link href="/shop/collection-list">Collection List</Link>
                    </li>
                    <li>
                      <Link href="/shop/pagination">Pagination</Link>
                    </li>
                    <li>
                      <Link href="/shop/infinity">Infinity</Link>
                    </li>
                    <li>
                      <Link href="/shop/load-more">Load More</Link>
                    </li>
                    <li>
                      <Link href="/shop/list-color">List Color</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Hover Style</h4>
                  <ul className="space-y-1">
                    {[...Array(12)].map((_, i) => (
                      <li key={i}>
                        <Link href={`/shop/hover-style-${i + 1}`}>
                          Hover Style {i + 1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link href="/product" className="hover:text-gray-400 py-2">
            Product
          </Link>
          <Link href="/blog" className="hover:text-gray-400 py-2">
            Blog
          </Link>
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
          <Link href={``}>
            <FaSearch className="text-xl hover:text-gray-400 cursor-pointer" />
          </Link>
          <FaPerson className="text-xl hover:text-gray-400 cursor-pointer" />
          <FaHeart className="text-xl hover:text-gray-400 cursor-pointer" />
          <FaShoppingCart className="text-xl hover:text-gray-400 cursor-pointer" />
          <FaBars className="text-xl hover:text-gray-400 cursor-pointer hidden md:block" />
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
