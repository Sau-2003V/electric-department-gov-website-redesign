"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin shrink-0", {
  variants: {
    variant: {
      // 1. Core Surfaces & Monochrome
      default: "text-ink dark:text-on-dark",
      current: "text-current",
      muted: "text-muted-text dark:text-on-dark-soft",
      white: "text-white",
      inverse: "text-white",

      // 2. Brand Accent
      accent: "text-brand-accent",
      brand: "text-brand-accent",

      // 3. Semantic Statuses
      success: "text-success",
      warning: "text-warning",
      error: "text-error dark:text-rose-400",
      destructive: "text-error dark:text-rose-400",

      // 4. Design Pastels
      "badge-orange": "text-badge-orange",
      "badge-pink": "text-badge-pink",
      "badge-violet": "text-badge-violet",
      "badge-emerald": "text-badge-emerald",
    },
    size: {
      xs: "size-3 stroke-[2.5]",
      sm: "size-4 stroke-[2.2]",
      default: "size-5 stroke-[2]",
      md: "size-5 stroke-[2]",
      lg: "size-7 stroke-[2]",
      xl: "size-10 stroke-[2]",
    },
  },
  defaultVariants: {
    variant: "current",
    size: "default",
  },
});

const Spinner = forwardRef(
  (
    {
      className,
      variant = "current",
      size = "default",
      type = "ring",
      label,
      labelPosition = "right",
      center = false,
      ...props
    },
    ref
  ) => {
    // 1. Classic Smooth Ring (Apple / Cal.com signature smooth spinner)
    let spinnerIcon = (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        role="status"
        aria-label={label || "Loading"}
        className={cn(spinnerVariants({ variant, size }), className)}
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          className="opacity-20"
          strokeWidth="2.5"
        />
        <path
          d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    );

    // 2. Dots Animation Type
    if (type === "dots") {
      const dotSizes = {
        xs: "size-1",
        sm: "size-1.5",
        default: "size-2",
        md: "size-2",
        lg: "size-2.5",
        xl: "size-3.5",
      };
      const dSize = dotSizes[size] || dotSizes.default;
      const colorClass = spinnerVariants({ variant }).split(" ")[0];

      spinnerIcon = (
        <span
          ref={ref}
          role="status"
          aria-label={label || "Loading"}
          className={cn("inline-flex items-center gap-1", className)}
          {...props}
        >
          <span
            className={cn(
              "animate-pulse rounded-full bg-current",
              dSize,
              colorClass
            )}
            style={{ animationDelay: "0ms", animationDuration: "900ms" }}
          />
          <span
            className={cn(
              "animate-pulse rounded-full bg-current",
              dSize,
              colorClass
            )}
            style={{ animationDelay: "200ms", animationDuration: "900ms" }}
          />
          <span
            className={cn(
              "animate-pulse rounded-full bg-current",
              dSize,
              colorClass
            )}
            style={{ animationDelay: "400ms", animationDuration: "900ms" }}
          />
        </span>
      );
    }

    if (!label && !center) {
      return spinnerIcon;
    }

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2",
          labelPosition === "bottom" && "flex-col",
          center && "flex w-full justify-center py-6 text-center"
        )}
      >
        {spinnerIcon}
        {label && (
          <span className="text-muted-text dark:text-on-dark-soft text-xs font-medium tracking-tight">
            {label}
          </span>
        )}
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
export default Spinner;
