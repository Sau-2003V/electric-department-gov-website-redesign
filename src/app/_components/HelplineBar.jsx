import { PhoneCall, Mail, MapPin, Share2 } from "lucide-react";

export default function HelplineBar() {
  return (
    <div className="w-full border-b border-inverse-surface-1 bg-inverse-canvas py-6 text-inverse-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Toll Free */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fin-orange text-on-primary shadow-xs">
              <PhoneCall className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-inverse-ink-muted uppercase">
                Toll Free Helpline
              </p>
              <p className="font-mono text-base font-bold text-inverse-ink">
                1800-419-1912 / 1912
              </p>
            </div>
          </div>

          {/* Official Email */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-inverse-surface-1 text-fin-orange">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-inverse-ink-muted uppercase">
                Official Email
              </p>
              <p className="max-w-[200px] truncate text-xs font-medium text-inverse-ink">
                customercare@vvnl.in
              </p>
            </div>
          </div>

          {/* Registered Office */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-inverse-surface-1 text-fin-orange">
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-inverse-ink-muted uppercase">
                Registered Office
              </p>
              <p className="text-xs font-medium text-inverse-ink">
                Vidyut Bhawan, Lucknow - 226001
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-inverse-surface-1 text-fin-orange">
              <Share2 className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-inverse-ink-muted uppercase">
                Social Media
              </p>
              <p className="text-xs font-medium text-inverse-ink">
                @vvnl_official updates & alerts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
