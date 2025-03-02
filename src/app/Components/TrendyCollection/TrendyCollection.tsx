"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";
import { FaRightLeft } from "react-icons/fa6";

interface Product {
  id: number;
  name: string;
  base?: string;
  price: string;
  salePrice?: string;
  rating: number;
  image: string;
  isOnSale: boolean;
  sizes?: string[];
  description?: string[];
}

const TrendyCollection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // UseEffect to ensure the client-side fetching happens after mounting
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const goToProductDetails = (product: Product) => {
    const query = new URLSearchParams({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      sizes: JSON.stringify(product.sizes || ["L", "M", "XL"]),
      description: JSON.stringify(product.description || []),
    }).toString();

    router.push(`/singleProduct/${product.id}?${query}`);
  };

  return (
    <section className="md:py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-start">
          Choose Your Products
        </h2>
        <p className="text-gray-600 mb-8 text-start">
          Discover the latest ready-to-wear dresses.
        </p>
        <div className="grid justify-end pr-5 text-xl font-semibold">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/allProducts")}
          >
            View More
          </button>
        </div>

        {/* Product Grid (Show only first 8 products) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="group relative p-4 bg-white rounded-md"
            >
              <div className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>

                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-md h-[300px] md:h-full mx-auto"
                  width={500}
                  height={750}
                />

                {product.isOnSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                    Sale -8%
                  </span>
                )}

                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Link href="https://facebook.com">
                    <FaHeart className="w-5 h-5 text-white" />
                  </Link>
                  <Link href="https://instagram.com">
                    <FaEye className="w-5 h-5 text-white" />
                  </Link>
                  <Link href="https://instagram.com">
                    <FaRightLeft className="w-5 h-5 text-white" />
                  </Link>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-sm text-gray-500 font-medium">
                  {product.base}
                </h4>
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className="flex justify-center items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  {product.isOnSale ? product.salePrice : product.price}
                </p>
              </div>

              <div className="absolute bottom-40 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button
                  onClick={() => goToProductDetails(product)}
                  className="w-[80%] bg-white text-black px-6 py-2 text-sm font-semibold border-t border-gray-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendyCollection;
