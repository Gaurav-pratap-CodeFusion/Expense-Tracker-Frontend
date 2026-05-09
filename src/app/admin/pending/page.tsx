"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function PendingPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const response = await api.get("/admin/expenses/pending");
      setExpenses(response.data);
    } catch {
      toast.error("Failed to fetch pending expenses");
    }
  };

  const approveExpense = async (id: number) => {
    try {
      await api.put(`/admin/expenses/${id}/approve`);
      toast.success("Expense approved");
      fetchPending();
    } catch {
      toast.error("Approve failed");
    }
  };

  const openRejectModal = (id: number) => {
    setSelectedExpenseId(id);
    setShowModal(true);
  };

  const closeRejectModal = () => {
    setShowModal(false);
    setRejectReason("");
  };

  const rejectExpense = async () => {
    if (!rejectReason) {
      toast.error("Please enter rejection reason");
      return;
    }
    try {
      await api.put(`/admin/expenses/${selectedExpenseId}/reject`, { message: rejectReason });
      toast.success("Expense rejected");
      closeRejectModal();
      fetchPending();
    } catch {
      toast.error("Reject failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pending Expenses</h1>
        <Link href="/admin" className="bg-black text-white px-4 py-2 rounded-lg">Back</Link>
      </div>

      <div className="space-y-5">
        {expenses.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-black">No Pending Expenses</h2>
            <p className="text-gray-500">All expenses are processed.</p>
          </div>
        )}

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
            <p className="mb-4"><strong>Description:</strong> {expense.description}</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => approveExpense(expense.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
              <Link
                href={`/expenses/${expense.id}/comments`}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Comments
              </Link>
              <button
                onClick={() => openRejectModal(expense.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Reject Expense</h2>
            <textarea
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={5}
              required
              className="w-full border border-gray-300 p-4 rounded-lg mb-6 outline-none"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeRejectModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Cancel
              </button>
              <button
                onClick={rejectExpense}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}