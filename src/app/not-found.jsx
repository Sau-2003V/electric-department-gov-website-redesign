"use client";
import React from "react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-6">
      {/* Big Glassy Card */}
      <div className="w-full max-w-2xl p-12 text-center rounded-2xl shadow-xl
                      backdrop-blur-lg bg-white/30 dark:bg-white/5
                      border border-black/20 dark:border-white/20">
        
        {/* 404 Heading */}
        <h1 className="text-9xl font-extrabold text-black dark:text-white mb-6">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl font-semibold mb-3">Oops! Page not found</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-10">
          The page you are looking for might have been removed, had its URL changed,
          or may be temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all
                       dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Go to Homepage
          </Link>
          <Link
            href="/support"
            className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-4 rounded-lg font-medium transition-all
                       dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
