import {
  Mail,
  MapPin,
  UserRound,
  Globe,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Engineering Team · Vidhyut Electricity Portal",
  description:
    "Meet the engineering and product team responsible for building and maintaining the Vidhyut electricity grievance and consumer service portal.",
};

const teamMembers = [
  {
    name: "Shivansh Tiwari",
    role: "Full Stack Developer",
    badgeVariant: "accent-subtle",
    avatarBg: "bg-brand-accent/15 text-brand-accent",
    description:
      "Leads full-stack architecture, Next.js App Router orchestration, Supabase backend integration, database schema modeling, and core component engineering.",
    email: "shivans0018@gmail.com",
    github: "https://github.com/shivans-16",
    linkedIn: "https://www.linkedin.com/in/shivansh-tiwari-a329a3364/",
    portfolio: "https://shivansh-portfolio-w.netlify.app/",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    name: "Aditya Kumar",
    role: "Backend & Systems Developer",
    badgeVariant: "badge-orange",
    avatarBg: "bg-badge-orange/20 text-[#c2410c] dark:text-badge-orange",
    description:
      "Specializes in scalable backend services, database migrations, server actions, REST APIs, and automated complaint triage workflows.",
    email: "aditya@adibitz.com",
    github: "https://github.com/adibitz/",
    linkedIn: "https://www.linkedin.com/in/aaditya-kumar-anand",
    portfolio: "https://adibitz.com",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    name: "Saurabh Vishwakarma",
    role: "Frontend & UI/UX Developer",
    badgeVariant: "success-subtle",
    avatarBg: "bg-success/15 text-emerald-700 dark:text-emerald-400",
    description:
      "Focuses on responsive design execution, accessibility (WCAG AA), motion design, and high-performance citizen-facing portal interfaces.",
    email: "saurabhsir1680@gmail.com",
    github: "https://github.com/Sau-2003V",
    portfolio: "https://svraptorX.com",
    location: "Lucknow, Uttar Pradesh",
  },
];

const portalStack = [
  {
    name: "Next.js 16 (App Router)",
    role: "Framework",
    desc: "React Server Components, server actions, and Turbopack.",
    icon: Code2,
  },
  {
    name: "Tailwind CSS v4",
    role: "Styling Engine",
    desc: "Design token system with strict dark/light mode parity.",
    icon: Layers,
  },
  {
    name: "Supabase & PostgreSQL",
    role: "Database & Auth",
    desc: "Row Level Security (RLS) and real-time grievance tracking.",
    icon: Database,
  },
  {
    name: "TanStack React Query v5",
    role: "State Management",
    desc: "Client-side query caching, optimistic UI, and mutations.",
    icon: Cpu,
  },
];

export default function TeamsPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="border-hairline bg-surface-card/60 relative overflow-hidden border-b py-12 md:py-16">
        <div className="background-size:[24px_24px] pointer-events-none absolute inset-0 bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] opacity-60" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Badge
            variant="accent-subtle"
            size="pill"
            className="mx-auto mb-4 gap-1.5"
          >
            <span>Digital Infrastructure &amp; Innovation</span>
          </Badge>

          <h1 className="text-display-md sm:text-display-lg lg:text-display-xl text-ink font-medium tracking-tight">
            Meet the engineering team
          </h1>

          <p className="text-body-md text-muted-text mx-auto mt-4 max-w-2xl leading-relaxed">
            The software engineers, architects, and designers building modern,
            accessible, and high-reliability public utility services for the
            state electricity portal.
          </p>
        </div>
      </section>

      {/* 2. TEAM MEMBERS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-caption text-muted-text font-medium tracking-wider uppercase">
              Core Contributors
            </span>
            <h2 className="text-display-md text-ink mt-1 font-medium tracking-tight">
              Engineering members
            </h2>
          </div>
          <Badge variant="secondary" size="sm" shape="pill">
            3 Active Maintainers
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="border-hairline bg-surface-card hover:bg-canvas shadow-subtle hover:shadow-card flex flex-col justify-between rounded-2xl border p-6 transition-all duration-150 sm:p-8"
            >
              <div>
                {/* Avatar & Header */}
                <div className="flex items-center gap-4">
                  <div
                    className={`border-hairline flex size-14 shrink-0 items-center justify-center rounded-full border ${member.avatarBg}`}
                  >
                    <UserRound className="size-7" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-title-md text-ink font-medium">
                      {member.name}
                    </h3>
                    <div className="mt-1">
                      <Badge
                        variant={member.badgeVariant}
                        size="sm"
                        shape="pill"
                      >
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Bio Description */}
                <p className="text-body-sm text-muted-text mt-6 leading-relaxed">
                  {member.description}
                </p>

                {/* Divider */}
                <div className="border-hairline-soft my-6 border-t" />

                {/* Contact & Social Links List */}
                <div className="text-body-sm space-y-3">
                  {/* Email */}
                  <div className="text-muted-text flex items-center gap-3">
                    <Mail className="text-brand-accent size-4 shrink-0" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-ink hover:text-brand-accent truncate transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>

                  {/* GitHub */}
                  <div className="text-muted-text flex items-center gap-3">
                    <svg
                      className="text-ink size-4 shrink-0 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-brand-accent inline-flex items-center gap-1 truncate transition-colors"
                    >
                      <span className="truncate">
                        {member.github.replace("https://", "")}
                      </span>
                      <ExternalLink className="size-3 shrink-0 opacity-60" />
                    </a>
                  </div>

                  {/* LinkedIn */}
                  <div className="text-muted-text flex items-center gap-3">
                    <svg
                      className="text-brand-accent size-4 shrink-0 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-brand-accent inline-flex items-center gap-1 truncate transition-colors"
                    >
                      <span className="truncate">LinkedIn Profile</span>
                      <ExternalLink className="size-3 shrink-0 opacity-60" />
                    </a>
                  </div>

                  {/* Portfolio */}
                  <div className="text-muted-text flex items-center gap-3">
                    <Globe className="text-success size-4 shrink-0" />
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-brand-accent inline-flex items-center gap-1 truncate transition-colors"
                    >
                      <span className="truncate">
                        {member.portfolio.replace("https://", "")}
                      </span>
                      <ExternalLink className="size-3 shrink-0 opacity-60" />
                    </a>
                  </div>

                  {/* Location */}
                  <div className="text-muted-text flex items-center gap-3">
                    <MapPin className="text-muted-soft size-4 shrink-0" />
                    <span className="text-muted-text truncate">
                      {member.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-hairline-soft mt-8 border-t pt-4">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex w-full"
                >
                  <Button
                    variant="primary"
                    size="default"
                    className="w-full justify-center"
                    leftIcon={<Mail className="size-4" />}
                  >
                    <span>Contact {member.name.split(" ")[0]}</span>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TECHNOLOGY STACK & ARCHITECTURE SECTION */}
      <section className="border-hairline bg-surface-soft border-t py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge variant="secondary" size="pill">
              Architecture &amp; Stack
            </Badge>
            <h2 className="text-display-md text-ink mt-2 font-medium tracking-tight">
              Modern government tech infrastructure
            </h2>
            <p className="text-body-sm text-muted-text mt-2">
              Engineered for high availability, zero latency bottlenecks, strict
              accessibility compliance, and enterprise-grade data security.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {portalStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="border-hairline bg-canvas shadow-subtle flex flex-col justify-between rounded-xl border p-6"
                >
                  <div>
                    <div className="border-hairline bg-surface-soft text-ink mb-4 flex size-10 items-center justify-center rounded-lg border">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-caption text-brand-accent block font-medium tracking-wider uppercase">
                      {tech.role}
                    </span>
                    <h3 className="text-title-sm text-ink mt-1 font-medium">
                      {tech.name}
                    </h3>
                    <p className="text-body-sm text-muted-text mt-2 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
