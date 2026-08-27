"use client";

import { useState } from "react";
import { KeyRound, Shield, Save, Eye, EyeOff } from "lucide-react";
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
      toast.success("Password changed", {
        description: "Use your new password on the next sign-in.",
      });
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <form
        onSubmit={handlePasswordSubmit}
        className="border-hairline bg-canvas shadow-subtle space-y-6 rounded-xl border p-5 sm:p-7"
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-title-md text-ink font-medium">
              Change Password
            </h3>
            <Badge
              variant="surface"
              size="sm"
              leadingIcon={KeyRound}
              text="Encrypted"
            />
          </div>
          <p className="text-body-sm text-muted-text mt-0.5">
            Use a strong password of at least 8 characters.
          </p>
        </div>

        <div className="border-hairline grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
          {/* Current */}
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
              aria-label="Toggle visibility"
            >
              {showCurrent ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* New */}
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
              aria-label="Toggle visibility"
            >
              {showNew ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* Confirm */}
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
              aria-label="Toggle visibility"
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

      {/* Two-Factor Auth */}
      <div className="border-hairline bg-canvas shadow-subtle rounded-xl border p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-surface-card border-hairline mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border">
              <Shield className="text-success size-4.5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-title-sm text-ink font-medium">
                  Two-Factor Authentication
                </p>
                <Badge variant="success" size="sm" text="Recommended" />
              </div>
              <p className="text-body-sm text-muted-text">
                Require a 6-digit OTP on your registered mobile for new-device
                logins and sensitive account changes.
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
    </div>
  );
}
