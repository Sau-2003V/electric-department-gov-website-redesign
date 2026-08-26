"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Phone, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { staffLoginSchema } from "@/types/schema/login";
import login from "@/app/(action)/login";

function StaffLoginForm() {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: {
      phoneNumber: searchParams.get("phone") || "",
    },
  });

  const onSubmit = async (data) => {
    const result = await login(data);

    if (result?.success === false) {
      toast.error(result.message || "Login failed. Please try again.");
    }
    // On success, the server action redirects — no extra handling needed.
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
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      {/* Title */}
      <div className="mb-6 space-y-1">
        <h1 className="text-title-lg text-ink font-medium tracking-tight">
          Staff Login
        </h1>

        <p className="text-body-sm text-muted-text leading-relaxed">
          Enter your registered phone number to access the staff portal.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Phone Number */}
        <Input
          id="phone-number"
          type="tel"
          label="Phone Number"
          placeholder="10-digit mobile number"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          leadingIcon={Phone}
          variant="canvas"
          size="default"
          shape="md"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber", {
            onChange: (e) => {
              // Strip non-digits on the fly
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
            },
          })}
        />

        {/* Login Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="default"
            shape="md"
            className="w-full"
            loading={isSubmitting}
          >
            Login to Staff Portal
          </Button>
        </div>
      </form>

      {/* Demo Credentials */}
      <Link
        href="/staff/credentials"
        className="group border-hairline bg-surface-card hover:bg-surface-soft hover:border-hairline focus-visible:ring-ring mt-6 flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="border-hairline bg-canvas text-ink shadow-subtle flex size-9 shrink-0 items-center justify-center rounded-lg border">
            <KeyRound className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-title-sm text-ink font-medium">
              Use Demo Credentials
            </p>

            <p className="text-caption text-muted-text leading-tight">
              Select a sample staff account to test and log in instantly
            </p>
          </div>
        </div>

        <div className="border-hairline bg-canvas text-ink shadow-subtle group-hover:border-ink/30 text-caption flex shrink-0 items-center gap-1 rounded-md border px-2.5 py-1 font-medium transition-colors">
          <span>Use</span>
          <ArrowRight className="size-3" />
        </div>
      </Link>
    </div>
  );
}

export default function StaffLogin() {
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
              Loading staff login...
            </p>
          </div>
        }
      >
        <StaffLoginForm />
      </Suspense>
    </div>
  );
}
