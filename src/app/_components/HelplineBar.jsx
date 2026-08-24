import { PhoneCall, Mail, MapPin, Share2 } from "lucide-react";

export default function HelplineBar() {
  return (
    <div className="border-surface-dark-elevated bg-surface-dark text-on-dark w-full border-b py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Toll Free */}
          <div className="flex items-center gap-3">
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <PhoneCall className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Toll Free Helpline
              </p>
              <p className="text-on-dark text-title-sm font-mono font-semibold">
                1800-419-1912 / 1912
              </p>
            </div>
          </div>

          {/* Official Email */}
          <div className="flex items-center gap-3">
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Official Email
              </p>
              <p className="text-on-dark text-body-sm max-w-[200px] truncate font-normal">
                grievance@vidhyutportal.gov.in
              </p>
            </div>
          </div>

          {/* Registered Office */}
          <div className="flex items-center gap-3">
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Registered Office
              </p>
              <p className="text-on-dark text-body-sm font-normal">
                Vidyut Bhawan, Lucknow - 226001
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <Share2 className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Official Updates
              </p>
              <p className="text-on-dark text-body-sm font-normal">
                @vidhyutportal grievance desk
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
