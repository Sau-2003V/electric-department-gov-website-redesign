"use client";

import { Mail, MapPin, UserRound, GitBranch, Globe } from "lucide-react";

const teamMembers = [
  {
    name: "Shivansh Tiwari",
    role: "Full Stack Developer",
    description:
      "Works on the portal frontend, backend APIs, creating model schema using PostgreSQL, database integration, and overall application development.",
    email: "shivans0018@gmail.com",
    github: "https://github.com/shivans-16",
    linkedIn: "https://www.linkedin.com/in/shivansh-tiwari-a329a3364/",
    portfolio: "https://shivansh-portfolio-w.netlify.app/",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    name: "Aditya Kumar",
    role: "Backend Developer",
    description:
      "Handles backend services, database management, API development, and complaint management workflows.",
    email: "aditya@adibitz.com",
    github: "https://github.com/adibitz/",
    linkedIn: "https://www.linkedin.com/in/aaditya-kumar-anand",
    portfolio: "https://adibitz.com",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    name: "Saurabh Vishwakarma",
    role: "Frontend Developer",
    description:
      "Focuses on responsive UI development, user experience, and building clean portal components.",
    email: "saurabh.temp@gmail.com",
    github: "https://github.com/saurabh-vishwakarma",
    linkedIn: "https://www.linkedin.com/in/saurabh-vishwakarma",
    portfolio: "https://svraptorX.com",
    location: "Lucknow, Uttar Pradesh",
  },
];

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#171717]">
      <section className="mx-auto max-w-[1315px] px-5 pb-14 pt-10">
        <div className="mb-8">
          <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.3px] text-[#ef5b28]">
            Our Team
          </p>
          <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.8px] text-[#111]">
            Meet the team
          </h1>
          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#686868]">
            The people working together to build and maintain the electricity service portal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}

function TeamCard({ member }) {
  return (
    <div className="flex min-h-[420px] flex-col rounded-[19px] border border-[#ddd9d2] bg-[#fffdfa] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-4">
        <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#171717] text-white">
          <UserRound size={27} strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-[17px] font-semibold text-[#171717]">{member.name}</h2>
          <p className="mt-1 text-[13px] font-medium text-[#ef5b28]">{member.role}</p>
        </div>
      </div>

      <p className="mt-6 min-h-[72px] text-[14px] leading-6 text-[#626262]">{member.description}</p>

      <div className="my-5 border-t border-[#e3dfd8]" />

      <div className="space-y-4">
        <ContactItem icon={<Mail size={17} strokeWidth={1.8} className="text-[#ef5b28]" />} text={member.email} />
        <ContactItem icon={<GitBranch size={17} strokeWidth={1.8} className="text-[#171717]" />} text={member.github} link />
        <ContactItem icon={<Globe size={17} strokeWidth={1.8} className="text-[#0077b5]" />} text={member.linkedIn} link />
        <ContactItem icon={<Globe size={17} strokeWidth={1.8} className="text-[#ef5b28]" />} text={member.portfolio} link />
        <ContactItem icon={<MapPin size={17} strokeWidth={1.8} className="text-[#ef5b28]" />} text={member.location} />
      </div>

      <div className="mt-auto pt-6">
        <a
          href={`mailto:${member.email}`}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#ef5b28]"
        >
          <Mail size={15} />
          Contact member
        </a>
      </div>
    </div>
  );
}

function ContactItem({ icon, text, link }) {
  return (
    <div className="flex items-center gap-3 text-[13px] text-[#5f5f5f] truncate">
      {icon}
      {link ? (
        <a href={text} target="_blank" rel="noopener noreferrer" className="truncate hover:text-[#ef5b28]">
          {text}
        </a>
      ) : (
        <span className="truncate">{text}</span>
      )}
    </div>
  );
}
