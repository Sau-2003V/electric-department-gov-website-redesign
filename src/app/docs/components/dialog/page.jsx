"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  AlertTriangle,
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  Shield,
  Layers,
  Send,
} from "lucide-react";

export default function DialogDocsPage() {
  const [bookingSent, setBookingSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      {/* Header */}
      <div className="border-hairline space-y-2 border-b pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-ink text-3xl font-medium tracking-tight">
            Dialog
          </h1>
          <Badge variant="accent" size="sm" shape="tag">
            Updated v2.0
          </Badge>
        </div>
        <p className="text-muted-text text-sm">
          Modal dialogs and overlays with calibrated canvas/surface cards,
          hairline borders, soft elevation shadows ({`shadow-card`}), and spring
          animations.
        </p>
        <div className="pt-2">
          <code className="border-hairline bg-surface-card text-ink inline-block rounded-md border px-3 py-1.5 font-mono text-xs">
            import &#123; Dialog, DialogTrigger, DialogContent, DialogHeader,
            DialogTitle, DialogDescription, DialogFooter, DialogClose &#125;
            from &quot;@/components/ui/dialog&quot;;
          </code>
        </div>
      </div>

      {/* 1. Interactive Demos */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">
            1. Interactive Modals
          </h2>
          <p className="text-muted-text text-xs">
            Click any trigger below to preview dialog surfaces and transitions.
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle grid grid-cols-1 gap-6 rounded-2xl border p-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Standard Confirmation */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-medium">
                Default Canvas Modal
              </h3>
              <p className="text-muted-text text-xs">
                Standard white canvas background with hairline border.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" size="default">
                  Open Canvas Dialog
                </Button>
              </DialogTrigger>
              <DialogContent variant="canvas">
                <DialogHeader>
                  <div className="bg-brand-accent/10 text-brand-accent mb-1 flex size-9 items-center justify-center rounded-lg">
                    <Sparkles className="size-4.5" />
                  </div>
                  <DialogTitle>Confirm Schedule Change</DialogTitle>
                  <DialogDescription>
                    You are rescheduling the meeting with Alex Rivera to
                    tomorrow at 10:00 AM EST. An updated calendar invite will be
                    sent.
                  </DialogDescription>
                </DialogHeader>
                <div className="border-hairline bg-surface-soft my-2 rounded-lg border p-3.5 text-xs">
                  <div className="text-muted-text flex items-center justify-between">
                    <span>Date & Time</span>
                    <span className="text-ink font-medium">
                      Aug 25, 2026 · 10:00 AM
                    </span>
                  </div>
                  <div className="text-muted-text mt-1 flex items-center justify-between">
                    <span>Duration</span>
                    <span className="text-ink font-medium">
                      30 mins (Google Meet)
                    </span>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary" size="default">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="primary" size="default">
                      Confirm Reschedule
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Surface Card Modal */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-medium">
                Surface Card Modal
              </h3>
              <p className="text-muted-text text-xs">
                Light-gray card surface ({`--surface-card`} #f5f5f5).
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="default">
                  Open Card Dialog
                </Button>
              </DialogTrigger>
              <DialogContent variant="surface">
                <DialogHeader>
                  <div className="bg-badge-orange/15 mb-1 flex size-9 items-center justify-center rounded-lg text-orange-600">
                    <Calendar className="size-4.5" />
                  </div>
                  <DialogTitle>Quick Booking Slot</DialogTitle>
                  <DialogDescription>
                    Enter your details below to book a 15-minute consultation.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-1">
                  <Input label="Your Name" placeholder="e.g. Maya Chen" />
                  <Input
                    label="Work Email"
                    type="email"
                    placeholder="maya@company.com"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost" size="default">
                      Back
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="primary" size="default" leadingIcon={Send}>
                      Book Meeting
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Destructive Alert Modal */}
          <div className="bg-canvas border-hairline shadow-subtle flex flex-col justify-between gap-4 rounded-xl border p-5">
            <div className="space-y-1">
              <h3 className="text-ink text-sm font-medium">
                Destructive Action
              </h3>
              <p className="text-muted-text text-xs">
                Critical confirmation modal for irreversible actions.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="default"
                  leadingIcon={Trash2}
                >
                  Delete Schedule
                </Button>
              </DialogTrigger>
              <DialogContent size="sm">
                <DialogHeader>
                  <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
                    <AlertTriangle className="size-4.5" />
                  </div>
                  <DialogTitle>Delete Event Type?</DialogTitle>
                  <DialogDescription>
                    This will permanently remove the &quot;30 Min Strategy
                    Call&quot; event type and cancel any pending calendar links.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary" size="default">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive" size="default">
                      Delete Permanently
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* 2. Size Ladder */}
      <section className="space-y-4">
        <div>
          <h2 className="text-ink text-lg font-medium">2. Size Ladder</h2>
          <p className="text-muted-text text-xs">
            Dialogs scale from compact alerts ({`max-w-sm`}) to wide workflows (
            {`max-w-2xl`}).
          </p>
        </div>

        <div className="border-hairline bg-surface-card shadow-subtle flex flex-wrap items-center gap-4 rounded-xl border p-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="default">
                Small Modal (sm ~384px)
              </Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Compact Alert</DialogTitle>
                <DialogDescription>
                  A minimal single-purpose dialog for quick notifications or
                  confirmations.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="primary" size="compact">
                    Got It
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="default">
                Default Modal (md ~448px)
              </Button>
            </DialogTrigger>
            <DialogContent size="default">
              <DialogHeader>
                <DialogTitle>Standard Sized Dialog</DialogTitle>
                <DialogDescription>
                  The default modal width for forms, account settings, and
                  workflow triggers.
                </DialogDescription>
              </DialogHeader>
              <div className="border-hairline bg-surface-soft text-muted-text my-2 rounded-lg border p-4 text-xs">
                Standard form body content goes here.
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" size="default">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="primary" size="default">
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="default">
                Large Modal (lg ~672px)
              </Button>
            </DialogTrigger>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Multi-Step Integration Setup</DialogTitle>
                <DialogDescription>
                  Connect your Google Calendar, Outlook, and Zoom accounts in a
                  single workspace workflow.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="border-hairline bg-canvas rounded-lg border p-3">
                  <div className="text-ink text-xs font-medium">
                    Google Calendar
                  </div>
                  <div className="text-muted-text text-[11px]">
                    Sync primary and secondary schedules
                  </div>
                </div>
                <div className="border-hairline bg-canvas rounded-lg border p-3">
                  <div className="text-ink text-xs font-medium">
                    Zoom Meetings
                  </div>
                  <div className="text-muted-text text-[11px]">
                    Generate unique video links
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" size="default">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="primary" size="default">
                    Connect All
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
