import Sidebar from "./_components/Sidebar";
import BottomNav from "./_components/BottomNav";

export default function StaffWorkspaceLayout({ children }) {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto flex h-dvh max-w-[1600px] gap-0 p-0 md:p-4 lg:p-6">
        <Sidebar />

        <div className="relative flex min-h-0 flex-1 flex-col pb-20 md:pb-0 md:pl-72">
          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
                <header className="border-hairline bg-surface-card shadow-subtle mb-6 rounded-xl border p-5 sm:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-caption text-muted-soft tracking-[0.18em] uppercase">
                        Operations board
                      </p>
                      <h2 className="text-title-lg sm:text-display-sm text-ink mt-2 font-medium">
                        Regional power service status
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="border-success/20 bg-success/10 text-success border px-3 py-1.5 text-xs font-medium">
                        96.2% uptime
                      </div>
                      <div className="border-hairline bg-canvas text-body-sm text-body rounded-lg border px-3 py-1.5">
                        Updated 2 min ago
                      </div>
                    </div>
                  </div>
                </header>

                {children}
              </div>
            </div>
          </main>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
