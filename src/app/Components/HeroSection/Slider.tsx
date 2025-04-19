"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    base: "Fall 2025 Winter Campaign",
    image:
      "https://i.pinimg.com/736x/8c/94/21/8c942103add9ed0d2b1481fafc113b04.jpg",
    title: "The Stage is Yours",
    description: "This is the first slide description.",
    button: "Discover the Campaign",
  },
  {
    id: 2,
    base: "10% Essential Bundles",

    image:
      "https://i.pinimg.com/736x/ad/d8/2f/add82ff8c38470f8889b2edbd2d82f48.jpg",
    title: "New In: Bundles",
    description: "This is the second slide description.",
    button: "Shop For Her",
  },
  {
    id: 3,
    base: "2025 Summer Campaign",

    image:
      "https://i.pinimg.com/736x/29/56/23/295623eb31d15769afbaf0232343131a.jpg",
    title: "The Stage is Yours",
    description: "This is the third slide description.",
    button: "Show Lastest arrival",
  },
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Text content */}
          <div className="absolute bottom-20 left-5 md:left-20 text-white z-20">
            <h3 className="uppercase ">{slide.base}</h3>
            <h1 className="text-2xl md:text-4xl font-bold uppercase py-3 md:py-8">
              {slide.title}
            </h1>
            <p className="mt-2 text-lg">{slide.description}</p>
            <Link href="/allProducts">
              <div className="pt-8 ">
                <button className="bg-white text-black p-3 font-semibold">
                  {slide.button}
                </button>
              </div>
            </Link>
          </div>
        </div>
      ))}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-30"
      >
        <FaArrowLeft className="md:text-3xl"></FaArrowLeft>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-30"
      >
        <FaArrowRight className="md:text-3xl"></FaArrowRight>
      </button>
    </div>
  );
};

export default HeroSlider;
