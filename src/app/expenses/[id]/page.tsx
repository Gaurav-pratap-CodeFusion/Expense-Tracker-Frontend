"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  deleteExpense,
  getExpenseById,
} from "@/services/expenseService";

export default function ExpenseDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const [expense, setExpense] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (params.id) {

      fetchExpense();
    }

  }, [params.id]);

  const fetchExpense = async () => {

    try {

      const data =
        await getExpenseById(
          params.id as string
        );

      setExpense(data);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load expense"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async () => {

    const confirmDelete =
      confirm(
        "Delete this expense?"
      );

    if (!confirmDelete) return;

    try {

      await deleteExpense(
        expense.id
      );

      toast.success(
        "Expense deleted"
      );

      router.push("/expenses");

    } catch {

      toast.error(
        "Delete failed"
      );
    }
  };

  const formatDate = (
    date: string
  ) => {

    return new Date(date)
      .toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>
    );
  }

  if (!expense) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Expense not found

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 text-black">

      <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">

            Expense Details

          </h1>

          <span
          className={`text-xs px-3 py-1 rounded-full font-medium flex items-center justify-center min-w-[90px]
          ${
            expense.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : expense.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >

            {expense.status}

          </span>

        </div>

        <div className="space-y-5">

          <div>

            <p className="font-semibold mb-1">

              Expense Name

            </p>

            <p>{expense.name}</p>

          </div>

          <div>

            <p className="font-semibold mb-1">

              Amount

            </p>

            <p>₹{expense.amount}</p>

          </div>

          <div>

            <p className="font-semibold mb-1">

              Expense Date

            </p>

            <p>{expense.expenseDate}</p>

          </div>

          <div>

            <p className="font-semibold mb-1">

              Description

            </p>

            <p>{expense.description}</p>

          </div>

          {/* <div>

            <p className="font-semibold mb-1">

              Created At

            </p>

            <p>

              {formatDate(expense.createdAt)}

            </p>

          </div> */}

        </div><br></br>

        <div className="flex flex-wrap gap-3 mt-8">

          <Link
            href={`/expenses/update/${expense.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Update
          </Link>

          <Link
            href={`/expenses/${expense.id}/comments`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Comments
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

          <Link
            href="/expenses"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

      </div>

    </div>
  );
}