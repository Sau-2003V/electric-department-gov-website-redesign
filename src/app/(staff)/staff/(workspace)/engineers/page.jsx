export const metadata = {
  title: "Engineer Roster · Staff Workspace · Vidhyut Portal",
  description:
    "Roster and active duty status of field technicians, line engineers, and maintenance crews by zone.",
};

const engineers = [
  {
    name: "Ritika Nair",
    title: "Senior Field Engineer",
    zone: "North Sector",
    status: "Active",
  },
  {
    name: "Vikram Singh",
    title: "Maintenance Lead",
    zone: "Central District",
    status: "On call",
  },
  {
    name: "Aditi Rao",
    title: "Grid Technician",
    zone: "Industrial Park",
    status: "Dispatching",
  },
  {
    name: "Karan Shah",
    title: "Safety Officer",
    zone: "South Belt",
    status: "Reviewing",
  },
];

export default function EngineersPage() {
  return (
    <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
            Field teams
          </p>
          <h3 className="text-title-md text-ink mt-1 font-medium">
            Engineer roster
          </h3>
        </div>
        <button
          type="button"
          className="border-hairline bg-canvas text-body-sm text-body rounded-md border px-3 py-1.5 font-medium"
        >
          Add engineer
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {engineers.map((engineer) => (
          <div
            key={engineer.name}
            className="border-hairline bg-canvas rounded-lg border p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-ink font-medium">{engineer.name}</p>
                <p className="text-body-sm text-muted">{engineer.title}</p>
              </div>
              <span className="bg-success/10 text-success rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase">
                {engineer.status}
              </span>
            </div>
            <p className="text-body-sm text-body mt-3">Zone: {engineer.zone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
