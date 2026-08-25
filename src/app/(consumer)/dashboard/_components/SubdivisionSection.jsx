import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        "overflow-hidden rounded-lg border border-hairline bg-surface-card shadow-subtle",
        className
      )}
    >
      {/* Subdivision Header */}
      <div className="border-b border-hairline-soft p-4 sm:px-6 sm:py-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-1.5">
            <MapPin
              className="text-primary size-4"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <p className="text-caption font-semibold uppercase tracking-wider text-muted-text">
              Your Subdivision
            </p>
          </div>
          <p className="mt-0.5 text-body-sm font-medium text-ink">{location}</p>
        </div>

        <a href={`tel:${helpline}`} className="self-start sm:self-auto">
          <Button type="button" variant="accent-subtle" size="sm">
            <Phone className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
            <span>Helpline {helpline}</span>
          </Button>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6">
        {contacts.map((contact) => (
          <div
            key={contact.phone}
            className="flex items-center justify-between gap-3 rounded-lg border border-hairline-soft bg-canvas p-3 transition-colors hover:bg-surface-soft"
          >
            {/* Avatar initial */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-soft text-caption font-semibold text-ink border border-hairline-soft">
              {contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-medium text-ink truncate">
                {contact.name}
              </p>
              <p className="mt-0.5 text-caption text-muted-text truncate">
                {contact.role}
              </p>
            </div>

            <a
              href={`tel:${contact.phone}`}
              aria-label={`Call ${contact.name}`}
              className="shrink-0"
            >
              <Button
                type="button"
                variant="secondary"
                size="icon-compact"
                aria-label={`Call ${contact.name}`}
              >
                <Phone
                  className="size-3.5"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
