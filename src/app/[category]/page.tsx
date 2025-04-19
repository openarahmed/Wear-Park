/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number | string; // Price can be number or string
  image: string;
  rating: number;
  category: string;
  description: string;
}

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const categoryFromUrl = pathParts[pathParts.length - 1];
      setCategory(decodeURIComponent(categoryFromUrl));
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://server-wear-park.vercel.app/products"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          // Ensure prices are numbers
          const processedProducts = result.data.products.map(
            (product: any) => ({
              ...product,
              price:
                typeof product.price === "string"
                  ? parseFloat(product.price)
                  : product.price,
            })
          );
          setProducts(processedProducts);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error loading products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numericPrice) ? "N/A" : `$${numericPrice.toFixed(2)}`;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <div>Loading products...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <div className="text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          {category.charAt(0).toUpperCase() +
            category.slice(1).replace("-", " ")}
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-gray-500 py-8">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="relative h-60">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-cover rounded-t-lg"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500">{formatPrice(product.price)}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-yellow-500">
                      {product.rating} ★
                    </span>
                    <Link
                      href={{
                        pathname: `/singleProduct/${product._id}`,
                        query: {
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          sizes: JSON.stringify(["S", "M", "L", "XL"]),
                          description: JSON.stringify(product.description),
                          category: product.category,
                        },
                      }}
                      className="text-black mt-2 text-sm py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
