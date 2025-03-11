"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// ✅ Validation Schema (Zod)
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Form handling with react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // Handle form submission
    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const response = await fetch("https://server-wear-park.vercel.app/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                localStorage.setItem("authToken", responseData.data.token);
                localStorage.setItem("role", responseData.data.user.role);

                Swal.fire({
                    title: "Success!",
                    text: "Login successful!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    router.push("/dashboard");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: responseData?.message || "Invalid credentials, please try again.",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
            Swal.fire({
                title: "Error!",
                text: "Invalid credentials, please try again.",
                icon: "error",
                confirmButtonText: "Ok",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center py-32 bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register("username")}
                            placeholder="Username"
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    <div>
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full p-3 mt-4 text-white rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        Do not have an account? Contact <span className="text-purple-700 font-semibold">CoderMat</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
