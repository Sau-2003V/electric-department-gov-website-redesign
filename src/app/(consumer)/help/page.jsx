"use client";

import { ChevronDown, Mail, MessageSquare, Phone } from "lucide-react";

import { useState } from "react";

const faqs = [
  "How soon will my complaint be resolved?",
  "What is a safety-critical complaint?",
  "Can I track a complaint without signing in?",
  "How do I dispute a bill?",
  "How do I apply for a new connection?",
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-[calc(100vh-61px)] bg-[#f5f2ec]">
      {/* Top signed-in bar */}
      <div className="h-[29px] border-b border-[#d9d6d0] bg-[#f8f6f1] px-[calc((100%-800px)/2)]">
        <p className="text-[12px] leading-[29px] text-[#777]">
          Signed in as{" "}
          <span className="font-semibold text-[#333]">Ramesh Kumar</span> ·
          Meter 1234567890
        </p>
      </div>

      {/* Main Content */}
      <main className="mx-auto w-[800px] pt-[32px] pb-[30px]">
        {/* Heading */}
        <div className="mb-[30px]">
          <p className="mb-[4px] text-[13px] font-bold tracking-[0.5px] text-[#ff4b16]">
            SUPPORT
          </p>

          <h1 className="text-[30px] leading-[36px] font-bold tracking-[-0.7px] text-[#111]">
            Help & emergency
          </h1>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-[13px]">
          {/* 1912 */}
          <div className="h-[126px] rounded-[17px] border border-[#d9d6d0] bg-white px-[21px] py-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Phone
              size={22}
              strokeWidth={1.8}
              className="mb-[14px] text-[#f4511e]"
            />

            <p className="text-[19px] font-bold text-[#171717]">1912</p>

            <p className="mt-[2px] text-[14px] text-[#777]">24×7 helpline</p>
          </div>

          {/* Toll Free */}
          <div className="h-[126px] rounded-[17px] border border-[#d9d6d0] bg-white px-[21px] py-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Phone
              size={22}
              strokeWidth={1.8}
              className="mb-[14px] text-[#f4511e]"
            />

            <p className="text-[19px] font-bold text-[#171717]">
              1800-180-0440
            </p>

            <p className="mt-[2px] text-[14px] text-[#777]">Toll free</p>
          </div>

          {/* Email */}
          <div className="h-[126px] rounded-[17px] border border-[#d9d6d0] bg-white px-[21px] py-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Mail
              size={22}
              strokeWidth={1.8}
              className="mb-[14px] text-[#f4511e]"
            />

            <p className="text-[19px] font-bold text-[#171717]">
              care@vvnl.gov.in
            </p>

            <p className="mt-[2px] text-[14px] text-[#777]">Email</p>
          </div>

          {/* WhatsApp */}
          <div className="h-[126px] rounded-[17px] border border-[#d9d6d0] bg-white px-[21px] py-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <MessageSquare
              size={22}
              strokeWidth={1.8}
              className="mb-[14px] text-[#f4511e]"
            />

            <p className="text-[19px] font-bold text-[#171717]">Coming soon</p>

            <p className="mt-[2px] text-[14px] text-[#777]">WhatsApp bot</p>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-[34px] rounded-[17px] border border-[#d9d6d0] bg-white px-[25px] py-[25px]">
          <h2 className="mb-[12px] text-[15px] font-bold tracking-[0.5px] text-[#222]">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div>
            {faqs.map((question, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={question}
                  className={`border-b border-[#ddd9d3] ${
                    index === faqs.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex min-h-[55px] w-full items-center justify-between text-left text-[14px] font-medium text-[#222]"
                  >
                    <span>{question}</span>

                    <ChevronDown
                      size={16}
                      strokeWidth={1.7}
                      className={`shrink-0 text-[#666] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pr-[30px] pb-[14px] text-[13px] leading-[20px] text-[#777]">
                      Please contact our consumer support team on 1912 for
                      assistance with this request.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <p className="mt-[32px] text-[13px] text-[#777]">
          IVR, WhatsApp and SMS complaint intake are planned channels and are
          not yet active in this portal.
        </p>
      </main>
    </div>
  );
}
