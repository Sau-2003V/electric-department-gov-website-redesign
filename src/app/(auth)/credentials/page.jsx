"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Hash, Phone } from "lucide-react";
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
      <div className="border-hairline bg-canvas shadow-subtle w-full max-w-3xl rounded-2xl border p-6 sm:p-8">
        {/* Header */}
        <div className="border-hairline-soft mb-6 flex items-center justify-between border-b pb-5">
          <Link
            href="/"
            aria-label="Vidhyut Portal home"
            className="text-ink focus-visible:ring-ring flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Image
              src="/image/logo.svg"
              alt="Vidhyut Portal Logo"
              width={36}
              height={36}
              className="size-9 rounded-md object-contain"
            />
            <span className="text-title-sm text-ink font-medium tracking-tight">
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
          <h1 className="text-title-lg text-ink font-medium tracking-tight">
            Demo Credentials
          </h1>
          <p className="text-body-sm text-muted-text leading-relaxed">
            Click any sample account below to auto-fill the login form
            instantly.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {DEMO_CREDENTIALS.map((cred, idx) => (
            <button
              key={`${cred.meter}-${idx}`}
              type="button"
              onClick={() => handleSelect(cred.meter, cred.phone)}
              className="group border-hairline bg-surface-soft hover:bg-canvas hover:border-ink/30 hover:shadow-subtle flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left transition-all active:scale-[0.99] sm:p-4"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-caption text-muted-text flex items-center gap-1">
                    <Hash className="text-muted-soft size-3" />
                    Meter:
                  </span>
                  <span className="text-body-sm text-code text-ink font-medium">
                    {cred.meter}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-caption text-muted-text flex items-center gap-1">
                    <Phone className="text-muted-soft size-3" />
                    Phone:
                  </span>
                  <span className="text-body-sm text-ink font-medium">
                    {cred.phone}
                  </span>
                </div>
              </div>

              <div className="shrink-0 pl-2">
                <span className="border-hairline bg-canvas text-ink shadow-subtle group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary text-caption inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium transition-all">
                  <span>Use</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="border-hairline-soft mt-6 border-t pt-4 text-center">
          <Link
            href="/login"
            className="text-muted-text hover:text-ink text-body-sm underline underline-offset-4 transition-colors"
          >
            Enter custom credentials manually
          </Link>
        </div>
      </div>
    </div>
  );
}
