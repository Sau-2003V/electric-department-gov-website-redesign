"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const staffCredentials = [
  { id: 1, name: "Rajesh Kumar", phone: "9876543210", role: "agent" },
  { id: 2, name: "Amit Singh", phone: "9876543211", role: "engineer" },
  { id: 3, name: "Vikash Sharma", phone: "9876543212", role: "supervisor" },
  { id: 4, name: "Suresh Verma", phone: "9876543213", role: "agent" },
  { id: 5, name: "Manoj Yadav", phone: "9876543214", role: "engineer" },
  { id: 6, name: "Ankit Mishra", phone: "9876543215", role: "supervisor" },
  { id: 7, name: "Rohit Gupta", phone: "9876543216", role: "agent" },
  { id: 8, name: "Deepak Singh", phone: "9876543217", role: "engineer" },
  { id: 9, name: "Pankaj Tiwari", phone: "9876543218", role: "supervisor" },
  { id: 10, name: "Neeraj Kumar", phone: "9876543219", role: "agent" },
  { id: 11, name: "Sunil Sharma", phone: "9876543220", role: "engineer" },
  { id: 12, name: "Karan Patel", phone: "9876543221", role: "supervisor" },
  { id: 13, name: "Alok Singh", phone: "9876543222", role: "agent" },
  { id: 14, name: "Ramesh Yadav", phone: "9876543223", role: "engineer" },
  { id: 15, name: "Sanjay Verma", phone: "9876543224", role: "supervisor" },
  { id: 16, name: "Prakash Gupta", phone: "9876543225", role: "agent" },
  { id: 17, name: "Ajay Mishra", phone: "9876543226", role: "engineer" },
  { id: 18, name: "Mahesh Kumar", phone: "9876543227", role: "supervisor" },
  { id: 19, name: "Nitin Sharma", phone: "9876543228", role: "agent" },
  { id: 20, name: "Arun Singh", phone: "9876543229", role: "engineer" },
  { id: 21, name: "Kapil Verma", phone: "9876543230", role: "supervisor" },
  { id: 22, name: "Ravi Yadav", phone: "9876543231", role: "agent" },
  { id: 23, name: "Shivendra Gupta", phone: "9876543232", role: "engineer" },
  { id: 24, name: "Harish Kumar", phone: "9876543233", role: "supervisor" },
  { id: 25, name: "Gaurav Singh", phone: "9876543234", role: "agent" },
  { id: 26, name: "Vinod Sharma", phone: "9876543235", role: "engineer" },
  { id: 27, name: "Ashok Verma", phone: "9876543236", role: "supervisor" },
  { id: 28, name: "Suraj Yadav", phone: "9876543237", role: "agent" },
  { id: 29, name: "Jitendra Mishra", phone: "9876543238", role: "engineer" },
  { id: 30, name: "Narendra Kumar", phone: "9876543239", role: "supervisor" },
];

export default function StaffCredentialsPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-5xl">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {staffCredentials.map((staff) => (
              <div
                key={staff.id}
                className="border-hairline bg-surface-card hover:bg-surface-soft rounded-xl border p-4 transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Staff Info */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="border-hairline bg-canvas text-ink flex size-10 shrink-0 items-center justify-center rounded-lg border">
                      <UserRound className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-body-sm text-ink truncate font-medium">
                        {staff.name}
                      </p>

                      <div className="text-caption text-muted-text mt-1 flex items-center gap-1.5">
                        <Phone className="size-3" />
                        <span>{staff.phone}</span>
                      </div>

                      <p className="text-caption text-muted-text mt-1">
                        Role: {staff.role}
                      </p>
                    </div>
                  </div>

                  {/* Use Button */}
                  <Button
                    asChild
                    variant="ghost"
                    size="compact"
                    shape="md"
                  >
                    <Link href={`/staff/login?phone=${staff.phone}`}>
                      Use
                      <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
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
