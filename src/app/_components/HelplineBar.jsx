import Link from "next/link";
import { PhoneCall, Mail, MapPin, Share2 } from "lucide-react";

export default function HelplineBar() {
  return (
    <div className="border-surface-dark-elevated bg-surface-dark text-on-dark w-full border-b py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Toll Free */}
          <Link
            href="/support"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <PhoneCall className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Demo Helpline
              </p>
              <p className="text-on-dark text-title-sm font-mono font-medium">
                1800-123-4567
              </p>
            </div>
          </Link>

          {/* Official Email */}
          <a
            href="mailto:support@vidhyut-demo.local"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Demo Help Desk
              </p>
              <p className="text-on-dark text-body-sm max-w-[200px] truncate font-normal">
                support@vidhyut-demo.local
              </p>
            </div>
          </a>

          {/* Registered Office */}
          <div className="flex items-center gap-3">
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Simulated Office
              </p>
              <p className="text-on-dark text-body-sm font-normal">
                Demo Vidyut Bhawan, Sector 0, Demo City
              </p>
            </div>
          </div>

          {/* Social Media */}
          <Link
            href="/notices"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="border-surface-dark-elevated bg-surface-dark-elevated text-on-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <Share2 className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-on-dark-soft text-caption font-medium tracking-widest uppercase">
                Portal Notices
              </p>
              <p className="text-on-dark text-body-sm font-normal">
                @vidhyutdemo bulletin desk
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
