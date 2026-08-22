"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Vidhyut Portal
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button className="text-gray-700 hover:text-gray-900 focus:outline-none"></button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="border-t border-gray-100 md:hidden">
        <div className="space-y-1 px-4 pt-2 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block rounded-md px-2 py-2 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <button className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
