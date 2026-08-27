export const metadata = {
  title: "Service Communications & Notices · Staff Workspace · Vidhyut Portal",
  description:
    "Draft, schedule, and broadcast public notices, planned shutdown schedules, and safety advisories.",
};

const notices = [
  {
    title: "Planned outage in Sector 7",
    detail:
      "Power interruption expected between 12:30 PM and 2:00 PM for feeder maintenance.",
    tag: "Planned",
  },
  {
    title: "Safety reminder",
    detail:
      "Avoid contact with damaged electrical poles and report them immediately.",
    tag: "Safety",
  },
  {
    title: "Consumer advisory",
    detail:
      "Bill payment window remains open for all residential properties in East Ward.",
    tag: "Notice",
  },
];

export default function NoticesPage() {
  return (
    <div className="space-y-6">
      <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
              Public notices
            </p>
            <h3 className="text-title-md text-ink mt-1 font-medium">
              Service communications
            </h3>
          </div>
          <button
            type="button"
            className="border-hairline bg-canvas text-body-sm text-body rounded-md border px-3 py-1.5 font-medium"
          >
            New notice
          </button>
        </div>

        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.title}
              className="border-hairline bg-canvas rounded-lg border p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-ink font-medium">{notice.title}</p>
                <span className="bg-surface-soft text-body-sm text-muted rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase">
                  {notice.tag}
                </span>
              </div>
              <p className="text-body-sm text-body mt-2 leading-6">
                {notice.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
