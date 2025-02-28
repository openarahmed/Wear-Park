"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  base: string;
  price: string;
  salePrice?: string;
  rating: number;
  image: string;
  isOnSale: boolean;
  details: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Blouse 1",
    base: "Women's Collection",
    price: "$280.00",
    salePrice: "On sale from $280.00",
    rating: 4.5,
    image:
      "https://oval-square.com/cdn/shop/files/20389-7016_13_800x.jpg?v=1723646356",
    isOnSale: true,
    details: "100% Cotton Imported Fabrics. Premium Snap Button.",
  },
  {
    id: 2,
    name: "Blouse 2",
    base: "Women's Collection",
    price: "$280.00",
    salePrice: "On sale from $280.00",
    rating: 4.5,
    image:
      "https://oval-square.com/cdn/shop/files/20389-7016_13_800x.jpg?v=1723646356",
    isOnSale: true,
    details: "100% Cotton Imported Fabrics. Premium Snap Button.",
  },
  {
    id: 3,
    name: "Blouse 3",
    base: "Women's Collection",
    price: "$280.00",
    salePrice: "On sale from $280.00",
    rating: 4.5,
    image:
      "https://oval-square.com/cdn/shop/files/20389-7016_13_800x.jpg?v=1723646356",
    isOnSale: true,
    details: "100% Cotton Imported Fabrics. Premium Snap Button.",
  },
  {
    id: 4,
    name: "Blouse 4",
    base: "Exclusive Collection",
    price: "$89.00",
    rating: 5,
    image:
      "https://cdhstudio.com/cdn/shop/files/22_cd653f6a-fb42-4cd5-adf0-0ff5f8a402ff.webp?v=1723535950&width=1200",
    isOnSale: false,
    details: "Elegant exclusive collection blouse with premium fabric.",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === Number(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size: selectedSize,
        },
      ];

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      router.push("/cart");
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
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600">{product.base}</p>
          <p className="text-xl font-semibold mt-2">
            {product.isOnSale ? product.salePrice : product.price}
          </p>
          <p className="mt-4">{product.details}</p>

          {/* Size Selection */}
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
              className="bg-black text-white px-6 py-2"
              disabled={!selectedSize}
            >
              Buy Now
            </button>
            <button
              className="border border-gray-400 px-6 py-2"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
