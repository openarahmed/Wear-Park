"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

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
  }, []);

  const goToProductDetails = (product: Product) => {
    const query = new URLSearchParams({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    }).toString();

    router.push(`/singleProduct/${product.id}?${query}`);
  };

  return (
    <section className="md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-start">
          ALL PRODUCTS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-md">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={750}
                className="w-full h-auto object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
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
              <p className="text-gray-500 text-sm mt-2">{product.price}</p>

              <button
                onClick={() => goToProductDetails(product)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md text-sm font-semibold"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
