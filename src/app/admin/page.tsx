"use client";

import Link from "next/link";

export default function AdminPage() {

  return (

    <div className="min-h-screen bg-gray-100 p-8 text-black">

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">

          Admin Dashboard

        </h1>

        <p className="text-gray-600 text-lg">

          Manage and review all expense requests.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          href="/admin/pending"
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
        >

          <h2 className="text-2xl font-semibold mb-3">

            Pending Expenses

          </h2>

          <p className="text-gray-600">

            Review, approve or reject pending expenses.

          </p>

        </Link>

        <Link
          href="/admin/all-expenses"
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
        >

          <h2 className="text-2xl font-semibold mb-3">

            All Expenses

          </h2>

          <p className="text-gray-600">

            View all submitted expenses and details.

          </p>

        </Link>

      </div>

    </div>
  );
}