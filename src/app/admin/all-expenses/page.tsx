"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AllExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/admin/expenses");
      setExpenses(response.data);
    } catch {
      toast.error("Failed to fetch expenses");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-8">All Expenses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {expenses.map((expense) => (
          <div key={expense.id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{expense.name}</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${expense.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : expense.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {expense.status}
              </span>
            </div>
            <p className="mb-2"><strong>User:</strong> {expense.username}</p>
            <p className="mb-2"><strong>Amount:</strong> ₹{expense.amount}</p>
            <p className="mb-2"><strong>Date:</strong> {expense.expenseDate}</p>
            <p className="mb-4"><strong>Description:</strong> {expense.description}</p>
            <div className="mt-5">
              <Link
                href={`/expenses/${expense.id}/comments`}
                className="bg-black text-white px-4 py-2 rounded-lg inline-block"
              >
                Comments
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}