"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion, ArrowLeft, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplaintNotFound({ id }) {
  const router = useRouter();
  const [searchId, setSearchId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      router.push(`/complaints/${encodeURIComponent(searchId.trim())}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-16 text-center sm:px-6">
      <div className="border-hairline bg-surface-card shadow-subtle rounded-lg border p-6 sm:p-8">
        <div className="bg-surface-soft border-hairline text-muted-text mx-auto mb-4 flex size-14 items-center justify-center rounded-full border">
          <FileQuestion className="size-7 stroke-[1.5]" />
        </div>

        <h1 className="text-display-xs text-ink font-semibold tracking-tight">
          Complaint not found
        </h1>

        <p className="text-body-sm text-muted-text mx-auto mt-2 max-w-md leading-relaxed">
          We couldn&apos;t find a complaint record matching ID{" "}
          <span className="text-ink bg-surface-soft border-hairline rounded border px-1.5 py-0.5 font-mono font-medium">
            {id || "unknown"}
          </span>
          . Please verify the ID or search again below.
        </p>

        {/* Quick Search */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-5 flex max-w-md gap-2"
        >
          <div className="relative flex-1">
            <Search className="text-muted-text absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search by complaint ID..."
              className="border-hairline bg-surface-soft text-body-sm text-ink placeholder:text-muted-text focus:border-brand-accent focus:ring-brand-accent w-full rounded-md border py-2 pr-3 pl-9 focus:ring-1 focus:outline-none"
            />
          </div>
          <Button type="submit" variant="primary" size="default">
            <span>Search</span>
          </Button>
        </form>

        {/* Navigation CTAs */}
        <div className="border-hairline-soft mt-7 flex flex-col items-center justify-center gap-2.5 border-t pt-5 sm:flex-row">
          <Link href="/complaints">
            <Button
              variant="secondary"
              size="default"
              leftIcon={<ArrowLeft className="size-4" />}
            >
              <span>Back to complaints</span>
            </Button>
          </Link>

          <Link href="/complaints/new">
            <Button
              variant="accent"
              size="default"
              leftIcon={<PlusCircle className="size-4" />}
            >
              <span>File a complaint</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
