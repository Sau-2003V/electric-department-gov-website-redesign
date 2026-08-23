"use client";

import {
  UserRound,
  LayoutDashboard,
  FileText,
  Clock,
  MessageSquare,
  CheckCircle,
  Star,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Sign Up / Login",
      icon: UserRound,
      heading: "Create your account",
      description:
        "Start by creating your account using your registered meter number and phone number. If you already have an account, simply login with your existing details.",
      secondDescription:
        "Your account gives you secure access to the electricity complaint portal and allows you to manage all your complaints from one place.",
    },
    {
      title: "Dashboard Access",
      icon: LayoutDashboard,
      heading: "Access your dashboard",
      description:
        "After successful login, you will be redirected to your personal dashboard. Here you can view your account information, active complaints, previous complaints and their current status.",
      secondDescription:
        "The dashboard provides a simple overview so you can easily manage and track all your electricity-related requests.",
    },
    {
      title: "Raise Complaint",
      icon: FileText,
      heading: "Raise a new complaint",
      description:
        "If you are facing an electricity-related issue, you can raise a complaint directly from your dashboard. Select the appropriate complaint category and provide the required details.",
      secondDescription:
        "You can describe the issue clearly and submit your complaint to the concerned electricity department for further action.",
    },
    {
      title: "Track Status",
      icon: Clock,
      heading: "Track your complaint",
      description:
        "Once your complaint has been submitted, you can track its progress from your dashboard. The complaint status will be updated as the department works on your request.",
      secondDescription:
        "This helps you stay informed about whether your complaint is pending, being processed or has been resolved.",
    },
    {
      title: "Response Updates",
      icon: MessageSquare,
      heading: "Receive response updates",
      description:
        "You will receive updates whenever there is progress on your complaint. The department can provide responses, additional information or updates related to the issue.",
      secondDescription:
        "All important communication remains available through the portal so that you can easily follow the progress of your complaint.",
    },
    {
      title: "Resolution Confirmation",
      icon: CheckCircle,
      heading: "Confirm the resolution",
      description:
        "Once the electricity department resolves your complaint, the status will be updated accordingly. You can review the resolution details from your dashboard.",
      secondDescription:
        "If the issue has been successfully resolved, you can confirm the resolution and complete the complaint process.",
    },
    {
      title: "Rate & Feedback",
      icon: Star,
      heading: "Rate our service",
      description:
        "After your complaint has been resolved, you can rate the service and share your feedback. Your feedback helps us understand your experience.",
      secondDescription:
        "We use your suggestions and ratings to improve the complaint handling process and provide better services in the future.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#171717]">
      {/* Header */}
      <section className="mx-auto max-w-[1200px] px-5 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-[38px] md:text-[46px] font-semibold leading-tight tracking-[-1.5px] text-[#292929]">
            How it Works?
          </h1>

          <div className="mx-auto mt-4 h-[2px] w-[145px] bg-[#ef5b28]" />

          <p className="mx-auto mt-8 max-w-[700px] text-[14px] leading-6 text-[#777]">
            Managing electricity complaints and responses is now easy.
            Follow these simple steps to raise, track and resolve your
            electricity-related complaints.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-[1100px] px-5 pb-20">
        <div className="space-y-16 md:space-y-20">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="grid grid-cols-1 gap-8 md:grid-cols-[330px_1fr] md:gap-12"
              >
                {/* Left Side */}
                <div className="flex flex-col items-center text-center md:items-start md:text-center">
                  <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#eeeeee]">
                    <Icon
                      size={28}
                      strokeWidth={1.8}
                      className="text-[#292929]"
                    />
                  </div>

                  <h3 className="mt-5 text-[20px] font-semibold text-[#303030]">
                    {step.title}
                  </h3>

                  <div className="mt-4 h-[2px] w-[88px] bg-[#ef5b28]" />

                  <div className="mt-5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#ef5b28] text-[14px] font-semibold text-white">
                    {index + 1}
                  </div>
                </div>

                {/* Right Side */}
                <div className="md:pt-3">
                  <h2 className="text-[22px] font-semibold text-[#171717]">
                    {step.heading}
                  </h2>

                  <p className="mt-6 text-[14px] leading-[1.9] text-[#777]">
                    {step.description}
                  </p>

                  <p className="mt-5 text-[14px] leading-[1.9] text-[#777]">
                    {step.secondDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/login"
            className="rounded-full bg-[#ef5b28] px-8 py-3 text-[14px] font-semibold text-white transition hover:bg-[#d94d1d]"
          >
            Create Account
          </a>

          <a
            href="/help"
            className="rounded-full border border-[#333] px-8 py-3 text-[14px] font-medium text-[#333] transition hover:border-[#ef5b28] hover:text-[#ef5b28]"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171717] px-5 py-10 text-white">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-[16px] font-semibold">
              Electricity Complaint Portal
            </h3>

            <p className="text-[14px] leading-6 text-[#bdbdbd]">
              Helping you manage complaints, track responses and stay
              connected with the electricity department.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[16px] font-semibold">Quick Links</h3>

            <ul className="space-y-2 text-[14px] text-[#bdbdbd]">
              <li>
                <a
                  href="/dashboard"
                  className="transition hover:text-[#ef5b28]"
                >
                  Dashboard
                </a>
              </li>

              <li>
                <a
                  href="/complaints"
                  className="transition hover:text-[#ef5b28]"
                >
                  Raise Complaint
                </a>
              </li>

              <li>
                <a
                  href="/help"
                  className="transition hover:text-[#ef5b28]"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[16px] font-semibold">Contact Us</h3>

            <p className="text-[14px] text-[#bdbdbd]">
              📞 Helpline:{" "}
              <a
                href="tel:1800123456"
                className="hover:text-[#ef5b28]"
              >
                1800-123-456
              </a>
            </p>

            <p className="mt-2 text-[14px] text-[#bdbdbd]">
              ✉️ support@electricityportal.com
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1100px] border-t border-[#333] pt-6 text-center text-[13px] text-[#888]">
          © {new Date().getFullYear()} Electricity Complaint Portal. All
          rights reserved.
        </div>
      </footer>
    </main>
  );
}