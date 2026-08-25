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

  // files / mediaLinks live here so Step3 review can show them
  const [files, setFiles] = useState([]);
  const [mediaLinks, setMediaLinks] = useState([]);

  // docket shown after successful DB insert
  const [docket, setDocket] = useState(null);

  const currentIssue =
    ISSUES.find((i) => i.id === selectedIssueId) || ISSUES[0];

  // ── File upload helpers (passed into Step2 if needed later) ─
  const handleFileUpload = (input) => {
    const rawFiles = input?.target?.files
      ? Array.from(input.target.files)
      : Array.isArray(input)
        ? input
        : Array.from(input || []);
    if (!rawFiles.length) return;

    setFiles((prev) => {
      const remaining = Math.max(0, 5 - prev.length);
      const toAdd = rawFiles.slice(0, remaining).map((f) => ({
        name: f.name,
        size:
          f.size > 1024 * 1024
            ? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.max(1, Math.round(f.size / 1024))} KB`,
        previewUrl:
          f.type.startsWith("image/") && typeof URL !== "undefined"
            ? URL.createObjectURL(f)
            : null,
      }));
      return [...prev, ...toAdd];
    });
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => {
      const target = prev[index];
      if (target?.previewUrl && typeof URL !== "undefined") {
        try {
          URL.revokeObjectURL(target.previewUrl);
        } catch {}
      }
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleAddMediaLink = (url) => setMediaLinks((prev) => [...prev, url]);

  const handleRemoveMediaLink = (index) =>
    setMediaLinks((prev) => prev.filter((_, idx) => idx !== index));

  // ── Step 2 → 3: receive validated location data ──────────────
  const handleLocationNext = (data) => {
    setLocationData(data);
    setStep(3);
  };

  // ── Step 3 → 4: receive DB complaint from server action ──────
  const handleSuccess = (complaint) => {
    setDocket({
      id: complaint.id,
      time: new Date(complaint.created_at).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      issue: currentIssue,
      location: locationData,
      filesCount: files.length,
      linksCount: mediaLinks.length,
    });
    setStep(4);
  };

  const handleReset = () => {
    setDocket(null);
    setStep(1);
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
