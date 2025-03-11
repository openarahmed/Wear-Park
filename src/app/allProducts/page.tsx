/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  base: string;
  price: number;
  rating: number;
  image: string;
  isOnSale: boolean;
  category: string;
  description: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://server-wear-park.vercel.app/products");
        const jsonData = await res.json();

        if (jsonData.success && jsonData.data.products) {
          const fetchedProducts = jsonData.data.products.map(
            (product: any) => ({
              _id: product._id,
              name: product.name,
              base: product.base || "Unknown Collection",
              price: parseFloat(product.price) || 0,
              rating: product.rating || 0,
              image: product.image || "https://via.placeholder.com/500",
              isOnSale: product.isOnSale ?? false,
              category: product.category || "Uncategorized",
              description: product.description || "No description available",
            })
          );
          setProducts(fetchedProducts);
        } else {
          console.error("Invalid API response:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const goToProductDetails = (product: Product) => {
    const query = new URLSearchParams({
      id: product._id,
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description,
    }).toString();

    router.push(`/singleProduct/${product._id}?${query}`);
  };

  return (
    <section className="md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-start">
          ALL PRODUCTS
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="p-4 bg-white rounded-md shadow-md h-[450px] flex flex-col"
              >
                <div className="relative w-full h-[250px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-500 text-xs">{product.category}</p>

                <div className="flex items-center mt-2">
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
                <p className="text-gray-700 text-sm mt-2 font-semibold">
                  {product.price}৳
                </p>

                <button
                  onClick={() => goToProductDetails(product)}
                  className="w-full mt-auto bg-blue-600 text-white py-2 rounded-md text-sm font-semibold"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
