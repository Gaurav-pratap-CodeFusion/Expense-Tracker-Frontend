"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="p-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage your expenses easily.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/expenses"
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-3">My Expenses</h2>
            <p className="text-gray-600">View and manage all your expenses.</p>
          </Link>

          <Link
            href="/expenses/add"
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-3">Add Expense</h2>
            <p className="text-gray-600">Create a new expense request.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}