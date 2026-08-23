import Link from "next/link";
import { PhoneCall, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplaintsHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-headline text-ink font-medium tracking-tight">
          Complaints
        </h1>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
        <a href="tel:1912" className="inline-flex">
          <Button
            variant="secondary"
            size="default"
            shape="md"
            leftIcon={<PhoneCall className="size-4" />}
            className="transition-transform active:scale-[0.96]"
          >
            <span>Emergency 1912</span>
          </Button>
        </a>

        <Link href="/complaints/new" className="inline-flex">
          <Button
            variant="accent"
            size="default"
            shape="md"
            leftIcon={<Plus className="size-4" strokeWidth={2.2} />}
            className="transition-transform active:scale-[0.96]"
          >
            <span>File New Complaint</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
