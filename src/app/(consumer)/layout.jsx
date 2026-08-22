import {
  AlertTriangle,
  FileText,
  Grid2X2,
  HelpCircle,
  LogOut,
  Menu,
  Phone,
  Search,
  Ticket,
  Zap,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Grid2X2,
  },
  {
    label: "My complaints",
    href: "/complaints",
    icon: Ticket,
  },
  {
    label: "New complaint",
    href: "/complaints/new",
    icon: FileText,
  },
  {
    label: "Outages",
    href: "/outages",
    icon: AlertTriangle,
  },
  {
    label: "Track ticket",
    href: "/track-ticket",
    icon: Search,
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export default function ConsumerLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#171717]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-[255px] flex-col border-r border-[#d9d6d0] bg-[#f8f6f1]">

        {/* Logo */}
        <div className="flex h-[61px] items-center gap-[10px] px-[17px]">
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#151515]">
            <Zap
              size={19}
              strokeWidth={2.5}
              className="text-white"
              fill="white"
            />
          </div>

          <div className="leading-tight">
            <p className="text-[16px] font-bold tracking-[-0.3px] text-[#161616]">
              Vidhyut Vitran Nigam
            </p>

            <p className="mt-[1px] text-[11px] text-[#777]">
              Consumer portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-[12px] pt-[18px]">
          <p className="mb-[8px] px-[9px] text-[12px] text-[#666]">
            Services
          </p>

          <nav className="space-y-[3px]">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex h-[36px] items-center gap-[10px] rounded-[10px] px-[9px] text-[14px] transition ${
                    item.label === "Dashboard"
                      ? "bg-[#ebe7e1] font-medium text-[#222]"
                      : "text-[#333] hover:bg-[#eeeae4]"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Section */}
        <div className="mt-auto px-[12px] pb-[12px]">

          {/* Sign Out */}
          <button
            type="button"
            className="mb-[8px] flex h-[36px] w-full items-center gap-[10px] rounded-[10px] px-[9px] text-[13px] text-[#333] transition hover:bg-[#eeeae4]"
          >
            <LogOut
              size={17}
              strokeWidth={1.8}
            />

            <span>Sign out</span>
          </button>

          {/* User */}
          <div className="mb-[10px] rounded-[11px] bg-[#eeeae4] px-[10px] py-[9px]">
            <p className="text-[12px] font-semibold text-[#333]">
              Ramesh Kumar
            </p>

            <p className="mt-[2px] text-[12px] text-[#777]">
              Meter 1234567890
            </p>
          </div>

          {/* Emergency */}
          <div className="flex items-center gap-[6px] px-[9px] text-[12px] text-[#555]">
            <Phone size={14} />

            <span className="font-semibold">
              1912
            </span>

            <span>
              24×7 emergency
            </span>
          </div>

        </div>
      </aside>

      {/* Main Area */}
      <div className="ml-[255px] min-h-screen">

        {/* Top Header */}
        {/* <header className="flex h-[61px] items-center justify-between border-b border-[#d9d6d0] bg-white px-[22px]">

          <div className="flex items-center gap-[14px]">
            <Menu
              size={19}
              strokeWidth={1.8}
            />

            <span className="text-[15px] font-medium text-[#333]">
              Consumer dashboard
            </span>
          </div>

        </header> */}

        {/* Page Content */}
        <main>
          {children}
        </main>

      </div>
    </div>
  );
}