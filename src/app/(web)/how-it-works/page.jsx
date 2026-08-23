export default function HowItWorksPage() {
  const steps = [
    { title: "Sign Up / Login", description: "Make your account or log in with your meter number." },
    { title: "Dashboard Access", description: "See your meter details, past bills, and shortcuts all in one place." },
    { title: "Raise Complaint", description: "Submit a complaint if you face issues like power cut or wrong bill." },
    { title: "Track Status", description: "Check the progress of your complaint and know when it will be fixed." },
    { title: "Make Payment", description: "Pay your bills online safely using Razorpay." },
    { title: "Get Support", description: "Read FAQs or contact our support team for help." },
  ];

  return (
    <main className="min-h-screen bg-[#f5f2ec] text-[#171717]">
      <section className="mx-auto max-w-[1315px] px-5 pb-14 pt-10">
        <div className="mb-8">
          <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.3px] text-[#ef5b28]">
            How It Works
          </p>
          <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.8px] text-[#111]">
            A Simple Flow
          </h1>
          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#686868]">
            Managing electricity services is now easy. Just follow these steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col rounded-[19px] border border-[#ddd9d2] bg-[#fffdfa] p-6 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
            >
              <h2 className="text-[17px] font-semibold text-[#171717]">{step.title}</h2>
              <p className="mt-2 text-[14px] leading-6 text-[#626262]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
