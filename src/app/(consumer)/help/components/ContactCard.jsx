"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  PhoneCall,
  Phone,
  Mail,
  MessageSquare,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ICON_MAP = {
  PhoneCall,
  Phone,
  Mail,
  MessageSquare,
};

export default function ContactCard({ channel }) {
  const [copied, setCopied] = useState(false);
  const Icon = ICON_MAP[channel.icon] || Phone;

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!channel.copyValue) return;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(channel.copyValue);
      setCopied(true);
      toast.success(`${channel.copyValue} copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-surface-1 border-hairline hover:border-ink/20 flex flex-col justify-between rounded-xl border p-5 shadow-xs transition-all duration-150">
      <div>
        {/* Top bar: Icon + Badge */}
        <div className="flex items-center justify-between gap-2">
          <div
            className={`flex size-10 items-center justify-center rounded-lg ${
              channel.isEmergency
                ? "bg-fin-orange/10 text-fin-orange"
                : "bg-surface-2 text-ink"
            }`}
          >
            <Icon className="size-5" strokeWidth={1.8} />
          </div>

          <Badge
            variant={channel.badgeVariant || "secondary"}
            size="sm"
            shape="sm"
          >
            {channel.badge}
          </Badge>
        </div>

        {/* Title & Label */}
        <div className="mt-4">
          <p className="text-card-title text-ink font-medium tracking-tight">
            {channel.title}
          </p>
          <p className="text-body-sm text-ink-muted mt-0.5 font-medium">
            {channel.label}
          </p>
        </div>

        {/* Description */}
        <p className="text-body-sm text-ink-subtle mt-2 line-clamp-2 leading-relaxed">
          {channel.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="border-hairline-soft mt-5 flex items-center gap-2 border-t pt-2">
        {channel.href ? (
          <a
            href={channel.href}
            className="inline-flex flex-1"
            aria-label={`${channel.actionLabel} for ${channel.title}`}
          >
            <Button
              variant={channel.isEmergency ? "accent" : "secondary"}
              shape="md"
              className="w-full justify-center transition-transform duration-150 active:scale-[0.96]"
              rightIcon={<ArrowUpRight className="size-3.5" />}
            >
              <span>{channel.actionLabel}</span>
            </Button>
          </a>
        ) : (
          <Button
            variant="tertiary"
            size="sm"
            shape="md"
            disabled
            className="w-full justify-center opacity-60"
          >
            <span>{channel.actionLabel}</span>
          </Button>
        )}

        {channel.copyValue && (
          <Button
            variant="outline"
            size="icon"
            shape="md"
            onClick={handleCopy}
            title={`Copy ${channel.copyValue}`}
            aria-label={`Copy ${channel.copyValue}`}
            className="text-ink-muted hover:text-ink shrink-0 transition-transform duration-150 active:scale-[0.96]"
          >
            {copied ? (
              <Check className="text-semantic-success size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
