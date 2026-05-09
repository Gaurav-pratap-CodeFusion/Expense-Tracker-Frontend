"use client";

import Link from "next/link";

import { Expense } from "@/types/Expense";

interface Props {

  expense: Expense;

  onDelete?: (
    id: number
  ) => void;
}

export default function ExpenseCard({
  expense,
  onDelete,
}: Props) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-semibold mb-2 text-black">
        {expense.name}
      </h2>

      <p className="mb-2 text-black">
        ₹{expense.amount}
      </p>

      <p className="mb-2 text-black">
        {expense.status}
      </p>

      <p className="mb-4 text-gray-600">
        {expense.description}
      </p>

      <div className="flex flex-wrap gap-3">

        <Link
          href={`/expenses/${expense.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View
        </Link>

        <Link
          href={`/expenses/update/${expense.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update
        </Link>

        <Link
          href={`/expenses/${expense.id}/comments`}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Comments
        </Link>

        {onDelete && (

          <button
            onClick={() =>
              onDelete(expense.id)
            }
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        )}

      </div>

    </div>
  );
}