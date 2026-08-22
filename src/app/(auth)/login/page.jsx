"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Hash,
  Phone,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import login from "@/app/(action)/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);
  const [meterNumber, setMeterNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fillCredentials = (meter, phone) => {
    setMeterNumber(meter);
    setPhoneNumber(phone);
  };

  return (
    <div className="bg-canvas text-ink flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Login Card */}
      <div className="border-hairline bg-surface-1 w-full max-w-[460px] rounded-2xl border p-6 shadow-xs sm:p-8">
        {/* Portal Header */}
        <div className="border-hairline-soft mb-6 flex items-center justify-between pb-5">
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
            <Link href="/">Back to home</Link>
          </Button>
        </div>

        {/* Title */}
        <div className="mb-6 space-y-1.5">
          <h1 className="text-headline text-ink font-semibold tracking-tight">
            Consumer Login
          </h1>
          <p className="text-body-sm text-ink-muted leading-relaxed">
            Enter your meter number and registered phone number to access your
            account.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4">
          {/* Meter Number */}
          <Input
            id="meter-number"
            type="text"
            name="meterNumber"
            label="Meter Number"
            placeholder="Enter 10-digit meter number"
            autoComplete="username"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            required
            leadingIcon={Hash}
            variant="canvas"
            size="default"
            shape="md"
            error={state?.errors?.meterNumber?.[0]}
          />

          {/* Phone Number */}
          <Input
            id="phone-number"
            type="tel"
            name="phoneNumber"
            label="Registered Phone Number"
            placeholder="10-digit mobile number"
            maxLength={10}
            inputMode="numeric"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            leadingIcon={Phone}
            variant="canvas"
            size="default"
            shape="md"
            error={state?.errors?.phoneNumber?.[0]}
          />

          {/* General Error Alert */}
          {state?.message && (
            <div className="border-semantic-error/20 bg-semantic-error/10 text-semantic-error flex items-center gap-2 rounded-lg border p-3 text-xs font-medium">
              <AlertCircle className="size-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Login Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="accent"
              size="default"
              shape="md"
              loading={pending}
              className="w-full text-base font-semibold"
            >
              {pending ? "Logging in..." : "Login to Portal"}
            </Button>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="border-hairline bg-canvas mt-6 rounded-xl border p-4">
          <div className="text-ink-subtle mb-2.5 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
            <KeyRound className="size-3.5" />
            <span>Demo Credentials (Click to fill)</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {[
              { meter: "1234567890", phone: "9876543210" },
              { meter: "0987654321", phone: "9123456789" },
              { meter: "1122334455", phone: "9988776655" },
            ].map((cred, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => fillCredentials(cred.meter, cred.phone)}
                className="border-hairline-soft bg-surface-1 text-ink-muted hover:text-ink hover:border-hairline hover:bg-surface-2/60 flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left transition-all"
                title="Click to auto-fill"
              >
                <span className="font-mono text-xs">
                  <span className="text-ink-subtle">Meter: </span>
                  <strong className="text-ink font-medium">{cred.meter}</strong>
                </span>
                <span className="font-mono text-xs">
                  <span className="text-ink-subtle">Phone: </span>
                  <strong className="text-ink font-medium">{cred.phone}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
