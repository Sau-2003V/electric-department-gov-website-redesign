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
    <div className="space-y-6">
      <section className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-5 sm:p-6">
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

        <div className="border-hairline overflow-hidden rounded-xl border">
          <table className="min-w-full text-left text-sm">
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
                  <td className="text-ink px-4 py-3 font-medium">
                    {request.id}
                  </td>
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
    </div>
  );
}
