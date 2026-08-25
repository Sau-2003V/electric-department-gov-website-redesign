"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
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
    <div className="border-hairline bg-canvas shadow-subtle w-full max-w-md rounded-2xl border p-6 sm:p-8">
      {/* Portal Header */}
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
          <span className="text-title-sm text-ink font-semibold tracking-tight">
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
      <div className="mb-6 space-y-1">
        <h1 className="text-title-lg text-ink font-semibold tracking-tight">
          Consumer Login
        </h1>
        <p className="text-body-sm text-muted-text leading-relaxed">
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
          <div className="border-error/20 bg-error/10 text-error text-body-sm flex items-center gap-2.5 rounded-lg border p-3 font-medium">
            <AlertCircle className="size-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Login Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="default"
            shape="md"
            loading={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login to Portal"}
          </Button>
        </div>
      </form>

      {/* Demo Credentials Link Card */}
      <Link
        href="/credentials"
        className="group border-hairline bg-surface-card hover:bg-surface-soft hover:border-hairline focus-visible:ring-ring mt-6 flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="border-hairline bg-canvas text-ink shadow-subtle flex size-9 shrink-0 items-center justify-center rounded-lg border">
            <KeyRound className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-title-sm text-ink font-semibold">
              Use Demo Credentials
            </p>
            <p className="text-caption text-muted-text leading-tight">
              Select a sample account to test and log in instantly
            </p>
          </div>
        </div>

        <div className="border-hairline bg-canvas text-ink shadow-subtle group-hover:border-ink/30 text-caption flex shrink-0 items-center gap-1 rounded-md border px-2.5 py-1 font-medium transition-colors">
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
          <div className="border-hairline bg-canvas shadow-subtle w-full max-w-md rounded-2xl border p-8 text-center">
            <Image
              src="/image/logo.svg"
              alt="Vidhyut Portal Logo"
              width={40}
              height={40}
              className="mx-auto mb-4 size-10 object-contain"
            />
            <p className="text-muted-text text-body-sm">
              Loading login portal...
            </p>
          </div>
        }
      >
        <LoginFormContainer />
      </Suspense>
    </div>
  );
}
