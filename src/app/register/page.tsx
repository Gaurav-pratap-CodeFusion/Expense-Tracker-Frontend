"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { registerUser } from "@/services/authService";

export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      username: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await registerUser(formData);

      toast.success("Registration successful");

      router.push("/login");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />

        <input
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-6 text-black"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Register
        </button>

      </form>

    </div>
  );
}