/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { categories } from "../Components/ShopByCategory/ShopByCategory";

// ✅ Define Product Type
type Product = {
  _id?: string; // Make _id optional
  name: string;
  base: string;
  price: string;
  rating: number;
  image: string;
  isOnSale: boolean;
  category: string;
  description: string;
};

// ✅ Validation Schema (Zod)
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  base: z.string().min(1, "Base collection is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  image: z.string().url("Image URL must be valid"),
  isOnSale: z.boolean(),
  category: z.string().min(1, "Category is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

export default function DashboardPage() {
  const router = useRouter();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
    } else if (role !== "admin") {
      router.push("/");
    }
  }, [router]);

  // Fetch products using fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://server-wear-park.vercel.app/products"
        );
        const data = await response.json();
        setProducts(data.data.products);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Form Handling
  const { register, handleSubmit, reset, setValue } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  // Handle Create/Update Product
  const handleUpdateProduct = async (data: Product) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Unauthorized! Please log in again.");
        router.push("/login");
        return;
      }

      // Update Product
      const response = await fetch(
        `https://server-wear-park.vercel.app/products/${editProduct?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        Swal.fire({
          title: "Success!",
          text: "Product update successful!",
          icon: "success",
          confirmButtonText: "Ok",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === editProduct?._id
                ? { ...product, ...data }
                : product
            )
          );
          setIsUpdateModalOpen(false);
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: responseData?.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      toast.error("Failed to update product!");
      console.error("Error in update product:", error);
    }
  };

  // Handle Edit Product
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    Object.keys(product).forEach((key) => {
      setValue(key as keyof Product, product[key as keyof Product]);
    });
    setIsUpdateModalOpen(true);
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("authToken");
          if (!token) {
            toast.error("Unauthorized! Please log in again.");
            router.push("/login");
            return;
          }

          const response = await fetch(
            `https://server-wear-park.vercel.app/products/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );

          if (response.ok) {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
            setProducts(products.filter((product) => product._id !== id));
          } else {
            Swal.fire("Error!", "Failed to delete product.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <Button onClick={() => router.push("/addproduct")}>Add Product</Button>

      {/* Edit Product Modal */}
      <Dialog
        open={isUpdateModalOpen}
        onOpenChange={(open: boolean | ((prevState: boolean) => boolean)) =>
          setIsUpdateModalOpen(open)
        }
      >
        <DialogContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Product</h2>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateProduct)}
            className="space-y-4"
          >
            <Input {...register("name")} placeholder="Product Name" />
            <Input {...register("base")} placeholder="Base Collection" />
            <Input {...register("price")} placeholder="Price" />
            <Input
              {...register("rating", { valueAsNumber: true })}
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating"
            />
            <Input {...register("image")} placeholder="Image URL" />

            {/* Dropdown for Category */}
            <select
              {...register("category")}
              className="w-full p-2 border rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <Input {...register("description")} placeholder="Description" />
            <Button type="submit">Update</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Products Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product._id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
