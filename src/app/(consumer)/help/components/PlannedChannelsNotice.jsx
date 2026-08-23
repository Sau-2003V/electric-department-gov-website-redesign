import { Info } from "lucide-react";

export default function PlannedChannelsNotice() {
  return (
    <aside
      aria-label="Planned intake channels"
      className="bg-surface-2/70 border-hairline text-ink-muted flex items-start gap-3 rounded-lg border p-4"
    >
      <Info
        className="text-ink-muted mt-0.5 size-4 shrink-0"
        strokeWidth={1.8}
      />
      <p className="text-body-sm text-ink-muted leading-relaxed">
        <strong className="text-ink font-medium">
          Digital Roadmap Notice:
        </strong>{" "}
        Automated IVR phone intake, official WhatsApp grievance bot, and direct
        SMS complaint logging are planned integration phases and will be enabled
        soon for all district circles.
      </p>
    </aside>
  );
}
