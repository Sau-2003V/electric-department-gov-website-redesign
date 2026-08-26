"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, HardHat, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const staffCredentials = [
  { phone: "9222000048", role: "engineer" },
  { phone: "9222000050", role: "engineer" },
  { phone: "9222000044", role: "engineer" },
  { phone: "9222000043", role: "engineer" },
  { phone: "9111000025", role: "supervisor" },
  { phone: "9111000027", role: "supervisor" },
  { phone: "9222000049", role: "engineer" },
  { phone: "9111000022", role: "supervisor" },
  { phone: "9111000021", role: "supervisor" },
  { phone: "9111000029", role: "supervisor" },
  { phone: "9111000028", role: "supervisor" },
  { phone: "9111000024", role: "supervisor" },
  { phone: "9222000047", role: "engineer" },
  { phone: "9222000046", role: "engineer" },
  { phone: "9111000023", role: "supervisor" },
  { phone: "9111000026", role: "supervisor" },
  { phone: "9222000042", role: "engineer" },
  { phone: "9222000041", role: "engineer" },
  { phone: "9111000030", role: "supervisor" },
  { phone: "9222000045", role: "engineer" },
];

export default function StaffCredentialsPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="border-hairline bg-canvas shadow-subtle rounded-2xl border p-6 sm:p-8">
          {/* Portal Header */}
          <div className="border-hairline-soft mb-6 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              aria-label="Vidhyut Portal home"
              className="text-ink flex items-center gap-2.5"
            >
              <Image
                src="/image/logo.svg"
                alt="Vidhyut Portal Logo"
                width={36}
                height={36}
                className="size-9 rounded-md object-contain"
              />

              <span className="text-title-sm font-medium tracking-tight">
                Vidhyut Portal
              </span>
            </Link>

            <Button
              asChild
              variant="ghost"
              size="compact"
              shape="md"
              leadingIcon={ArrowLeft}
            >
              <Link href="/staff/login">Back to Staff Login</Link>
            </Button>
          </div>

          {/* Page Heading */}
          <div className="mb-7">
            <h1 className="text-title-lg text-ink font-medium tracking-tight">
              Staff Demo Credentials
            </h1>

            <p className="text-body-sm text-muted-text mt-1 leading-relaxed">
              Select any sample staff account to continue with the login.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {staffCredentials.map((staff, index) => (
              <Link
                key={index}
                href={`/staff/login?phone=${staff.phone}`}
                className="border-hairline bg-surface-card hover:bg-surface-soft focus-visible:ring-ring flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-all focus-visible:ring-2 focus-visible:outline-none"
              >
                {/* Staff Info */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="border-hairline bg-canvas text-ink flex size-9 shrink-0 items-center justify-center rounded-lg border">
                    {staff.role === "engineer" ? (
                      <HardHat className="size-4" />
                    ) : (
                      <ShieldCheck className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-body-sm text-ink truncate font-medium">
                      {staff.phone}
                    </p>

                    <p className="text-caption text-muted-text mt-1 capitalize">
                      {staff.role}
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-muted-text size-4 shrink-0" />
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="border-hairline-soft mt-6 border-t pt-5">
            <p className="text-caption text-muted-text text-center">
              These credentials are for demonstration and testing purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
