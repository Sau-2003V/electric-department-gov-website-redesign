import React from "react";

export default function Boxes({ sections }) {
  const items = sections || [
    {
      title: "Bill generation and payment",
      description: (
        <ul>
          <li>NEFTS/RTGS Forms</li>
          <li>Bill Payments (Urban)</li>
          <li>Multi-Story Recharge (Radius)</li>
          <li>Multi-Story Recharge (Capital)</li>
        </ul>
      ),
      href: "#",
    },
    {
      title: "Connection Services",
      description: (
        <ul>
          <li>Apply for New Electricity Connection (Jhatpat)</li>
          <li>Ready Reckoner for Line Charges Beyond 40 meter</li>
          <li>Apply for New Electricity Connection for Private Tube Well</li>
          <li>Change in Ownership Through Property Registration</li>
          <li>Commercial, Industrial and Institutional Connections</li>
        </ul>
      ),
      href: "#",
    },
    {
      title: "Service Requests",
      description: (
        <ul>
          <li>Bill Correction Requests</li>
          <li>Name Correction Requests</li>
          <li>Address Correction Requests</li>
          <li>Mobile Number And E-mail Updation</li>
          <li>Load Change Requests</li>
        </ul>
      ),
      href: "#",
    },
    {
      title: "Service Requests",
      description: (
        <ul>
          <li>Bill Correction Requests</li>
          <li>Name Correction Requests</li>
          <li>Address Correction Requests</li>
          <li>Mobile Number And E-mail Updation</li>
          <li>Load Change Requests</li>
        </ul>
      ),
      href: "#",
    },
    {
      title: "Service Requests",
      description: (
        <ul>
          <li>Bill Correction Requests</li>
          <li>Name Correction Requests</li>
          <li>Address Correction Requests</li>
          <li>Mobile Number And E-mail Updation</li>
          <li>Load Change Requests</li>
        </ul>
      ),
      href: "#",
    },
    {
      title: "Service Requests",
      description: (
        <ul>
          <li>Bill Correction Requests</li>
          <li>Name Correction Requests</li>
          <li>Address Correction Requests</li>
          <li>Mobile Number And E-mail Updation</li>
          <li>Load Change Requests</li>
        </ul>
      ),
      href: "#",
    },
    {
      title: "Service Requests",
      description: (
        <ul>
          <li>Bill Correction Requests</li>
          <li>Name Correction Requests</li>
          <li>Address Correction Requests</li>
          <li>Mobile Number And E-mail Updation</li>
          <li>Load Change Requests</li>
        </ul>
      ),
      href: "#",
    },
  ];

  return (
    <section className="bg-canvas py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h1>Self Service</h1>
        <h2 className="mb-3 text-2xl">Consumer Corner</h2>
        <hr className="mb-3" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <article
              key={idx}
              className="border-hairline bg-surface-1 flex h-full flex-col rounded-xl border p-6 shadow-xs"
            >
              <h3 className="text-card-title text-ink mb-2 font-semibold">
                {it.title}
              </h3>
              <p className="text-body text-ink-muted mb-4">{it.description}</p>

              <div className="mt-auto pt-2">
                <a
                  href={it.href}
                  className="text-fin-orange inline-flex items-center text-sm font-medium hover:underline"
                >
                  Learn more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
