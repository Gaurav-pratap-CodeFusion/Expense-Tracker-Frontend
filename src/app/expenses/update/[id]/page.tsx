"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getExpenseById, updateExpense } from "@/services/expenseService";

export default function UpdateExpensePage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    expenseDate: "",
    description: "",
  });

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    const expense = await getExpenseById(params.id as string);
    setFormData({
      name: expense.name,
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      description: expense.description,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExpense(params.id as string, { ...formData, amount: Number(formData.amount) });
    toast.success("Updated");
    router.push("/expenses");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Update Expense</h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="date"
          name="expenseDate"
          value={formData.expenseDate}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 text-black"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-6 text-black"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">Update Expense</button>
      </form>
    </div>
  );
}