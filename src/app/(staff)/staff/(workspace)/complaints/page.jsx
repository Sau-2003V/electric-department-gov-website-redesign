export const metadata = {
  title: "Complaint Desk · Staff Workspace · Vidhyut Portal",
  description:
    "Manage, assign, escalate, and resolve consumer electricity complaints and field incidents across subdivisions.",
};

const complaints = [
  {
    id: "SR-1019",
    customer: "A. Sharma",
    issue: "Transformer noise",
    status: "Assigned",
    eta: "18 min",
  },
  {
    id: "SR-1042",
    customer: "M. Nair",
    issue: "Voltage drop",
    status: "Escalated",
    eta: "9 min",
  },
  {
    id: "SR-1091",
    customer: "S. Verma",
    issue: "Streetlight outage",
    status: "Pending",
    eta: "32 min",
  },
  {
    id: "SR-1127",
    customer: "R. Gupta",
    issue: "Meter reading issue",
    status: "Review",
    eta: "1 hour",
  },
];

export default function ComplaintsPage() {
  return (
    <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
            Complaint desk
          </p>
          <h3 className="text-title-md text-ink mt-1 font-medium">
            Open complaints
          </h3>
        </div>
        <button
          type="button"
          className="border-hairline bg-canvas text-body-sm text-body rounded-md border px-3 py-1.5 font-medium"
        >
          Export CSV
        </button>
      </div>

      <div className="border-hairline overflow-hidden rounded-xl border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-soft text-body">
            <tr>
              <th className="px-4 py-3 font-medium">Ticket</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="border-hairline bg-canvas border-t"
              >
                <td className="text-ink px-4 py-3 font-medium">
                  {complaint.id}
                </td>
                <td className="text-body px-4 py-3">{complaint.customer}</td>
                <td className="text-body px-4 py-3">{complaint.issue}</td>
                <td className="px-4 py-3">
                  <span className="bg-surface-soft text-body-sm text-muted rounded-full px-2 py-1 font-semibold">
                    {complaint.status}
                  </span>
                </td>
                <td className="text-body px-4 py-3">{complaint.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
