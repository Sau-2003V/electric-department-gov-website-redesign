"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, KeyRound, Zap } from "lucide-react";
import { DEMO_CREDENTIALS } from "@/constants/credentials";
import { Button } from "@/components/ui/button";

export default function CredentialsPage() {
  const router = useRouter();

  const handleSelect = (meter, phone) => {
    router.push(
      `/login?meter=${encodeURIComponent(meter)}&phone=${encodeURIComponent(phone)}`
    );
  };

  return (
    <div className="bg-canvas text-ink flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Card */}
      <div className="border-hairline bg-surface-1 w-full max-w-4xl rounded-2xl border p-6 shadow-xs sm:p-8">
        {/* Header */}
        <div className="border-hairline-soft mb-6 flex items-center justify-between border-b pb-5">
          <Link
            href="/"
            aria-label="Vidhyut Portal home"
            className="text-ink focus-visible:ring-fin-orange flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span className="bg-fin-orange text-on-primary flex size-9 items-center justify-center rounded-xl shadow-2xs">
              <Zap size={18} fill="currentColor" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold tracking-tight">
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
            <Link href="/login">Back to login</Link>
          </Button>
        </div>

        {/* Title */}
        <div className="mb-6 space-y-1">
          <div className="text-ink-subtle mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
            <KeyRound className="size-3.5" />
            <span>Test Accounts</span>
          </div>
          <h1 className="text-headline text-ink font-semibold tracking-tight">
            Demo Credentials
          </h1>
          <p className="text-body-sm text-ink-muted">
            Click any account below to auto-fill the login form.
          </p>
        </div>

        {/* Credentials Grid - Full Width Responsive Layout */}
        <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
          {DEMO_CREDENTIALS.map((cred, idx) => (
            <button
              key={`${cred.meter}-${idx}`}
              type="button"
              onClick={() => handleSelect(cred.meter, cred.phone)}
              className="group border-hairline-soft bg-canvas hover:bg-surface-2/70 hover:border-hairline flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all active:scale-[0.99]"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="font-mono text-xs">
                  <span className="text-ink-subtle">Meter: </span>
                  <strong className="text-ink font-semibold">
                    {cred.meter}
                  </strong>
                </div>
                <div className="font-mono text-xs">
                  <span className="text-ink-subtle">Phone: </span>
                  <strong className="text-ink font-semibold">
                    {cred.phone}
                  </strong>
                </div>
              </div>

              <div className="text-ink-muted group-hover:text-fin-orange flex shrink-0 items-center gap-1.5 pl-2 text-xs font-medium transition-colors">
                <span>Use</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="border-hairline-soft mt-6 border-t pt-4 text-center">
          <Link
            href="/login"
            className="text-ink-muted hover:text-ink text-xs underline underline-offset-4"
          >
            Enter custom credentials manually
          </Link>
        </div>
      </div>
    </div>
  );
}
