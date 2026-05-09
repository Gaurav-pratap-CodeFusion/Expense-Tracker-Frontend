"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addExpense } from "@/services/expenseService";

export default function AddExpensePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    expenseDate: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addExpense({ ...formData, amount: Number(formData.amount) });
      toast.success("Expense added");
      router.push("/expenses");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Add Expense</h1>

        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="date"
          name="expenseDate"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-6 text-black"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">Add Expense</button>
      </form>
    </div>
  );
}