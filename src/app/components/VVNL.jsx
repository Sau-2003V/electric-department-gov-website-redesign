import { ChevronRight } from "lucide-react";

const stats = [
  { value: "1.42 Cr", label: "CONSUMERS SERVED", ghost: "1.42", dark: false },
  { value: "21", label: "DISTRICTS COVERED", ghost: "21", dark: false },
  { value: "1,860", label: "SUB-STATIONS ACTIVE", ghost: "1.8k", dark: false },
  { value: "1912", label: "TOLL FREE HELPLINE", ghost: "1912", dark: true },
];

function StatCard({ value, label, ghost, dark }) {
  return (
    <div
      className={`h-50px relative flex min-w-0 flex-col justify-evenly overflow-hidden rounded-2xl p-6 ${
        dark ? "bg-neutral-900" : "bg-white"
      }`}
    >
      <span
        className={`absolute-bottom-3 pointer-events-none right-3 text-6xl font-extrabold select-none ${
          dark ? "text-white/5" : "text-neutral-900/5"
        }`}
      >
        {ghost}
      </span>

      <p className="relative text-2xl font-extrabold text-orange-500">
        {value}
      </p>

      <div className="relative min-w-0">
        <p
          className={`text-10px wrap-break max-w-full leading-tight font-medium tracking-wide sm:text-xs ${
            dark ? "text-neutral-300" : "text-neutral-500"
          }`}
        >
          {label
            .split(" ")
            .slice(0, Math.ceil(label.split(" ").length / 2))
            .join(" ")}
          <br />
          {label
            .split(" ")
            .slice(Math.ceil(label.split(" ").length / 2))
            .join(" ")}
        </p>
        {dark && <span className="mt-2 block h-0.5 w-8 bg-orange-500" />}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="w-full bg-[#F4F1EA] px-10 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left column */}
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium tracking-wide text-orange-600">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            OFFICIAL PORTAL
          </span>

          <h1 className="mb-4 text-5xl leading-tight font-extrabold text-neutral-900">
            Welcome to VVNL
          </h1>

          <span className="mb-6 block h-1 w-16 bg-orange-500" />

          <p className="mb-8 text-base leading-relaxed text-neutral-500">
            Vidhyut Vitran Nigam Limited is a company incorporated under the
            Companies Act, carrying out the business of distribution of
            electricity within its licensed area of supply. The Nigam supplies
            power to urban and rural consumers across twenty-one districts with
            a steadfast commitment to consumer satisfaction.
          </p>
        </div>

        {/* Right column: stat cards */}
        <div className="grid min-w-0 grid-cols-2 gap-5">
          <div className="mt-0 flex min-w-0 flex-col gap-5">
            <StatCard {...stats[0]} />
            <StatCard {...stats[2]} />
          </div>
          <div className="mt-10 flex min-w-0 flex-col gap-5">
            <StatCard {...stats[1]} />
            <StatCard {...stats[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
