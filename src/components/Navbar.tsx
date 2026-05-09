"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {

    const router = useRouter();

    const logout = () => {

        localStorage.clear();

        router.push("/login");
    };

    return (

        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-black">

                Expense Tracker

            </h1>

            <button
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button>

        </nav>
    );
}