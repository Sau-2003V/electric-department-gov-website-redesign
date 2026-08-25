"use client";

import { useState } from "react";
import {
  ComplaintHeader,
  ComplaintStepper,
  Step1SelectIssue,
  Step2LocationDetails,
  Step3ReviewSubmit,
  DocketSuccessReceipt,
} from "./_components";
import { ISSUES } from "@/constants";

export default function NewComplaintPage() {
  const [step, setStep] = useState(1);
  const [selectedIssueId, setSelectedIssueId] = useState("outage");
  const [notes, setNotes] = useState("");

  // locationData is set by Step2 on validated submit
  const [locationData, setLocationData] = useState(null);

  // files (compressed WebP images + raw PDFs, max 3) and mediaLinks (YouTube / Instagram / X)
  const [files, setFiles] = useState([]);
  const [mediaLinks, setMediaLinks] = useState([]);

  // docket shown after successful DB insert
  const [docket, setDocket] = useState(null);

  const currentIssue =
    ISSUES.find((i) => i.id === selectedIssueId) || ISSUES[0];

  // ── Step 2 → 3: receive validated location data ──────────────
  const handleLocationNext = (data) => {
    setLocationData(data);
    setStep(3);
  };

  // ── Step 3 → 4: receive DB complaint ID from server action ──────
  const handleSuccess = (complaintId) => {
    const id = typeof complaintId === "object" ? complaintId?.id : complaintId;
    const imageCount = files.filter((f) => f.type === "image").length;
    const pdfCount = files.filter((f) => f.type === "pdf").length;

    setDocket({
      id,
      time: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      issue: currentIssue,
      location: locationData,
      filesCount: files.length,
      imageCount,
      pdfCount,
      linksCount: mediaLinks.length,
    });
    setStep(4);
  };

  const handleReset = () => {
    // Revoke any created preview URLs
    files.forEach((f) => {
      if (f.previewUrl && typeof URL !== "undefined") {
        try {
          URL.revokeObjectURL(f.previewUrl);
        } catch {}
      }
    });

    setDocket(null);
    setStep(1);
    setSelectedIssueId("outage");
    setNotes("");
    setLocationData(null);
    setFiles([]);
    setMediaLinks([]);
  };

  // STEP 4: SUCCESS DOCKET RECEIPT
  if (step === 4 && docket) {
    return <DocketSuccessReceipt docket={docket} onReset={handleReset} />;
  }

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <div className="max-w-4xl px-4 py-8 sm:px-6">
        <ComplaintHeader />
        <ComplaintStepper step={step} onStepChange={setStep} />

        <div className="pt-6">
          {step === 1 && (
            <Step1SelectIssue
              selectedIssueId={selectedIssueId}
              onSelectIssue={setSelectedIssueId}
              notes={notes}
              onNotesChange={setNotes}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <Step2LocationDetails
              initialLocationData={locationData}
              files={files}
              onFilesChange={setFiles}
              mediaLinks={mediaLinks}
              onMediaLinksChange={setMediaLinks}
              onBack={() => setStep(1)}
              onNext={handleLocationNext}
            />
          )}

          {step === 3 && (
            <Step3ReviewSubmit
              currentIssue={currentIssue}
              locationData={locationData}
              notes={notes}
              files={files}
              mediaLinks={mediaLinks}
              onBack={() => setStep(2)}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
