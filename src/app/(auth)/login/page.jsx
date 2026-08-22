"use client";

import { useActionState } from "react";
import Link from "next/link";
import login from "@/app/(action)/login";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-black">
      {/* Navbar */}
      <header className="flex h-[88px] items-center justify-between border-b border-[#dedbd5] bg-white px-[9.3%]">
        <div className="flex items-center gap-3">
          <div className="flex h-[51px] w-[51px] items-center justify-center rounded-full bg-[#111111]">
            <span className="text-[25px] leading-none text-white">ϟ</span>
          </div>

          <div className="leading-tight">
            <p className="mb-[2px] text-[12px] text-[#555]">
              विद्युत वितरण निगम लिमिटेड
            </p>

            <p className="text-[16px] font-bold text-[#111]">
              Vidhyut Vitran Nigam Limited
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] text-[#222] hover:text-black"
        >
          <span className="text-[21px] leading-none">←</span>
          <span>Back to home</span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-88px)] justify-center pt-[100px]">
        {/* Login Card */}
        <div className="h-[589px] w-[468px] rounded-[16px] border border-[#d9d6d0] bg-white px-[25px] py-[27px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          {/* Portal Heading */}
          <div className="mb-[10px] flex items-center gap-[9px]">
            <span className="h-[7px] w-[33px] rounded-full bg-[#ff4308]"></span>

            <span className="text-[13px] font-bold tracking-[0.4px] text-[#f4511e]">
              CONSUMER PORTAL
            </span>
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
              <label className="mb-[5px] block text-[14px] font-medium text-[#222]">
                Meter Number :
              </label>

              <input
                type="text"
                name="meterNumber"
                placeholder="Enter your meter number"
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
              <label className="mb-[5px] block text-[14px] font-medium text-[#222]">
                Registered Phone Number :
              </label>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="10-digit mobile number"
                maxLength={10}
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
