"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { categories } from "../Components/ShopByCategory/ShopByCategory";

// ✅ Define Product Type
type Product = {
  name: string;
  base: string;
  price: string;
  rating: number;
  image: string;
  isOnSale: boolean;
  category: string;
  description: string;
};

export default function CreateProductPage() {
  const router = useRouter();

  // ✅ State for Form Fields
  const [formData, setFormData] = useState<Product>({
    name: "",
    base: "",
    price: "",
    rating: 0,
    image: "",
    isOnSale: false,
    category: "",
    description: "",
  });

  // ✅ Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // ✅ Handle Form Submission
  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      price: parseFloat(formData.price).toFixed(2), // Ensure price is properly formatted
      rating: Number(formData.rating), // Convert rating to number
      isOnSale: Boolean(formData.isOnSale), // Ensure isOnSale is boolean
    };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Unauthorized! Please log in again.");
        router.push("/login");
        return;
      }

      const response = await fetch(
        "https://server-wear-park.vercel.app/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formattedData),
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        Swal.fire({
          title: "Success!",
          text: "Product created successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard");
      } else {
        Swal.fire({
          title: "Error!",
          text: responseData?.message || "Failed to create product.",
          icon: "error",
        });
      }
    } catch (error) {
      toast.error("Failed to create product!");
      console.error("Error in creating product:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleCreateProduct} className="space-y-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <Input
          name="base"
          value={formData.base}
          onChange={handleChange}
          placeholder="Base Collection"
        />
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <Input
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
        />
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        {/* Dropdown for Category Selection */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="" disabled>
            Select a Category
          </option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        {/* Checkbox for Sale */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isOnSale"
            checked={formData.isOnSale}
            onChange={handleChange}
          />
          <span>On Sale</span>
        </label>

        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
}
