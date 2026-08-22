"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import login from "@/app/(action)/login";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      {/* Main */}
      <main className="flex min-h-screen justify-center px-5 py-6 sm:items-center sm:py-12">
        {/* Login Card */}
        <div className="border-hairline bg-surface-1 w-full max-w-120 rounded-3xl border px-5 py-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:px-[25px] sm:py-[27px]">
          {/* Portal Header */}
          <div className="mb-8 flex items-center justify-between pb-5">
            <Link
              href="/"
              aria-label="Vidhyut Portal home"
              className="text-ink focus-visible:outline-fin-orange flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="bg-fin-orange text-on-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <Zap size={19} fill="currentColor" aria-hidden="true" />
              </span>
              <span className="text-[17px] font-bold tracking-[-0.3px]">
                Vidhyut Portal
              </span>
            </Link>
            <Link
              href="/"
              aria-label="Back to home"
              className="border-hairline text-ink hover:bg-surface-2 focus-visible:outline-fin-orange inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </Link>
          </div>

          {/* Title */}
          <h1 className="mb-[6px] text-[30px] leading-[36px] font-bold text-[#080808]">
            Consumer Login
          </h1>

          <p className="mb-[29px] text-[15px] leading-[23px] text-[#666]">
            Enter your meter number and registered phone number to
            <br />
            access your account.
          </p>

          {/* Form */}
          <form action={formAction}>
            {/* Meter Number */}
            <div className="mb-[24px]">
              <label
                htmlFor="meter-number"
                className="mb-[5px] block text-[14px] font-medium text-[#222]"
              >
                Meter Number
              </label>

              <input
                id="meter-number"
                type="text"
                name="meterNumber"
                placeholder="Enter your meter number"
                autoComplete="username"
                required
                className="h-[52px] w-full rounded-[16px] border border-[#d9d7d2] bg-[#f5f3ef] px-[13px] text-[14px] text-black shadow-[0_2px_4px_rgba(0,0,0,0.04)] outline-none placeholder:text-[#777] focus:border-[#ff4308] focus:ring-1 focus:ring-[#ff4308]"
              />

              {state?.errors?.meterNumber?.[0] && (
                <p className="mt-[5px] text-[12px] text-red-500">
                  {state.errors.meterNumber[0]}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-[19px]">
              <label
                htmlFor="phone-number"
                className="mb-[5px] block text-[14px] font-medium text-[#222]"
              >
                Registered Phone Number
              </label>

              <input
                id="phone-number"
                type="tel"
                name="phoneNumber"
                placeholder="10-digit mobile number"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                required
                className="h-[52px] w-full rounded-[16px] border border-[#d9d7d2] bg-[#f5f3ef] px-[13px] text-[14px] text-black shadow-[0_2px_4px_rgba(0,0,0,0.04)] outline-none placeholder:text-[#777] focus:border-[#ff4308] focus:ring-1 focus:ring-[#ff4308]"
              />

              {state?.errors?.phoneNumber?.[0] && (
                <p className="mt-[5px] text-[12px] text-red-500">
                  {state.errors.phoneNumber[0]}
                </p>
              )}
            </div>

            {/* General Error */}
            {state?.message && (
              <p className="mb-[12px] text-[13px] text-red-500">
                {state.message}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={pending}
              className="h-[51px] w-full rounded-[16px] bg-[#ff4308] text-[16px] font-bold text-white shadow-[0_3px_5px_rgba(0,0,0,0.12)] transition duration-200 hover:bg-[#ed3d05] disabled:opacity-70"
            >
              {pending ? "Logging in..." : "Login to Portal"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-[24px] h-[128px] rounded-[16px] border border-[#d9d7d2] bg-[#f5f3ef] px-[17px] py-[16px]">
            <p className="mb-[8px] text-[12px] font-bold tracking-[0.6px] text-[#666]">
              DEMO CREDENTIALS
            </p>

            <div className="grid grid-cols-2 gap-y-[7px] text-[12px] text-[#666]">
              <div>Meter: 1234567890</div>

              <div>Phone: 9876543210</div>

              <div>Meter: 0987654321</div>

              <div>Phone: 9123456789</div>

              <div>Meter: 1122334455</div>

              <div>Phone: 9988776655</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
