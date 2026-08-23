import {
  UserRound,
  LayoutDashboard,
  FileText,
  Clock,
  CreditCard,
  HelpCircle,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Sign Up / Login",
      description: "Create your account or log in with your meter number.",
      icon: <UserRound size={28} className="text-[#ef5b28]" />,
    },
    {
      title: "Dashboard Access",
      description:
        "View your meter details, bills, and shortcuts in one place.",
      icon: <LayoutDashboard size={28} className="text-[#ef5b28]" />,
    },
    {
      title: "Raise Complaint",
      description:
        "Submit a complaint if you face issues like power cut or wrong bill.",
      icon: <FileText size={28} className="text-[#ef5b28]" />,
    },
    {
      title: "Track Status",
      description:
        "Check the progress of your complaint and see when it will be fixed.",
      icon: <Clock size={28} className="text-[#ef5b28]" />,
    },
    {
      title: "Make Payment",
      description: "Pay your bills online safely using Razorpay.",
      icon: <CreditCard size={28} className="text-[#ef5b28]" />,
    },
    {
      title: "Get Support",
      description: "Read FAQs or contact our support team for help.",
      icon: <HelpCircle size={28} className="text-[#ef5b28]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#171717]">
      <section className="mx-auto max-w-[1315px] px-5 pt-10 pb-14">
        <div className="mb-8 text-center">
          <p className="mb-1 text-[13px] font-bold tracking-[0.3px] text-[#ef5b28] uppercase">
            How It Works
          </p>
          <h1 className="text-[32px] leading-[1.2] font-bold tracking-[-0.8px] text-[#111]">
            A Simple Flow
          </h1>
          <p className="mx-auto mt-2 max-w-[650px] text-[15px] leading-6 text-[#686868]">
            Managing electricity services is now easy. Just follow these simple
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col rounded-[19px] border border-[#ddd9d2] bg-gradient-to-br from-[#fffdfa] to-[#f9f7f3] p-6 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#ef5b28] font-bold text-white">
                  {index + 1}
                </div>
                {step.icon}
              </div>
              <h2 className="text-[18px] font-semibold text-[#171717]">
                {step.title}
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-[#626262]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/help"
            className="inline-block rounded-[10px] bg-[#171717] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#ef5b28]"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
