"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Hash,
  Phone,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import login from "@/app/(action)/login";
import { loginSchema } from "@/app/types/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm({
  initialMeter = "",
  initialPhone = "",
  nextUrl = "/dashboard",
}) {
  const [serverError, setServerError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      meterNumber: initialMeter,
      phoneNumber: initialPhone,
    },
  });

  const onSubmit = async (values) => {
    setServerError("");
    const res = await login({ ...values, next: nextUrl });
    if (res && !res.success) {
      if (res.errors) {
        Object.entries(res.errors).forEach(([field, messages]) => {
          form.setError(field, { message: messages[0] });
        });
      }
      if (res.message) {
        setServerError(res.message);
      }
    }
  };

  return (
    <div className="border-hairline bg-surface-1 w-full max-w-[460px] rounded-2xl border p-6 shadow-xs sm:p-8">
      {/* Portal Header */}
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* Meter Number */}
        <Controller
          name="meterNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="meter-number"
              type="text"
              label="Meter Number"
              placeholder="Enter meter number"
              autoComplete="username"
              leadingIcon={Hash}
              variant="canvas"
              size="default"
              shape="md"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="phone-number"
              type="tel"
              label="Registered Phone Number"
              placeholder="10-digit mobile number"
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              leadingIcon={Phone}
              variant="canvas"
              size="default"
              shape="md"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* General Error Alert */}
        {serverError && (
          <div className="border-semantic-error/20 bg-semantic-error/10 text-semantic-error flex items-center gap-2 rounded-lg border p-3 text-xs font-medium">
            <AlertCircle className="size-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Login Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            size="default"
            shape="md"
            loading={form.formState.isSubmitting}
            className="w-full text-base font-semibold"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login to Portal"}
          </Button>
        </div>
      </form>

      {/* Demo Credentials Link Card */}
      <Link
        href="/credentials"
        className="group border-hairline bg-surface-2/40 hover:bg-surface-2/80 hover:border-hairline focus-visible:ring-fin-orange mt-6 flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="border-hairline bg-surface-1 text-fin-orange flex size-9 shrink-0 items-center justify-center rounded-lg border shadow-2xs transition-transform group-hover:scale-105">
            <KeyRound className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-ink group-hover:text-fin-orange text-xs font-semibold transition-colors">
              Use Demo Credentials
            </p>
            <p className="text-ink-muted text-[11px] leading-tight">
              Select a sample account to test and log in instantly
            </p>
          </div>
        </div>

        <div className="border-hairline bg-surface-1 text-ink group-hover:border-ink/20 flex shrink-0 items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium shadow-2xs transition-all">
          <span>Use</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </div>
  );
}

function LoginFormContainer() {
  const searchParams = useSearchParams();
  const meter = searchParams.get("meter") || "";
  const phone = searchParams.get("phone") || "";
  const next = searchParams.get("next") || "/dashboard";

  return (
    <LoginForm
      key={`${meter}-${phone}-${next}`}
      initialMeter={meter}
      initialPhone={phone}
      nextUrl={next}
    />
  );
}

export default function LoginPage() {
  return (
    <div className="bg-canvas text-ink flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8">
      <Suspense
        fallback={
          <div className="border-hairline bg-surface-1 w-full max-w-[460px] rounded-2xl border p-8 text-center shadow-xs">
            <div className="bg-fin-orange text-on-primary mx-auto mb-4 flex size-10 items-center justify-center rounded-xl">
              <Zap size={20} />
            </div>
            <p className="text-ink-muted text-sm">Loading login portal...</p>
          </div>
        }
      >
        <LoginFormContainer />
      </Suspense>
    </div>
  );
}
