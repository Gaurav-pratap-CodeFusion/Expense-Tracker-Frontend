"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  useEffect(() => {

    router.push("/login");

  }, []);

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">

      Loading...

    </div>
  );
}