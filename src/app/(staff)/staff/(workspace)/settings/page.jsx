const settings = [
  { name: "Escalation thresholds", value: "High-priority alerts enabled" },
  { name: "Dispatch policy", value: "Auto-route based on zone capacity" },
  { name: "Incident SLA", value: "Target response under 30 minutes" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-hairline bg-surface-card shadow-subtle rounded-xl border p-5 sm:p-6">
        <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
          Workspace settings
        </p>
        <h3 className="text-title-md text-ink mt-1 font-medium">
          Operational controls
        </h3>

        <div className="mt-4 space-y-3">
          {settings.map((item) => (
            <div
              key={item.name}
              className="border-hairline bg-canvas flex items-center justify-between rounded-lg border p-3"
            >
              <span className="text-ink font-medium">{item.name}</span>
              <span className="text-body-sm text-body">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
