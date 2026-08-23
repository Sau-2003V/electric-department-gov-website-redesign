import Link from "next/link";
import { PhoneCall, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-headline text-ink mt-1 font-medium tracking-tight">
          Help & Emergency Support
        </h1>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
        <a href="tel:1912" className="inline-flex">
          <Button
            variant="accent"
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
            variant="secondary"
            size="default"
            shape="md"
            leftIcon={<AlertCircle className="size-4" />}
            className="transition-transform active:scale-[0.96]"
          >
            <span>Report Hazard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
