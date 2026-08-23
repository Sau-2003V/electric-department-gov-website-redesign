import { MapPin, Phone } from "lucide-react";

const DEFAULT_CONTACTS = [
  {
    name: "Anita Sharma",
    role: "Call centre agent · Lucknow Central",
    phone: "9000000001",
  },
  {
    name: "Vikas Yadav",
    role: "Field engineer · Lucknow Central",
    phone: "9000000002",
  },
  {
    name: "Rajeev Mishra",
    role: "Supervisor · Lucknow Central",
    phone: "9000000003",
  },
  {
    name: "Priya Nair",
    role: "Administrator · Head Office",
    phone: "9000000004",
  },
];

export default function SubdivisionSection({
  location = "Lucknow Central · Lucknow · PIN 226001, 226010",
  helpline = "1912",
  contacts = DEFAULT_CONTACTS,
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-[#e0dbd3] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] sm:mb-8">
      {/* Subdivision Header */}
      <div className="flex flex-col items-start justify-between gap-3 border-b border-[#eae7e2] p-4 sm:flex-row sm:items-center sm:px-5 sm:py-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#ff5600]" strokeWidth={2.5} />
            <p className="text-[11px] font-bold tracking-[0.6px] text-[#888] uppercase">
              Your Subdivision
            </p>
          </div>
          <p className="mt-1 text-[13px] font-medium text-[#333]">{location}</p>
        </div>

        <a
          href={`tel:${helpline}`}
          className="flex h-9 items-center gap-2 self-start rounded-full border border-[#fed7aa] bg-[#fff7ed] px-4 text-[13px] font-semibold text-[#ea580c] transition-all duration-150 hover:bg-[#ffedd5] hover:shadow-sm active:scale-[0.97] sm:self-auto"
        >
          <Phone size={13} strokeWidth={2.5} />
          Helpline {helpline}
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4">
        {contacts.map((contact) => (
          <div
            key={contact.phone}
            className="flex items-center justify-between gap-3 rounded-xl border border-[#eae7e2] bg-[#fdfcfb] p-3 transition-colors duration-100 hover:bg-[#faf7f4] sm:p-3.5"
          >
            {/* Avatar initial */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0ede8] text-[13px] font-bold text-[#555]">
              {contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#111]">
                {contact.name}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-[#999]">
                {contact.role}
              </p>
            </div>

            <a
              href={`tel:${contact.phone}`}
              aria-label={`Call ${contact.name}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff5600] text-white shadow-[0_2px_6px_rgba(255,86,0,0.25)] transition-all duration-150 hover:bg-[#e64d00] hover:shadow-[0_3px_8px_rgba(255,86,0,0.3)] active:scale-[0.96]"
            >
              <Phone size={13} strokeWidth={2.5} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
