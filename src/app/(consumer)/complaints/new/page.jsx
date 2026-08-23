"use client";

import { useState } from "react";
import {
  ISSUES,
  ComplaintHeader,
  ComplaintStepper,
  Step1SelectIssue,
  Step2LocationDetails,
  Step3ReviewSubmit,
  DocketSuccessReceipt,
} from "./_components";

export default function NewComplaintPage() {
  // Stepper state & Form Data
  const [step, setStep] = useState(1);
  const [selectedIssueId, setSelectedIssueId] = useState("outage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docket, setDocket] = useState(null);

  const [formData, setFormData] = useState({
    address: "",
    landmark: "",
    notes: "",
    isGpsLoading: false,
    gpsCoords: null,
    mediaLinks: [],
  });

  const [files, setFiles] = useState([]);

  const currentIssue =
    ISSUES.find((i) => i.id === selectedIssueId) || ISSUES[0];

  // 1-Click GPS Location Tagging
  const handleGps = () => {
    setFormData((p) => ({ ...p, isGpsLoading: true }));
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setFormData((p) => ({
            ...p,
            isGpsLoading: false,
            gpsCoords: `${lat}° N, ${lng}° E`,
            address: p.address || `GPS Tagged Location (${lat}° N, ${lng}° E)`,
          }));
        },
        () => {
          setFormData((p) => ({
            ...p,
            isGpsLoading: false,
            gpsCoords: "26.8467° N, 80.9462° E",
            address: p.address || "GPS: 26.8467° N, 80.9462° E (Lucknow)",
          }));
        },
        { timeout: 8000 }
      );
    } else {
      setFormData((p) => ({
        ...p,
        isGpsLoading: false,
        gpsCoords: "26.8467° N, 80.9462° E",
        address: p.address || "GPS: 26.8467° N, 80.9462° E (Lucknow)",
      }));
    }
  };

  const handleFormFieldChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
  };

  // File Upload Handling
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

  // Video / Social Proof Link Handling
  const handleAddMediaLink = (url) => {
    setFormData((prev) => ({
      ...prev,
      mediaLinks: [...prev.mediaLinks, url],
    }));
  };

  const handleRemoveMediaLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      mediaLinks: prev.mediaLinks.filter((_, idx) => idx !== index),
    }));
  };

  // Submit Complaint
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const docketId = `UP-DISCOM-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setDocket({
        id: docketId,
        time: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        issue: currentIssue,
        location: formData,
        filesCount: files.length,
        linksCount: formData.mediaLinks.length,
      });
      setIsSubmitting(false);
      setStep(4);
    }, 700);
  };

  const handleReset = () => {
    setDocket(null);
    setStep(1);
    setFormData({
      address: "",
      landmark: "",
      notes: "",
      isGpsLoading: false,
      gpsCoords: null,
      mediaLinks: [],
    });
    setFiles([]);
  };

  // STEP 4: SUCCESS DOCKET RECEIPT
  if (step === 4 && docket) {
    return <DocketSuccessReceipt docket={docket} onReset={handleReset} />;
  }

  // STEPPER FORM (3 SIMPLE STEPS)
  return (
    <div className="max-w-3xl px-4 py-8 sm:px-6">
      <ComplaintHeader />
      <ComplaintStepper step={step} onStepChange={setStep} />

      {/* Form Container Card */}
      <div className="pt-6">
        {step === 1 && (
          <Step1SelectIssue
            selectedIssueId={selectedIssueId}
            onSelectIssue={setSelectedIssueId}
            notes={formData.notes}
            onNotesChange={(notes) => handleFormFieldChange("notes", notes)}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2LocationDetails
            formData={formData}
            onFormChange={handleFormFieldChange}
            onGps={handleGps}
            files={files}
            onFileUpload={handleFileUpload}
            onRemoveFile={handleRemoveFile}
            mediaLinks={formData.mediaLinks}
            onAddMediaLink={handleAddMediaLink}
            onRemoveMediaLink={handleRemoveMediaLink}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Step3ReviewSubmit
            currentIssue={currentIssue}
            formData={formData}
            files={files}
            mediaLinks={formData.mediaLinks}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
}
