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
    <div className="min-h-[calc(100vh-61px)] px-[32px] pt-[34px] pb-[40px]">
      {/* Dashboard Heading */}
      <section className="mb-[30px] flex items-start justify-between">
        <div>
          <div className="mb-[8px] flex items-center gap-[8px]">
            <span className="h-[6px] w-[30px] rounded-full bg-[#ff4308]" />

            <span className="text-[13px] font-bold tracking-[0.5px] text-[#f4511e]">
              CONSUMER DASHBOARD
            </span>
          </div>

          <h1 className="text-[30px] leading-[34px] font-bold tracking-[-0.8px] text-[#111]">
            Namaste, Ramesh Kumar
          </h1>

          <p className="mt-[5px] text-[14px] text-[#777]">
            12/3 Gomti Nagar, Lucknow 226010
          </p>
        </div>

        <button
          type="button"
          className="mt-[35px] flex h-[45px] items-center gap-[9px] rounded-[14px] bg-[#ff4308] px-[20px] text-[14px] font-bold text-white shadow-[0_3px_7px_rgba(0,0,0,0.12)] transition hover:bg-[#ed3d05]"
        >
          <FileText size={17} />
          Register a complaint
        </button>
      </section>

      {/* Statistics */}
      <section className="mb-[32px] grid grid-cols-3 gap-[16px]">
        {/* Open */}
        <div className="h-[128px] rounded-[20px] border border-[#d9d6d0] bg-white px-[21px] py-[19px]">
          <Ticket size={20} className="mb-[11px] text-[#ff4308]" />

          <p className="text-[31px] leading-[30px] font-bold text-[#111]">3</p>

          <p className="mt-[5px] text-[14px] text-[#777]">Open complaints</p>
        </div>

        {/* Resolved */}
        <div className="h-[128px] rounded-[20px] border border-[#d9d6d0] bg-white px-[21px] py-[19px]">
          <CheckCircle2 size={20} className="mb-[11px] text-[#ff4308]" />

          <p className="text-[31px] leading-[30px] font-bold text-[#111]">1</p>

          <p className="mt-[5px] text-[14px] text-[#777]">Resolved / closed</p>
        </div>

        {/* Outages */}
        <div className="h-[128px] rounded-[20px] border border-[#d9d6d0] bg-white px-[21px] py-[19px]">
          <Zap size={20} className="mb-[11px] text-[#ff4308]" />

          <p className="text-[31px] leading-[30px] font-bold text-[#111]">1</p>

          <p className="mt-[5px] text-[14px] text-[#777]">
            Active outages in your area
          </p>
        </div>
      </section>

      {/* Your Subdivision */}
      <section className="mb-[30px] overflow-hidden rounded-[20px] border border-[#d9d6d0] bg-white">
        {/* Subdivision Header */}
        <div className="flex items-center justify-between border-b border-[#ddd9d2] px-[21px] py-[17px]">
          <div>
            <div className="flex items-center gap-[8px]">
              <MapPin size={19} className="text-[#ff4308]" />

              <p className="text-[14px] font-bold tracking-[0.3px]">
                YOUR SUBDIVISION
              </p>
            </div>

            <p className="mt-[5px] text-[13px] text-[#777]">
              Lucknow Central · Lucknow · PIN 226001, 226010
            </p>
          </div>

          <button
            type="button"
            className="flex h-[40px] items-center gap-[8px] rounded-full border border-[#ffbda9] bg-[#fff1eb] px-[16px] text-[14px] font-semibold text-[#222]"
          >
            <Phone size={17} className="text-[#ff4308]" />
            Emergency helpline 1912
          </button>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-[12px] p-[20px]">
          {contacts.map((contact) => (
            <div
              key={contact.phone}
              className="flex h-[72px] items-center justify-between rounded-[17px] border border-[#ddd9d2] px-[17px]"
            >
              <div>
                <p className="text-[14px] font-semibold">{contact.name}</p>

                <p className="mt-[3px] text-[12px] text-[#777]">
                  {contact.role}
                </p>
              </div>

              <button
                type="button"
                className="flex h-[35px] items-center gap-[8px] rounded-[12px] bg-[#ff4308] px-[15px] text-[13px] font-bold text-white"
              >
                <Phone size={15} />

                {contact.phone}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Outage Alert */}
      <section className="mb-[30px] rounded-[19px] border border-[#f4c5b3] bg-[#fff0e9] px-[21px] py-[18px]">
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
