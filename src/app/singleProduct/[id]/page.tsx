"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string | string[] | undefined;
  id: string; // Use string since the _id is a string
  name: string;
  base: string;
  price: string;
  salePrice?: string;
  rating: number;
  image: string;
  isOnSale: boolean;
  details: string;
  description: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "https://server-wear-park.vercel.app/products"
        );
        const data = await response.json();

        if (data.success && data.data && data.data.products) {
          // Find the product by matching the _id from the API
          const foundProduct = data.data.products.find(
            (p: Product) => p._id === id
          );
          setProduct(foundProduct || null);
        } else {
          console.error("Product data not found in the response");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          price: product.isOnSale
            ? parseFloat(product.salePrice || product.price)
            : parseFloat(product.price),
          size: selectedSize,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      router.push("/cart");
    }
  };

  const handleBuyNow = () => {
    if (product && selectedSize) {
      console.log("Product Price Before Processing:", product.price);

      const getPrice = (price: string | undefined) => {
        const sanitizedPrice = price?.replace(/[^\d.]/g, "");
        const numericPrice =
          sanitizedPrice && !isNaN(Number(sanitizedPrice))
            ? Number(sanitizedPrice)
            : 0;
        return numericPrice;
      };

      const price = product.isOnSale
        ? getPrice(product.salePrice) || getPrice(product.price)
        : getPrice(product.price);

      console.log("Final Price to be Stored:", price);

      if (price === 0) {
        console.error("Invalid price detected, check product data:", product);
        alert("Error: Product price is missing or invalid. Please try again.");
        return;
      }

      const checkoutData = {
        cartItems: [
          {
            id: product.id,
            name: product.name,
            base: product.base,
            price: price,
            quantity: 1,
            size: selectedSize,
            image: product.image,
          },
        ],
        shippingCost: 120,
      };

      console.log("Checkout Data Before Saving:", checkoutData);
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      router.push("/checkout");
    }
  };

  if (!product)
    return (
      <p className="text-center text-xl font-semibold">Product not found</p>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600">{product.base}</p>
          <p className="text-xl font-semibold mt-2">
            {product.isOnSale
              ? product.salePrice
                ? `${product.salePrice}৳`
                : `${product.price}৳`
              : `${product.price}৳`}
          </p>
          <p className="mt-4">{product.details}</p>
          <div className="mt-6">
            <p className="font-semibold mb-2">Select Size:</p>
            <div className="flex gap-4">
              {["M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`border px-4 py-2 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "border-gray-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              className={`px-6 py-2 ${
                selectedSize
                  ? "bg-black text-white"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleBuyNow}
              disabled={!selectedSize}
            >
              Buy Now
            </button>
            <button
              className={`border border-gray-400 px-6 py-2 ${
                selectedSize ? "" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Add to Cart
            </button>
          </div>
          <h1 className="mt-10">{product.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
