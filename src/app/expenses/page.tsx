"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  getMyExpenses,
} from "@/services/expenseService";

import { Expense } from "@/types/Expense";

export default function ExpensesPage() {

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    try {

      const data =
        await getMyExpenses();

      setExpenses(data);

    } catch {

      toast.error(
        "Failed to load expenses"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6 text-black">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          My Expenses

        </h1>

        <Link
          href="/expenses/add"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Expense
        </Link>

      </div>

      <div className={
        expenses.length === 0
          ? ""
          : "grid grid-cols-1 md:grid-cols-2 gap-5"
      }>

        {expenses.length === 0 && (

          <div className="md:col-span-2 w-full">

            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm w-full">

              <h2 className="text-2xl font-semibold mb-2 text-black">

                No Expenses Found

              </h2>

              <p className="text-gray-500">

                Start by adding your first expense.

              </p>

            </div>

          </div>

        )}

        {expenses.map((expense) => (

          <div
            key={expense.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >

            <div className="flex justify-between items-start mb-4">

              <div>

                <h2 className="text-xl font-semibold text-black">

                  {expense.name}

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                  {expense.expenseDate}

                </p>

              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium flex items-center justify-center min-w-[90px]
          ${expense.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : expense.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >

                {expense.status}

              </span>

            </div>

            <div className="mb-5">

              <p className="text-sm text-gray-500 mb-1">

                Amount

              </p>

              <h3 className="text-2xl font-bold text-black">

                ₹{expense.amount}

              </h3>

            </div>

            <div className="mb-6">

              <p className="text-sm text-gray-500 mb-1">

                Description

              </p>

              <p className="text-gray-700 leading-6">

                {expense.description}

              </p>

            </div>

            <Link
              href={`/expenses/${expense.id}`}
              className="inline-block bg-black text-white px-4 py-2 rounded-lg"
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}