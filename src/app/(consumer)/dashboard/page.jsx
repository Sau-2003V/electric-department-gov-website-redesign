import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  MapPin,
  Phone,
  Ticket,
  Zap,
} from "lucide-react";

const contacts = [
  {
    name: "Anita Sharma",
    role: "Call centre agent · Lucknow Central",
    phone: "9000000001",
  },
  {
    name: "Vikas Yadav",
    role: "Field engineer · Lucknow Central",
    phone: "9000000002",
  },
  {
    name: "Rajeev Mishra",
    role: "Supervisor · Lucknow Central",
    phone: "9000000003",
  },
  {
    name: "Priya Nair",
    role: "Administrator · Head Office",
    phone: "9000000004",
  },
];

const complaints = [
  {
    id: "VVNL-240001",
    title: "Sparking / safety hazard",
    description:
      "Live wire sparking near the school gate, heavy sparking every few minutes.",
    status: "Assigned",
    priority: "Due soon",
  },
  {
    id: "VVNL-240002",
    title: "Power outage",
    description: "No supply in the entire block since last night.",
    status: "In progress",
    priority: "SLA breached",
  },
  {
    id: "VVNL-240005",
    title: "Street light",
    description: "Street lights on the main road stay off all night.",
    status: "Closed",
    priority: "SLA met",
  },
  {
    id: "VVNL-240007",
    title: "Voltage fluctuation",
    description: "Severe voltage fluctuation, appliances tripping repeatedly.",
    status: "Assigned",
    priority: "SLA breached",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-61px)] px-4 pt-5 pb-10 sm:px-[32px] sm:pt-[34px]">
      {/* Dashboard Heading */}
      <section className="mb-6 flex items-start justify-between sm:mb-[30px]">
        <div>
          <h1 className="text-2xl leading-tight font-bold tracking-[-0.8px] text-[#111] sm:text-[30px] sm:leading-[34px]">
            Namaste, Ramesh Kumar
          </h1>

          <p className="mt-1 text-[13px] text-[#777] sm:text-[14px]">
            12/3 Gomti Nagar, Lucknow 226010
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-6 grid grid-cols-3 gap-2.5 sm:mb-[32px] sm:gap-[16px]">
        {/* Open */}
        <div className="min-h-[110px] rounded-2xl border border-[#d9d6d0] bg-white p-3 sm:h-[128px] sm:rounded-[20px] sm:px-[21px] sm:py-[19px]">
          <Ticket size={18} className="mb-2 text-[#ff4308] sm:mb-[11px]" />

          <p className="text-2xl leading-none font-bold text-[#111] sm:text-[31px] sm:leading-[30px]">
            3
          </p>

          <p className="mt-1 text-xs leading-tight text-[#777] sm:mt-[5px] sm:text-[14px]">
            Open complaints
          </p>
        </div>

        {/* Resolved */}
        <div className="min-h-[110px] rounded-2xl border border-[#d9d6d0] bg-white p-3 sm:h-[128px] sm:rounded-[20px] sm:px-[21px] sm:py-[19px]">
          <CheckCircle2
            size={18}
            className="mb-2 text-[#ff4308] sm:mb-[11px]"
          />

          <p className="text-2xl leading-none font-bold text-[#111] sm:text-[31px] sm:leading-[30px]">
            1
          </p>

          <p className="mt-1 text-xs leading-tight text-[#777] sm:mt-[5px] sm:text-[14px]">
            Resolved / closed
          </p>
        </div>

        {/* Outages */}
        <div className="min-h-[110px] rounded-2xl border border-[#d9d6d0] bg-white p-3 sm:h-[128px] sm:rounded-[20px] sm:px-[21px] sm:py-[19px]">
          <Zap size={18} className="mb-2 text-[#ff4308] sm:mb-[11px]" />

          <p className="text-2xl leading-none font-bold text-[#111] sm:text-[31px] sm:leading-[30px]">
            1
          </p>

          <p className="mt-1 text-xs leading-tight text-[#777] sm:mt-[5px] sm:text-[14px]">
            Active outages
          </p>
        </div>
      </section>

      {/* Your Subdivision */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-[#d9d6d0] bg-white sm:mb-[30px] sm:rounded-[20px]">
        {/* Subdivision Header */}
        <div className="flex flex-col items-start justify-between gap-3 border-b border-[#ddd9d2] p-4 sm:flex-row sm:items-center sm:px-[21px] sm:py-[17px]">
          <div>
            <div className="flex items-center gap-[8px]">
              <MapPin size={18} className="text-[#ff4308]" />

              <p className="text-[13px] font-bold tracking-[0.3px] sm:text-[14px]">
                YOUR SUBDIVISION
              </p>
            </div>

            <p className="mt-1 text-xs text-[#777] sm:text-[13px]">
              Lucknow Central · Lucknow · PIN 226001, 226010
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 items-center gap-[8px] self-start rounded-full border border-[#ffbda9] bg-[#fff1eb] px-3.5 text-xs font-semibold text-[#222] sm:h-[40px] sm:self-auto sm:px-[16px] sm:text-[14px]"
          >
            <Phone size={15} className="text-[#ff4308]" />
            Emergency helpline 1912
          </button>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2 sm:gap-[12px] sm:p-[20px]">
          {contacts.map((contact) => (
            <div
              key={contact.phone}
              className="flex min-h-[64px] items-center justify-between gap-2 rounded-xl border border-[#ddd9d2] p-3 sm:rounded-[17px] sm:px-[17px]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold sm:text-[14px]">
                  {contact.name}
                </p>

                <p className="mt-0.5 truncate text-xs text-[#777]">
                  {contact.role}
                </p>
              </div>

              <a
                href={`tel:${contact.phone}`}
                className="flex h-[32px] shrink-0 items-center gap-1.5 rounded-lg bg-[#ff4308] px-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 active:scale-95 sm:h-[35px] sm:rounded-[12px] sm:px-[15px] sm:text-[13px]"
              >
                <Phone size={13} />
                <span>{contact.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Outage Alert */}
      <section className="mb-6 rounded-2xl border border-[#f4c5b3] bg-[#fff0e9] p-4 sm:mb-[30px] sm:rounded-[19px] sm:px-[21px] sm:py-[18px]">
        <div className="mb-[10px] flex items-center gap-[8px]">
          <AlertTriangle size={18} className="text-[#ff4308]" />

          <p className="text-[14px] font-bold">Outages affecting your area</p>
        </div>

        <p className="text-[13px] text-[#666]">
          <span className="font-semibold text-[#222]">
            Gomti Nagar Sector 4
          </span>
          <span className="mx-[6px]">—</span>
          Planned maintenance of the 33/11 kV feeder. (Planned, 23 Aug 2026,
          2:02 pm)
        </p>
      </section>

      {/* Recent Complaints */}
      <section className="overflow-hidden rounded-[20px] border border-[#d9d6d0] bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ddd9d2] px-[21px] py-[17px]">
          <p className="text-[14px] font-bold tracking-[0.4px]">
            RECENT COMPLAINTS
          </p>

          <button type="button" className="text-[14px] text-[#f4511e]">
            View all
          </button>
        </div>

        {/* Complaints */}
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="flex min-h-[85px] items-center justify-between border-b border-[#e4e1dc] px-[21px] last:border-b-0"
          >
            <div>
              <p className="text-[11px] text-[#888]">{complaint.id}</p>

              <p className="mt-[2px] text-[14px] font-medium">
                {complaint.title}
              </p>

              <p className="mt-[4px] text-[13px] text-[#777]">
                {complaint.description}
              </p>
            </div>

            <div className="ml-[20px] min-w-[100px] text-right">
              <span
                className={`inline-flex rounded-full px-[11px] py-[5px] text-[12px] ${
                  complaint.status === "Closed"
                    ? "bg-[#e9e7e3] text-[#666]"
                    : complaint.status === "In progress"
                      ? "bg-[#ffe0d6] text-[#f4511e]"
                      : "bg-[#e9e7e3] text-[#444]"
                }`}
              >
                {complaint.status}
              </span>

              <p
                className={`mt-[4px] text-[12px] ${
                  complaint.priority === "SLA met"
                    ? "text-[#777]"
                    : "text-[#d83a2e]"
                }`}
              >
                {complaint.priority}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
