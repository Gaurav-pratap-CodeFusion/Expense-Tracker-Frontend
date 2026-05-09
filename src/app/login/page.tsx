"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("roles", JSON.stringify(response.roles));
      if (response.roles.includes("ROLE_ADMIN")) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 text-black"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">Login</button>

        <p className="text-center mt-4 text-black">
          No account? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}