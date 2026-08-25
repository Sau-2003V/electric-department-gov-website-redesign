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
    <section aria-label="Subdivision Contacts" className={cn(className)}>
      {/* Subdivision Header */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:pb-6">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-caption text-muted-text font-medium tracking-wider">
              Your Subdivision
            </p>
          </div>
          <p className="text-title-md text-ink mt-0.5 font-normal">
            {location}
          </p>
        </div>

        <a href={`tel:${helpline}`} className="self-start sm:self-auto">
          <Button type="button" variant="accent-subtle" size="sm">
            <Phone className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
            <span>Helpline {helpline}</span>
          </Button>
        </a>
      </div>

      {/* Contact Cards (Square Boxes in 4 Columns) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {contacts.map((contact) => (
          <div
            key={contact.phone}
            className="bg-canvas flex aspect-square flex-col justify-between rounded-lg border p-4 transition-colors sm:p-5"
          >
            <div>
              {/* Top Row: Avatar & Call Button */}
              <div className="flex items-start justify-between gap-2">
                <div className="bg-surface-soft text-caption text-ink border-hairline-soft mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-medium">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              </div>

              {/* Bottom: Contact Details */}
              <div className="min-w-0">
                <p className="text-body text-ink truncate font-medium">
                  {contact.name}
                </p>
                <p className="text-caption text-muted-text mt-0.5 line-clamp-2 leading-relaxed">
                  {contact.role}
                </p>
                {/* <a
                  href={`tel:${contact.phone}`}
                  className="text-caption text-primary mt-2 inline-flex items-center gap-1.5 font-mono font-medium hover:underline"
                >
                  <Phone
                    className="size-3"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{contact.phone}</span>
                </a> */}
              </div>
            </div>
            <div>
              <a
                href={`tel:${contact.phone}`}
                aria-label={`Call ${contact.name}`}
                className="w-full shrink-0"
              >
                <Button
                  type="button"
                  variant="secondary"
                  aria-label={`Call ${contact.name}`}
                  className="w-full"
                >
                  <Phone
                    className="size-3.5"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {contact.phone}
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
