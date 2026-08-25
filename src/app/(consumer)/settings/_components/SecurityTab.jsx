"use client";

import { useState } from "react";
import {
  KeyRound,
  Shield,
  Smartphone,
  Laptop,
  LogOut,
  Download,
  Check,
  AlertCircle,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);
  const [isRevokingSessions, setIsRevokingSessions] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass || !passwords.confirmPass) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwords.newPass.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsUpdatingPass(true);
    setTimeout(() => {
      setIsUpdatingPass(false);
      setPasswords({ current: "", newPass: "", confirmPass: "" });
      toast.success("Account password changed successfully", {
        description:
          "Your new credentials are active. Please use them on your next sign in.",
      });
    }, 900);
  };

  const handleRevokeSessions = () => {
    setIsRevokingSessions(true);
    setTimeout(() => {
      setIsRevokingSessions(false);
      toast.success("Other active sessions logged out", {
        description:
          "All other browser and mobile app tokens have been terminated.",
      });
    }, 700);
  };

  const handleDownloadData = (type) => {
    toast.success(`Preparing ${type} export...`, {
      description:
        "Your encrypted consumption and payment report is being generated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Change Form */}
      <form
        onSubmit={handlePasswordSubmit}
        className="border-hairline bg-canvas shadow-subtle space-y-6 rounded-xl border p-5 sm:p-7"
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-semibold">
              Security Credentials & Password
            </h3>
            <Badge
              variant="surface"
              size="sm"
              leadingIcon={KeyRound}
              text="Encrypted"
            />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Regularly rotate your password to protect sensitive meter telemetry
            and billing transactions.
          </p>
        </div>

        <div className="border-hairline grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
          {/* Current Password */}
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrent ? "text" : "password"}
              value={passwords.current}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, current: e.target.value }))
              }
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="text-muted-soft hover:text-ink absolute top-9 right-3 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showCurrent ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              label="New Password"
              type={showNew ? "text" : "password"}
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, newPass: e.target.value }))
              }
              placeholder="••••••••"
              helperText="Min. 8 chars with numbers & symbol"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="text-muted-soft hover:text-ink absolute top-9 right-3 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showNew ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirm ? "text" : "password"}
              value={passwords.confirmPass}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  confirmPass: e.target.value,
                }))
              }
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-muted-soft hover:text-ink absolute top-9 right-3 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showConfirm ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="border-hairline flex items-center justify-end border-t pt-4">
          <Button
            type="submit"
            variant="primary"
            loading={isUpdatingPass}
            icon={Save}
          >
            Update password
          </Button>
        </div>
      </form>

      {/* Two-Factor Authentication Toggle */}
      <div className="border-hairline bg-canvas shadow-subtle rounded-xl border p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-surface-card border-hairline text-ink mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border">
              <Shield className="text-success size-4.5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-title-sm text-ink font-semibold">
                  Two-Factor Authentication (OTP on Login & High-Impact Actions)
                </p>
                <Badge variant="success" size="sm" text="Recommended" />
              </div>
              <p className="text-body-sm text-muted-text">
                Require a 6-digit one-time password (OTP) sent to your
                registered mobile number for logins from new devices and major
                load/tariff change applications.
              </p>
            </div>
          </div>
          <Switch
            checked={twoFactorAuth}
            onCheckedChange={setTwoFactorAuth}
            aria-label="Toggle 2FA"
          />
        </div>
      </div>

      {/* Active Sessions & Logged-In Devices */}
      <div className="border-hairline bg-canvas shadow-subtle space-y-4 rounded-xl border p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-title-sm text-ink font-semibold">
              Active Authorized Sessions
            </h3>
            <p className="text-body-sm text-muted-text">
              Devices currently signed into this consumer account.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            loading={isRevokingSessions}
            onClick={handleRevokeSessions}
            icon={LogOut}
          >
            Sign out other devices
          </Button>
        </div>

        <div className="divide-hairline border-hairline divide-y border-t">
          {/* Current Browser */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="bg-surface-card text-ink flex size-8 items-center justify-center rounded-md">
                <Laptop className="text-brand-accent size-4" />
              </div>
              <div>
                <p className="text-ink flex items-center gap-2 text-sm font-semibold">
                  Chrome on Windows 11
                  <Badge variant="secondary" size="sm" text="Current Session" />
                </p>
                <p className="text-muted-soft font-mono text-xs">
                  IP: 103.21.24.89 (Varanasi, India) · Active now
                </p>
              </div>
            </div>
          </div>

          {/* Mobile App */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <div className="bg-surface-card text-ink flex size-8 items-center justify-center rounded-md">
                <Smartphone className="text-muted-text size-4" />
              </div>
              <div>
                <p className="text-ink text-sm font-semibold">
                  Vidhyut Consumer App · Samsung Galaxy S23
                </p>
                <p className="text-muted-soft font-mono text-xs">
                  IP: 103.21.25.12 (Varanasi, India) · Last active 3 hrs ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Export & GDPR/DPDP Statement Card */}
      <div className="border-hairline bg-surface-card shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h4 className="text-title-sm text-ink font-semibold">
            Consumer Data Portability & Ledger Export
          </h4>
          <p className="text-body-sm text-muted-text mt-0.5">
            Download your complete 24-month meter consumption history, audited
            tariff statements, and complaint logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleDownloadData("CSV (Telemetry Data)")}
            icon={Download}
          >
            Export CSV
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => handleDownloadData("PDF (Official Ledger)")}
            icon={Download}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
