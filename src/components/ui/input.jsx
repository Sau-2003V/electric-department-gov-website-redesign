"use client";

import * as React from "react";
import { forwardRef, isValidElement, useId } from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSizeVariant } from "@/lib/size-context";

const inputVariants = cva(
  [
    "w-full min-w-0 font-sans font-normal outline-none transition-all duration-150 ease-out",
    "placeholder:text-muted-soft placeholder:font-normal dark:placeholder:text-on-dark-soft",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-card/60 dark:disabled:bg-surface-dark-elevated/60",
    "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/25 dark:aria-invalid:border-error dark:aria-invalid:ring-error/30",
    "file:inline-flex file:h-6 file:border-0 file:bg-surface-card file:text-ink file:rounded-sm file:px-2 file:py-0.5 file:text-xs file:font-medium file:cursor-pointer hover:file:bg-surface-strong dark:file:bg-surface-dark-elevated dark:file:text-on-dark",
  ],
  {
    variants: {
      variant: {
        // 1. Primary & Canvas (from design.md: text-input with canvas #ffffff & hairline #e5e7eb)
        default:
          "bg-canvas text-ink border border-hairline shadow-subtle hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark dark:border-hairline dark:text-on-dark dark:focus-visible:border-ring dark:focus-visible:ring-1 dark:focus-visible:ring-ring",
        primary:
          "bg-canvas text-ink border border-hairline shadow-subtle hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark dark:border-hairline dark:text-on-dark dark:focus-visible:border-ring dark:focus-visible:ring-1 dark:focus-visible:ring-ring",
        canvas:
          "bg-canvas text-ink border border-hairline shadow-subtle hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark dark:border-hairline dark:text-on-dark dark:focus-visible:border-ring dark:focus-visible:ring-1 dark:focus-visible:ring-ring",

        // 2. Surface Card - Light gray surface for cards and nested dialogs
        surface:
          "bg-surface-card text-ink border border-hairline shadow-subtle hover:border-surface-strong focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark dark:focus-visible:border-ring dark:focus-visible:ring-1 dark:focus-visible:ring-ring",
        card: "bg-surface-card text-ink border border-hairline shadow-subtle hover:border-surface-strong focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark dark:focus-visible:border-ring dark:focus-visible:ring-1 dark:focus-visible:ring-ring",

        // 3. Secondary / Filled / Soft
        secondary:
          "bg-surface-soft text-ink border border-transparent hover:bg-surface-card focus-visible:bg-canvas focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark-elevated dark:border-transparent dark:text-on-dark dark:focus-visible:bg-surface-dark",
        filled:
          "bg-surface-soft text-ink border border-transparent hover:bg-surface-card focus-visible:bg-canvas focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark-elevated dark:border-transparent dark:text-on-dark dark:focus-visible:bg-surface-dark",
        soft: "bg-surface-soft text-ink border border-transparent hover:bg-surface-card focus-visible:bg-canvas focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:bg-surface-dark-elevated dark:border-transparent dark:text-on-dark dark:focus-visible:bg-surface-dark",

        // 4. Outline - Transparent background with hairline border
        outline:
          "bg-transparent text-ink border border-hairline hover:border-ink/40 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:border-hairline dark:text-on-dark dark:hover:border-hairline-soft",

        // 5. Ghost - Completely minimal, no border until focused/hovered
        ghost:
          "bg-transparent text-ink border border-transparent hover:bg-surface-card focus-visible:bg-canvas focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:text-on-dark dark:hover:bg-surface-dark-elevated",

        // 6. Brand Accent (from design.md: brand-accent #3b82f6)
        accent:
          "bg-canvas text-ink border border-brand-accent/40 shadow-subtle hover:border-brand-accent/70 focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/25 dark:bg-surface-dark dark:text-on-dark",
        brand:
          "bg-canvas text-ink border border-brand-accent/40 shadow-subtle hover:border-brand-accent/70 focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/25 dark:bg-surface-dark dark:text-on-dark",
        "brand-accent":
          "bg-canvas text-ink border border-brand-accent/40 shadow-subtle hover:border-brand-accent/70 focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/25 dark:bg-surface-dark dark:text-on-dark",

        // 7. Semantic Statuses (from design.md: success, warning, error)
        success:
          "bg-canvas text-ink border border-success/40 shadow-subtle hover:border-success/70 focus-visible:border-success focus-visible:ring-2 focus-visible:ring-success/25 dark:bg-surface-dark dark:text-on-dark",
        warning:
          "bg-canvas text-ink border border-warning/40 shadow-subtle hover:border-warning/70 focus-visible:border-warning focus-visible:ring-2 focus-visible:ring-warning/25 dark:bg-surface-dark dark:text-on-dark",
        destructive:
          "bg-canvas text-ink border border-error/50 shadow-subtle hover:border-error/80 focus-visible:border-error focus-visible:ring-2 focus-visible:ring-error/25 dark:bg-surface-dark dark:text-on-dark",
        error:
          "bg-canvas text-ink border border-error/50 shadow-subtle hover:border-error/80 focus-visible:border-error focus-visible:ring-2 focus-visible:ring-error/25 dark:bg-surface-dark dark:text-on-dark",

        // 8. Badge Pastels (from design.md section 29)
        "badge-orange":
          "bg-canvas text-ink border border-badge-orange/50 shadow-subtle hover:border-badge-orange/80 focus-visible:border-badge-orange focus-visible:ring-2 focus-visible:ring-badge-orange/25 dark:bg-surface-dark dark:text-on-dark",
        "badge-pink":
          "bg-canvas text-ink border border-badge-pink/50 shadow-subtle hover:border-badge-pink/80 focus-visible:border-badge-pink focus-visible:ring-2 focus-visible:ring-badge-pink/25 dark:bg-surface-dark dark:text-on-dark",
        "badge-violet":
          "bg-canvas text-ink border border-badge-violet/50 shadow-subtle hover:border-badge-violet/80 focus-visible:border-badge-violet focus-visible:ring-2 focus-visible:ring-badge-violet/25 dark:bg-surface-dark dark:text-on-dark",
        "badge-emerald":
          "bg-canvas text-ink border border-badge-emerald/50 shadow-subtle hover:border-badge-emerald/80 focus-visible:border-badge-emerald focus-visible:ring-2 focus-visible:ring-badge-emerald/25 dark:bg-surface-dark dark:text-on-dark",

        // 9. Inverse / Dark Surface
        inverse:
          "bg-surface-dark text-on-dark border border-hairline shadow-subtle hover:border-hairline-soft focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white dark:bg-surface-dark-elevated",
        dark: "bg-surface-dark text-on-dark border border-hairline shadow-subtle hover:border-hairline-soft focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white dark:bg-surface-dark-elevated",
      },
      size: {
        // 40px height per design.md (text-input: 10px x 14px / 40px height)
        default: "h-10 px-3.5 py-2.5 text-sm leading-normal",
        md: "h-10 px-3.5 py-2.5 text-sm leading-normal",
        compact: "h-8 px-2.5 py-1.5 text-xs leading-normal",
        sm: "h-8 px-2.5 py-1.5 text-xs leading-normal",
        lg: "h-12 px-4 py-3 text-base leading-normal",
      },
      shape: {
        default: "rounded-md", // 8px from design.md: rounded.md
        rounded: "rounded-md",
        md: "rounded-md",
        xs: "rounded-xs", // 4px from design.md: rounded.xs
        sm: "rounded-sm", // 6px from design.md: rounded.sm
        tag: "rounded-sm",
        lg: "rounded-lg", // 12px from design.md: rounded.lg
        xl: "rounded-xl", // 16px from design.md: rounded.xl
        pill: "rounded-full", // 9999px from design.md: rounded.pill
        full: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

const legacySizeAliases = {
  sm: "compact",
  compact: "compact",
  md: "default",
  default: "default",
  lg: "lg",
};

const Input = forwardRef(
  (
    {
      className,
      wrapperClassName,
      variant = "default",
      size,
      shape = "default",
      type = "text",
      label,
      helperText,
      description,
      error,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      prefix,
      suffix,
      disabled,
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || (label ? generatedId : undefined);

    // Resolve size from prop > context > default
    const contextSize = useSizeVariant();
    const resolvedSize = size
      ? (legacySizeAliases[size] ?? size)
      : contextSize === "compact"
        ? "compact"
        : "default";

    const isCompact = resolvedSize === "compact";
    const isLg = resolvedSize === "lg";

    const hasLeading = Boolean(LeadingIcon || prefix);
    const hasTrailing = Boolean(TrailingIcon || suffix);
    const hasWrapper = Boolean(
      label ||
      helperText ||
      description ||
      error ||
      hasLeading ||
      hasTrailing ||
      wrapperClassName
    );

    const isInvalid = Boolean(error || props["aria-invalid"]);
    const errorMessage = typeof error === "string" ? error : null;
    const infoText = helperText || description;

    // Sizing for icons & padding
    const iconSizeClass = isCompact ? "size-3.5" : isLg ? "size-5" : "size-4";

    const leadingPaddingClass = isCompact
      ? prefix
        ? "!pl-7"
        : "!pl-8"
      : isLg
        ? prefix
          ? "!pl-11"
          : "!pl-11"
        : prefix
          ? "!pl-9"
          : "!pl-10";

    const trailingPaddingClass = isCompact
      ? suffix
        ? "!pr-7"
        : "!pr-8"
      : isLg
        ? suffix
          ? "!pr-11"
          : "!pr-11"
        : suffix
          ? "!pr-9"
          : "!pr-10";

    const inputElement = (
      <InputPrimitive
        ref={ref}
        id={inputId}
        type={type}
        data-slot="input"
        disabled={disabled}
        aria-invalid={isInvalid ? "true" : undefined}
        className={cn(
          inputVariants({
            variant: isInvalid ? "error" : variant,
            size: resolvedSize,
            shape,
          }),
          hasLeading && leadingPaddingClass,
          hasTrailing && trailingPaddingClass,
          className
        )}
        {...props}
      />
    );

    if (!hasWrapper) {
      return inputElement;
    }

    return (
      <div
        className={cn(
          "flex w-full flex-col",
          disabled && "opacity-50",
          wrapperClassName
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="text-ink dark:text-on-dark mb-1.5 block text-xs font-medium tracking-tight select-none sm:text-sm"
          >
            {label}
          </label>
        )}

        <div className="relative flex w-full items-center">
          {/* Leading Adornment */}
          {hasLeading && (
            <div
              className={cn(
                "text-muted-soft dark:text-on-dark-soft pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center justify-center",
                isCompact ? "pl-2.5" : isLg ? "pl-3.5" : "pl-3"
              )}
            >
              {LeadingIcon &&
                (isValidElement(LeadingIcon) ? (
                  LeadingIcon
                ) : (
                  <LeadingIcon
                    className={cn(iconSizeClass, "shrink-0")}
                    aria-hidden="true"
                  />
                ))}
              {prefix && (
                <span className="text-muted-text text-xs font-medium select-none sm:text-sm">
                  {prefix}
                </span>
              )}
            </div>
          )}

          {inputElement}

          {/* Trailing Adornment */}
          {hasTrailing && (
            <div
              className={cn(
                "text-muted-soft dark:text-on-dark-soft pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-center",
                isCompact ? "pr-2.5" : isLg ? "pr-3.5" : "pr-3"
              )}
            >
              {suffix && (
                <span className="text-muted-text text-xs font-medium select-none sm:text-sm">
                  {suffix}
                </span>
              )}
              {TrailingIcon &&
                (isValidElement(TrailingIcon) ? (
                  TrailingIcon
                ) : (
                  <TrailingIcon
                    className={cn(iconSizeClass, "shrink-0")}
                    aria-hidden="true"
                  />
                ))}
            </div>
          )}
        </div>

        {/* Error or Helper / Description Text */}
        {errorMessage ? (
          <p
            id={inputId ? `${inputId}-error` : undefined}
            className="text-error dark:text-error mt-1.5 flex items-center gap-1 text-xs font-medium"
          >
            {errorMessage}
          </p>
        ) : infoText ? (
          <p
            id={inputId ? `${inputId}-description` : undefined}
            className="text-muted-text dark:text-on-dark-soft mt-1.5 text-xs"
          >
            {infoText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
