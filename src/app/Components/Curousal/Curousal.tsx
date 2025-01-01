"use client";

import React from "react";

const Carousel = () => {
  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="overflow-hidden">
            <div className="whitespace-nowrap animate-marquee">
              {/* First instance of the text */}
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              {/* Duplicate instance for seamless loop */}
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              {/* Second instance to ensure seamless scroll */}
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
              <span className="inline-block mx-4 text-7xl font-bold text-gray-800">
                NEW IN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0); /* Start with text fully visible */
          }
          100% {
            transform: translateX(-100%); /* Move out of the container */
          }
        }

        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
};

export default Carousel;
