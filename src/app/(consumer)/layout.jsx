import Sidebar from "./_components/Sidebar";
 
export default function ConsumerLayout({ children }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar />
      {/* Main Content Surface */}
      <div className="relative flex min-h-screen flex-col pl-64">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
