import Link from "next/link";
import Image from "next/image"; // Import the Image component
import React from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-200 text-black py-16">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Newsletter Section */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">
            SUBSCRIBE TO OUR NEWSLETTER
          </h3>
          <p className="text-sm mb-6 leading-relaxed">
            Sign up for private sales, new launches, style tips and more.
          </p>
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-black px-4 py-2 text-sm"
            />
            <button className="bg-black text-white px-6 py-2 text-sm font-bold">
              SUBSCRIBE
            </button>
          </div>
          <div className="flex space-x-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-gray-700" />
            <FaPinterestP className="cursor-pointer hover:text-gray-700" />
            <FaInstagram className="cursor-pointer hover:text-gray-700" />
            <FaTiktok className="cursor-pointer hover:text-gray-700" />
          </div>
        </div>

        {/* Information Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Order History</li>
            <li>Wishlist</li>
            <li>Specials</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Footer Menu Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">FOOTER MENU</h3>
          <ul className="space-y-2 text-sm">
            <li>Search</li>
            <li>Contact Us</li>
            <li>Returns</li>
            <li>Site Map</li>
            <li>Brands</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
          <p className="text-sm mb-2">Email: clientcare@bunch.com</p>
          <p className="text-sm mb-2">Phone: 1.888.838.3022</p>
          <p className="text-sm">
            Hours: Monday – Thursday: 9AM – 7PM ET, Friday: 9AM – 2PM ET
          </p>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-black mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-center lg:text-left">
            © 2025, Qx Aarau (Password: 1). All rights reserved.
          </div>

          {/* Language and Currency */}
          <div className="flex space-x-4">
            <select className="border border-black px-4 py-2 text-sm">
              <option>Australia (AUD $)</option>
              <option>United States (USD $)</option>
              <option>United Kingdom (GBP £)</option>
            </select>
            <select className="border border-black px-4 py-2 text-sm">
              <option>English</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          {/* Payment Icons */}
          <div className="flex space-x-4 text-2xl">
            <h1 className="text-sm">
              Designed & Developed By{" "}
              <span className="text-sm text-blue-700">
                <Link
                  href="https://codermat.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codermat
                </Link>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div>
        <a
          href="https://wa.me/+8801864314771"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp"
        >
          <div className="fixed bottom-[60px] md:bottom-[10px] right-2">
            <button className="rounded-full hover:bg-white hover:text-black transition-all duration-200">
              {/* Replace <img> with <Image> */}
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                alt="WhatsApp"
                width={56} // Set the width
                height={56} // Set the height
                className="md:w-14 w-9"
              />
            </button>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
