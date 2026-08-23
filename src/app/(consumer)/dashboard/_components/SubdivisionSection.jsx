import { MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

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
  className,
}) {
  return (
    <section
      aria-label="Subdivision Contacts"
      className={cn(
        "mb-lg sm:mb-xl bg-surface-1 overflow-hidden rounded-2xl",
        className
      )}
    >
      {/* Subdivision Header */}
      <div className="gap-sm border-hairline-soft p-md sm:px-lg sm:py-md flex flex-col items-start justify-between border-b sm:flex-row sm:items-center">
        <div>
          <div className="gap-xs flex items-center">
            <MapPin
              className="text-fin-orange size-4"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <p className="text-eyebrow text-ink-subtle font-medium uppercase">
              Your Subdivision
            </p>
          </div>
          <p className="mt-xxs text-body-sm text-ink font-medium">{location}</p>
        </div>

        <a
          href={`tel:${helpline}`}
          className="gap-xs border-fin-orange/20 bg-fin-orange/10 px-md py-xs text-body-sm text-fin-orange hover:bg-fin-orange/20 inline-flex items-center self-start rounded-full border font-medium transition-colors active:scale-[0.98] sm:self-auto"
        >
          <Phone className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
          <span>Helpline {helpline}</span>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="gap-xs p-sm sm:gap-sm sm:p-md grid grid-cols-1 sm:grid-cols-2">
        {contacts.map((contact) => (
          <div
            key={contact.phone}
            className="gap-sm border-hairline-soft bg-surface-1 p-sm hover:bg-surface-2/40 flex items-center justify-between rounded-xl border transition-colors"
          >
            {/* Avatar initial */}
            <div className="bg-surface-2 text-caption text-ink flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-medium">
              {contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-body-sm text-ink truncate font-medium">
                {contact.name}
              </p>
              <p className="mt-xxs text-caption text-ink-muted truncate">
                {contact.role}
              </p>
            </div>

            <a
              href={`tel:${contact.phone}`}
              aria-label={`Call ${contact.name}`}
              className="bg-fin-orange shadow-surface-1 hover:bg-fin-orange/90 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-all active:scale-95"
            >
              <Phone
                className="size-3.5"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
