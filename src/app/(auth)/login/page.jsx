"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [meterNumber, setMeterNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meter :", meterNumber, "Phone :", phoneNumber);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-black">

      {/* Navbar */}
      <header className="h-[88px] bg-white border-b border-[#dedbd5] flex items-center justify-between px-[9.3%]">
        <div className="flex items-center gap-3">

          <div className="w-[51px] h-[51px] bg-[#111111] rounded-full flex items-center justify-center">
            <span className="text-white text-[25px] leading-none">ϟ</span>
          </div>

          <div className="leading-tight">
            <p className="text-[12px] text-[#555] mb-[2px]">
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
      <main className="min-h-[calc(100vh-88px)] flex justify-center pt-[100px]">

        {/* Login Card */}
        <div className="w-[468px] h-[589px] bg-white rounded-[16px] border border-[#d9d6d0] shadow-[0_12px_30px_rgba(0,0,0,0.08)] px-[25px] py-[27px]">

          {/* Portal Heading */}
          <div className="flex items-center gap-[9px] mb-[10px]">
            <span className="w-[33px] h-[7px] bg-[#ff4308] rounded-full"></span>

            <span className="text-[#f4511e] text-[13px] font-bold tracking-[0.4px]">
              CONSUMER PORTAL
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[30px] leading-[36px] font-bold text-[#080808] mb-[6px]">
            Consumer Login
          </h1>

          <p className="text-[15px] leading-[23px] text-[#666] mb-[29px]">
            Enter your meter number and registered phone number to
            <br />
            access your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Meter Number */}
            <div className="mb-[24px]">
              <label className="block text-[14px] font-medium text-[#222] mb-[5px]">
                Meter Number :
              </label>

              <input
                type="text"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                placeholder="Enter your meter number"
                className="w-full h-[52px] bg-[#f5f3ef] border border-[#d9d7d2] rounded-[16px] px-[13px] text-[14px] text-black placeholder:text-[#777] outline-none shadow-[0_2px_4px_rgba(0,0,0,0.04)] focus:border-[#ff4308] focus:ring-1 focus:ring-[#ff4308]"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-[19px]">
              <label className="block text-[14px] font-medium text-[#222] mb-[5px]">
                Registered Phone Number :
              </label>

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full h-[52px] bg-[#f5f3ef] border border-[#d9d7d2] rounded-[16px] px-[13px] text-[14px] text-black placeholder:text-[#777] outline-none shadow-[0_2px_4px_rgba(0,0,0,0.04)] focus:border-[#ff4308] focus:ring-1 focus:ring-[#ff4308]"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-[51px] bg-[#ff4308] hover:bg-[#ed3d05] text-white text-[16px] font-bold rounded-[16px] transition duration-200 shadow-[0_3px_5px_rgba(0,0,0,0.12)]"
            >
              Login to Portal
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-[24px] h-[128px] bg-[#f5f3ef] border border-[#d9d7d2] rounded-[16px] px-[17px] py-[16px]">

            <p className="text-[12px] font-bold tracking-[0.6px] text-[#666] mb-[8px]">
              DEMO CREDENTIALS
            </p>

            <div className="grid grid-cols-2 gap-y-[7px] text-[12px] text-[#666]">

              <div>
                Meter: 1234567890
              </div>

              <div>
                Phone: 9876543210
              </div>

              <div>
                Meter: 0987654321
              </div>

              <div>
                Phone: 9123456789
              </div>

              <div>
                Meter: 1122334455
              </div>

              <div>
                Phone: 9988776655
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}