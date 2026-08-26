const summaryCards = [
  {
    label: "Open incidents",
    value: "184",
    delta: "+12%",
    tone: "text-slate-900",
  },
  {
    label: "Resolved today",
    value: "96",
    delta: "+8%",
    tone: "text-emerald-700",
  },
  {
    label: "Critical outages",
    value: "13",
    delta: "-4",
    tone: "text-amber-700",
  },
  { label: "Avg. response", value: "21m", delta: "-6m", tone: "text-sky-700" },
];

const priorityQueue = [
  {
    id: "SR-1042",
    location: "South Gate",
    issue: "Transformer hum and voltage fluctuation",
    priority: "High",
    eta: "18 min",
  },
  {
    id: "SR-1087",
    location: "Baker Lane",
    issue: "Streetlight outage on main junction",
    priority: "Medium",
    eta: "35 min",
  },
  {
    id: "SR-1129",
    location: "Civic Center",
    issue: "Billing discrepancy flagged by residents",
    priority: "Low",
    eta: "1 hr",
  },
  {
    id: "SR-1156",
    location: "West End",
    issue: "Faulty feeder cable and tripping",
    priority: "Critical",
    eta: "10 min",
  },
];

const crewAssignments = [
  {
    crew: "Alpha Crew",
    zone: "North Sector",
    status: "On route",
    time: "08:40",
  },
  {
    crew: "Bravo Crew",
    zone: "River District",
    status: "Inspecting fault",
    time: "08:20",
  },
  {
    crew: "Delta Crew",
    zone: "Industrial Park",
    status: "Repair in progress",
    time: "08:15",
  },
];

const noticeFeed = [
  {
    title: "Load shedding advisory",
    detail: "Scheduled maintenance in Sector 7 from 12:30 PM to 2:00 PM.",
    tag: "Planned",
  },
  {
    title: "Crew dispatch update",
    detail: "Three new teams assigned to the North corridor outage cluster.",
    tag: "Live",
  },
  {
    title: "Meter audit",
    detail:
      "Public notice issued for transformer inspection near the market area.",
    tag: "Compliance",
  },
];

const serviceHealth = [
  { name: "North", value: 84 },
  { name: "Central", value: 92 },
  { name: "East", value: 79 },
  { name: "South", value: 88 },
  { name: "West", value: 75 },
];

const stats = [
  { label: "Backlog", value: "48", trend: "-12%" },
  { label: "Completed", value: "126", trend: "+9%" },
  { label: "Pending review", value: "24", trend: "-3" },
  { label: "Escalations", value: "7", trend: "+2" },
];

const requests = [
  {
    id: "SR-1164",
    issue: "Streetlight outage",
    zone: "North Wing",
    status: "Queued",
  },
  {
    id: "SR-1168",
    issue: "Line fault",
    zone: "Central Market",
    status: "Inspecting",
  },
  {
    id: "SR-1173",
    issue: "Meter issue",
    zone: "Riverside",
    status: "Resolved",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-body-sm text-muted">{card.label}</p>
              <span className={`text-xs font-semibold ${card.tone}`}>
                {card.delta}
              </span>
            </div>
            <p className="text-title-lg text-ink mt-4 font-medium">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
                Priority queue
              </p>
              <h3 className="text-title-md text-ink mt-1 font-medium">
                Live service requests
              </h3>
            </div>
            <button
              type="button"
              className="border-hairline bg-canvas text-body-sm text-body rounded-md border px-3 py-1.5 font-medium"
            >
              View all
            </button>
          </div>

          <div className="border-hairline overflow-x-auto rounded-xl border">
            <table className="min-w-160 text-left text-sm">
              <thead className="bg-surface-soft text-body">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticket</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Issue</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody>
                {priorityQueue.map((item) => (
                  <tr
                    key={item.id}
                    className="border-hairline bg-canvas border-t"
                  >
                    <td className="text-ink px-4 py-3 font-medium">{item.id}</td>
                    <td className="text-body px-4 py-3">{item.location}</td>
                    <td className="text-body px-4 py-3">{item.issue}</td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-1 text-[11px] font-semibold",
                          item.priority === "Critical"
                            ? "bg-error/10 text-error"
                            : item.priority === "High"
                              ? "bg-warning/10 text-warning"
                              : item.priority === "Medium"
                                ? "bg-brand-accent/10 text-brand-accent"
                                : "bg-success/10 text-success",
                        ].join(" ")}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="text-body px-4 py-3">{item.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-5">
            <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
              Service health
            </p>
            <h3 className="text-title-md text-ink mt-1 font-medium">
              Zone status
            </h3>

            <div className="mt-4 space-y-3">
              {serviceHealth.map((zone) => (
                <div key={zone.name}>
                  <div className="text-body mb-1 flex items-center justify-between text-xs">
                    <span>{zone.name}</span>
                    <span>{zone.value}%</span>
                  </div>
                  <div className="bg-surface-soft h-2.5">
                    <div
                      className="bg-primary h-2.5"
                      style={{ width: `${zone.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-5">
            <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
              Quick actions
            </p>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                className="bg-primary text-on-primary flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium"
              >
                Dispatch field crew
                <span>→</span>
              </button>
              <button
                type="button"
                className="border-hairline bg-canvas text-body flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium"
              >
                Publish notice
                <span>→</span>
              </button>
              <button
                type="button"
                className="border-hairline bg-canvas text-body flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium"
              >
                Export report
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
              Daily ops
            </p>
            <h3 className="text-title-md text-ink mt-1 font-medium">
              Current workload
            </h3>
          </div>
          <button
            type="button"
            className="border-hairline bg-canvas text-body-sm text-body rounded-md border px-3 py-1.5 font-medium"
          >
            Refresh
          </button>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-hairline bg-canvas rounded-lg border p-3"
            >
              <p className="text-body-sm text-muted">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="text-title-md text-ink font-medium">
                  {stat.value}
                </span>
                <span className="text-body-sm text-muted">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-hairline overflow-x-auto rounded-xl border">
          <table className="min-w-160 text-left text-sm">
            <thead className="bg-surface-soft text-body">
              <tr>
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Zone</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-hairline bg-canvas border-t"
                >
                  <td className="text-ink px-4 py-3 font-medium">{request.id}</td>
                  <td className="text-body px-4 py-3">{request.issue}</td>
                  <td className="text-body px-4 py-3">{request.zone}</td>
                  <td className="px-4 py-3">
                    <span className="bg-surface-soft text-body-sm text-muted rounded-full px-2 py-1 font-semibold">
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-5">
          <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
            Crew activity
          </p>
          <h3 className="text-title-md text-ink mt-1 font-medium">
            Assigned teams
          </h3>

          <div className="mt-4 space-y-3">
            {crewAssignments.map((crew) => (
              <div
                key={crew.crew}
                className="border-hairline bg-canvas flex flex-col gap-2 rounded-lg border px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-ink font-medium">{crew.crew}</p>
                  <p className="text-body-sm text-muted">{crew.zone}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-success text-[10px] font-semibold tracking-[0.14em] uppercase">
                    {crew.status}
                  </p>
                  <p className="text-body-sm text-muted mt-1">{crew.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-4 sm:p-5">
          <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
            News & notices
          </p>
          <h3 className="text-title-md text-ink mt-1 font-medium">
            Latest updates
          </h3>

          <div className="mt-4 space-y-3">
            {noticeFeed.map((item) => (
              <div
                key={item.title}
                className="border-hairline bg-canvas rounded-lg border p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-ink font-medium">{item.title}</p>
                  <span className="bg-surface-soft text-body-sm text-muted rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase">
                    {item.tag}
                  </span>
                </div>
                <p className="text-body-sm text-body mt-2 leading-6">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
