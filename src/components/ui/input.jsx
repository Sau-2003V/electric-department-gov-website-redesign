"use client";

import * as React from "react";
import { forwardRef, isValidElement, useId } from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSizeVariant } from "@/lib/size-context";

const inputVariants = cva(
  [
    "w-full min-w-0 font-normal outline-none transition-all duration-150 ease-out",
    "placeholder:text-ink-subtle placeholder:font-normal dark:placeholder:text-muted-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2/50 dark:disabled:bg-muted/50",
    "aria-invalid:border-semantic-error aria-invalid:ring-1 aria-invalid:ring-semantic-error aria-invalid:text-semantic-error dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40",
    "file:inline-flex file:h-6 file:border-0 file:bg-surface-2 file:text-ink file:rounded-sm file:px-2 file:py-0.5 file:text-xs file:font-medium file:cursor-pointer hover:file:bg-surface-2/80 dark:file:bg-muted dark:file:text-foreground",
  ],
  {
    variants: {
      variant: {
        // Default / Primary - White surface on cream canvas with hairline border
        default:
          "bg-surface-1 text-ink border border-hairline hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-card dark:border-border dark:text-foreground dark:focus-visible:border-ring dark:focus-visible:ring-ring/50",
        surface:
          "bg-surface-1 text-ink border border-hairline hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-card dark:border-border dark:text-foreground dark:focus-visible:border-ring dark:focus-visible:ring-ring/50",
        primary:
          "bg-surface-1 text-ink border border-hairline hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-card dark:border-border dark:text-foreground dark:focus-visible:border-ring dark:focus-visible:ring-ring/50",

        // Canvas - Cream background for white card surfaces
        canvas:
          "bg-canvas text-ink border border-hairline hover:border-hairline/80 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:bg-muted dark:border-border dark:text-foreground dark:focus-visible:border-ring dark:focus-visible:ring-ring/50",

        // Secondary / Filled - Tinted cream background
        secondary:
          "bg-surface-2 text-ink border border-transparent hover:bg-surface-2/80 focus-visible:bg-surface-1 focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:bg-muted/80 dark:border-transparent dark:text-foreground dark:focus-visible:bg-card",
        filled:
          "bg-surface-2 text-ink border border-transparent hover:bg-surface-2/80 focus-visible:bg-surface-1 focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:bg-muted/80 dark:border-transparent dark:text-foreground dark:focus-visible:bg-card",

        // Outline - Transparent background with hairline border
        outline:
          "bg-transparent text-ink border border-hairline hover:border-ink/40 focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink dark:border-border dark:text-foreground dark:hover:border-foreground/40",

        // Ghost - Completely minimal, no border until focused/hovered
        ghost:
          "bg-transparent text-ink border border-transparent hover:bg-surface-2/60 focus-visible:bg-surface-1 focus-visible:border-hairline focus-visible:ring-1 focus-visible:ring-ink dark:text-foreground dark:hover:bg-muted/50 dark:focus-visible:bg-card",

        // Accent / Fin - AI product styling with Fin Orange
        accent:
          "bg-surface-1 text-ink border border-fin-orange/40 hover:border-fin-orange/70 focus-visible:border-fin-orange focus-visible:ring-1 focus-visible:ring-fin-orange dark:bg-card dark:text-foreground",
        fin: "bg-surface-1 text-ink border border-fin-orange/40 hover:border-fin-orange/70 focus-visible:border-fin-orange focus-visible:ring-1 focus-visible:ring-fin-orange dark:bg-card dark:text-foreground",

        // Brand - Saturated Brand Blue styling
        brand:
          "bg-surface-1 text-ink border border-brand-blue/40 hover:border-brand-blue/70 focus-visible:border-brand-blue focus-visible:ring-1 focus-visible:ring-brand-blue dark:bg-card dark:text-foreground",

        // Destructive / Error styling
        destructive:
          "bg-surface-1 text-semantic-error border border-semantic-error/60 focus-visible:border-semantic-error focus-visible:ring-1 focus-visible:ring-semantic-error dark:bg-card dark:border-destructive dark:text-destructive",
        error:
          "bg-surface-1 text-semantic-error border border-semantic-error/60 focus-visible:border-semantic-error focus-visible:ring-1 focus-visible:ring-semantic-error dark:bg-card dark:border-destructive dark:text-destructive",
      },
      size: {
        default:
          "h-10 sm:h-11 px-3.5 py-2.5 text-sm sm:text-base leading-normal",
        compact: "h-8 px-2.5 py-1.5 text-xs leading-normal",
        sm: "h-8 px-2.5 py-1.5 text-xs leading-normal",
        md: "h-10 sm:h-11 px-3.5 py-2.5 text-sm sm:text-base leading-normal",
        lg: "h-12 px-4 py-3 text-base leading-normal",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-md",
        md: "rounded-md",
        xs: "rounded-xs",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        pill: "rounded-full",
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
            className="text-ink dark:text-foreground mb-1.5 block text-xs font-medium tracking-tight select-none sm:text-sm"
          >
            {label}
          </label>
        )}

        <div className="relative flex w-full items-center">
          {/* Leading Adornment */}
          {hasLeading && (
            <div
              className={cn(
                "text-ink-subtle dark:text-muted-foreground pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center justify-center",
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
                <span className="text-ink-muted text-xs font-medium select-none sm:text-sm">
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
                "text-ink-subtle dark:text-muted-foreground pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-center",
                isCompact ? "pr-2.5" : isLg ? "pr-3.5" : "pr-3"
              )}
            >
              {suffix && (
                <span className="text-ink-muted text-xs font-medium select-none sm:text-sm">
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
            className="text-semantic-error dark:text-destructive mt-1.5 flex items-center gap-1 text-xs font-medium"
          >
            {errorMessage}
          </p>
        ) : infoText ? (
          <p
            id={inputId ? `${inputId}-description` : undefined}
            className="text-ink-subtle dark:text-muted-foreground mt-1.5 text-xs"
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
