"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import {
    addComment,
    getComments,
} from "@/services/commentService";

export default function CommentsPage() {

    const params = useParams();

    const [comments, setComments] =
        useState<any[]>([]);

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        fetchComments();

    }, []);

    const fetchComments = async () => {

        try {

            const data =
                await getComments(
                    params.id as string
                );

            setComments(data);

        } catch {

            toast.error(
                "Failed to load comments"
            );
        }
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!message.trim()) {

            toast.error(
                "Comment required"
            );

            return;
        }

        try {

            setLoading(true);

            await addComment(
                params.id as string,
                message
            );

            toast.success(
                "Comment added"
            );

            setMessage("");

            fetchComments();

        } catch {

            toast.error(
                "Failed to add comment"
            );

        } finally {

            setLoading(false);
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
                    hour: "2-digit",
                    minute: "2-digit",
                }
            );
    };

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4 text-black">

            <div className="max-w-3xl mx-auto">

                <div className="bg-white p-6 rounded-2xl shadow mb-6">

                    <h1 className="text-3xl font-bold">

                        Expense Comments

                    </h1>

                </div>

                <div className="space-y-4 mb-8">

                    {comments.length === 0 && (

                        <div className="bg-white p-5 rounded-xl shadow text-center">

                            No comments yet

                        </div>

                    )}

                    {comments.map((comment) => (

                        <div
                            key={comment.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 px-3 py-5 w-full"
                        >

                            <div className="flex justify-between items-center mb-3 px-1">
                                <h2 className="text-sm font-semibold text-gray-700 tracking-wide">

                                    {comment.senderType === "ADMIN"
                                        ? "ADMIN"
                                        : comment.username}

                                </h2>

                                <p className="text-xs text-gray-500 whitespace-nowrap">

                                    {formatDate(comment.createdAt)}

                                </p>

                            </div>

                            <div className="bg-gray-100 rounded-xl px-4 py-3 w-full">

                                <p className="text-[15px] text-gray-800 leading-7 break-words">

                                    {comment.message}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow"
                >

                    <textarea
                        placeholder="Write message..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        rows={1}
                        required
                        className="w-full border border-gray-300 p-4 rounded-xl mb-4 outline-none resize-none"
                    />

                    <button
                        disabled={loading}
                        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
                    >

                        {loading
                            ? "Sending..."
                            : "Send"}

                    </button>

                </form>

            </div>

        </div>
    );
}