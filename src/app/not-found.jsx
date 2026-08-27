"use client";
import React from "react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 dark:bg-black">
      {/* Big Glassy Card */}
      <div className="w-full max-w-2xl rounded-2xl border border-black/20 bg-white/30 p-12 text-center shadow-xl backdrop-blur-lg dark:border-white/20 dark:bg-white/5">
        {/* 404 Heading */}
        <h1 className="mb-6 text-9xl font-extrabold text-black dark:text-white">
          404
        </h1>

        {/* Message */}
        <h2 className="mb-3 text-3xl font-semibold">Oops! Page not found</h2>
        <p className="mb-10 text-gray-700 dark:text-gray-400">
          The page you are looking for might have been removed, had its URL
          changed, or may be temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-8 py-4 font-medium text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Go to Homepage
          </Link>
          <Link
            href="/support"
            className="rounded-lg bg-gray-200 px-8 py-4 font-medium text-black transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
