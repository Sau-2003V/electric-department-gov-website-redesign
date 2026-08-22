"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Register Complaint", href: "/about" },
  { label: "Track complaints", href: "/services" },
  { label: "Outages", href: "/contact" },
  { label: "Help", href: "/contact" }
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto ml-1 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex shrink-0">
             <Link href="/" className="flex">
      <img
        src="image/logo_transparent.png"
        alt="Company Logo"
        width={400}           
        height={100}                     
      />
    </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:space-x-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-lg px-4 py-2 font-medium text-black transition-colors">
              Sign Up
            </Link>
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
          <Link href="/login" className="mt-2 inline-block w-full rounded-lg px-4 py-2 font-medium text-white text-center">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
