import Link from "next/link";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Pricing", href: "/pricing" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:gap-16">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Vidhyut Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
