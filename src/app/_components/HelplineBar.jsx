import { PhoneCall, Mail, MapPin, Share2 } from "lucide-react";

export default function HelplineBar() {
  return (
    <div className="border-inverse-surface-1 bg-inverse-canvas text-inverse-ink w-full border-b py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Toll Free */}
          <div className="flex items-center gap-3">
            <div className="bg-fin-orange text-on-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs">
              <PhoneCall className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-inverse-ink-muted text-[10px] font-semibold tracking-widest uppercase">
                Toll Free Helpline
              </p>
              <p className="text-inverse-ink font-mono text-base font-bold">
                1800-419-1912 / 1912
              </p>
            </div>
          </div>

          {/* Official Email */}
          <div className="flex items-center gap-3">
            <div className="bg-inverse-surface-1 text-fin-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-inverse-ink-muted text-[10px] font-semibold tracking-widest uppercase">
                Official Email
              </p>
              <p className="text-inverse-ink max-w-[200px] truncate text-xs font-medium">
                grievance@vidhyutportal.gov.in
              </p>
            </div>
          </div>

          {/* Registered Office */}
          <div className="flex items-center gap-3">
            <div className="bg-inverse-surface-1 text-fin-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-inverse-ink-muted text-[10px] font-semibold tracking-widest uppercase">
                Registered Office
              </p>
              <p className="text-inverse-ink text-xs font-medium">
                Vidyut Bhawan, Lucknow - 226001
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            <div className="bg-inverse-surface-1 text-fin-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Share2 className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-inverse-ink-muted text-[10px] font-semibold tracking-widest uppercase">
                Official Updates
              </p>
              <p className="text-inverse-ink text-xs font-medium">
                @vidhyutportal grievance desk
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
