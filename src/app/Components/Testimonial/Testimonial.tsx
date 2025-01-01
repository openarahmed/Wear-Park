/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import the Next.js Image component

const testimonials = [
  {
    review:
      "One of the most streamlined, considered stores we've come across. Clothing, accessories, all at an accessible price point.",
    author: "Scott O.",
    rating: 5,
    image:
      "https://media.gettyimages.com/id/1310472598/photo/women-looking-at-clothe-in-a-store.jpg?s=612x612&w=gi&k=20&c=OiTJu8fMfC_dI15zQY8p7-DwOmaOui3htUjKyNkfg9M=", // Replace with your image path
  },
  {
    review: "This is one of the best I ever had",
    author: "Scott O.",
    rating: 5,
    image:
      "https://media.gettyimages.com/id/1215951317/photo/2-asian-chinese-female-friends-queuing-in-front-of-cashier-of-clothing-store-for-payment.jpg?s=612x612&w=gi&k=20&c=R0PBzTS_4kbjM0zhGRIHp09N1TOSVhpoqvQ3pMdf5zM=", // Replace with your image path
  },
];

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-[#FAF4EE] h-auto py-10 px-6 flex justify-center items-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-6">
        {/* Left Section: Review */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-600 mb-2">
            5,300+ REVIEWS AND COUNTING
          </p>
          <div className="flex mb-4">
            {Array(testimonials[currentSlide].rating)
              .fill("")
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927a1 1 0 011.902 0l1.714 4.365a1 1 0 00.95.676h4.584c.969 0 1.371 1.24.588 1.81l-3.722 2.688a1 1 0 00-.364 1.118l1.714 4.365c.34.866-.755 1.578-1.539 1.118l-3.722-2.688a1 1 0 00-1.176 0l-3.722 2.688c-.784.46-1.879-.252-1.539-1.118l1.714-4.365a1 1 0 00-.364-1.118L2.205 9.778c-.783-.57-.381-1.81.588-1.81h4.584a1 1 0 00.95-.676l1.714-4.365z" />
                </svg>
              ))}
          </div>
          <blockquote className="text-2xl font-semibold text-gray-900 mb-4">
            "{testimonials[currentSlide].review}"
          </blockquote>
          <p className="text-sm text-gray-700 mb-6">
            — {testimonials[currentSlide].author}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 flex justify-center">
          {/* Using Next.js Image component */}
          <Image
            src={testimonials[currentSlide].image} // Image source from the object
            alt="Testimonial"
            width={500} // Define width for optimization
            height={400} // Define height for optimization
            className="rounded-lg object-cover max-h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
