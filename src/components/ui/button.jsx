"use client";
import { cloneElement, forwardRef, isValidElement } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSizeVariant } from "@/lib/size-context";

const buttonVariants = cva(
  [
    "group relative isolate inline-flex items-center justify-center font-medium whitespace-nowrap cursor-pointer select-none rounded-md",
    "transition-all duration-150 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 dark:focus-visible:ring-ring/40",
    "active:scale-[0.98]",
    "[&>svg]:pointer-events-none [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Primary / Charcoal (Brand default)
        primary:
          "bg-ink text-on-primary shadow-xs hover:bg-ink/90 active:bg-ink/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
        default:
          "bg-ink text-on-primary shadow-xs hover:bg-ink/90 active:bg-ink/80 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",

        // Secondary / White on cream surface with hairline border
        secondary:
          "border-hairline bg-surface-1 text-ink border shadow-2xs hover:bg-surface-2 hover:border-hairline active:bg-surface-2/80 dark:border-border dark:bg-card dark:text-card-foreground dark:hover:bg-surface-2",

        // Tertiary / Soft cream background
        tertiary:
          "bg-canvas text-ink hover:bg-surface-2 active:bg-surface-2/80 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80",

        // Outline / Transparent with hairline border
        outline:
          "border-hairline bg-transparent text-ink border hover:bg-surface-2/60 active:bg-surface-2/80 dark:border-border dark:text-foreground dark:hover:bg-muted/50",

        // Ghost / Minimal hover background
        ghost:
          "bg-transparent text-ink-muted hover:bg-surface-2/60 hover:text-ink active:bg-surface-2/80 dark:text-muted-foreground dark:hover:bg-muted/50 dark:hover:text-foreground",

        // Link / Inline text underline
        link: "text-ink underline-offset-4 hover:underline active:opacity-75 dark:text-primary !h-auto !p-0 font-medium",

        // Accent / Fin AI Orange CTA
        accent:
          "bg-fin-orange text-white shadow-xs hover:bg-fin-orange/90 active:bg-fin-orange/80 focus-visible:ring-fin-orange/50",
        fin: "bg-fin-orange text-white shadow-xs hover:bg-fin-orange/90 active:bg-fin-orange/80 focus-visible:ring-fin-orange/50",

        // Accent Subtle / Tinted Orange
        "accent-subtle":
          "border-fin-orange/20 bg-fin-orange/10 text-fin-orange border hover:bg-fin-orange/20 active:bg-fin-orange/25 focus-visible:ring-fin-orange/40",
        "fin-subtle":
          "border-fin-orange/20 bg-fin-orange/10 text-fin-orange border hover:bg-fin-orange/20 active:bg-fin-orange/25 focus-visible:ring-fin-orange/40",

        // Brand Blue CTA
        brand:
          "bg-brand-blue text-white shadow-xs hover:bg-brand-blue/90 active:bg-brand-blue/80 focus-visible:ring-brand-blue/50",
        "brand-subtle":
          "border-brand-blue/20 bg-brand-blue/10 text-brand-blue border hover:bg-brand-blue/20 active:bg-brand-blue/25 focus-visible:ring-brand-blue/40",

        // Destructive / Semantic Error
        destructive:
          "bg-semantic-error text-white shadow-xs hover:bg-semantic-error/90 active:bg-semantic-error/80 focus-visible:ring-semantic-error/50 dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90",
        error:
          "bg-semantic-error text-white shadow-xs hover:bg-semantic-error/90 active:bg-semantic-error/80 focus-visible:ring-semantic-error/50 dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90",

        // Destructive Subtle / Tinted Error
        "destructive-subtle":
          "border-semantic-error/20 bg-semantic-error/10 text-semantic-error border hover:bg-semantic-error/20 active:bg-semantic-error/25 focus-visible:ring-semantic-error/40 dark:border-destructive/30",
        "error-subtle":
          "border-semantic-error/20 bg-semantic-error/10 text-semantic-error border hover:bg-semantic-error/20 active:bg-semantic-error/25 focus-visible:ring-semantic-error/40 dark:border-destructive/30",
        "destructive-outline":
          "border-semantic-error/20 bg-semantic-error/10 text-semantic-error border hover:bg-semantic-error/20 active:bg-semantic-error/25 focus-visible:ring-semantic-error/40 dark:border-destructive/30",

        // Success / Positive
        success:
          "bg-semantic-success text-white shadow-xs hover:bg-semantic-success/90 active:bg-semantic-success/80 focus-visible:ring-semantic-success/50",
        "success-subtle":
          "border-semantic-success/20 bg-semantic-success/10 text-semantic-success border hover:bg-semantic-success/20 active:bg-semantic-success/25 focus-visible:ring-semantic-success/40",

        // Inverse / Pure black on white canvas
        inverse:
          "bg-inverse-canvas text-inverse-ink hover:bg-inverse-surface-1 active:bg-inverse-surface-1/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90",
      },
      size: {
        default:
          "px-[18px] py-[10px] text-[15px] leading-[1.2] gap-2 [&_svg]:size-4",
        compact: "px-3 py-1.5 text-[12px] gap-1.5 [&_svg]:size-3.5",
        lg: "px-6 py-3 text-[16px] gap-2.5 [&_svg]:size-4.5",
        icon: "size-9 p-0 [&_svg]:size-4",
        "icon-compact": "size-7 p-0 [&_svg]:size-3.5",
        "icon-lg": "size-11 p-0 [&_svg]:size-5",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-md",
        md: "rounded-md",
        lg: "rounded-lg",
        pill: "rounded-full",
        full: "rounded-full",
        tag: "rounded-sm",
        xs: "rounded-xs",
        square: "rounded-none",
      },
      iconLeft: { true: "" },
      iconRight: { true: "" },
    },
    compoundVariants: [
      { size: "compact", iconLeft: true, className: "pl-[10px]" },
      { size: "default", iconLeft: true, className: "pl-[14px]" },
      { size: "lg", iconLeft: true, className: "pl-[18px]" },
      { size: "compact", iconRight: true, className: "pr-[10px]" },
      { size: "default", iconRight: true, className: "pr-[14px]" },
      { size: "lg", iconRight: true, className: "pr-[18px]" },
    ],
    defaultVariants: {
      variant: "primary",
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
  "icon-sm": "icon-compact",
  "icon-compact": "icon-compact",
  icon: "icon",
  "icon-md": "icon",
  "icon-lg": "icon-lg",
};

const activeVariantClasses = {
  primary: "bg-ink/80 dark:bg-primary/80 ring-2 ring-ink/20",
  default: "bg-ink/80 dark:bg-primary/80 ring-2 ring-ink/20",
  secondary: "bg-surface-2 border-hairline ring-2 ring-hairline/40",
  tertiary: "bg-surface-2 ring-2 ring-hairline/40",
  outline: "bg-surface-2/80 ring-2 ring-hairline/40",
  ghost: "bg-surface-2 text-ink dark:bg-muted",
  link: "underline",
  accent: "bg-fin-orange/85 ring-2 ring-fin-orange/30",
  fin: "bg-fin-orange/85 ring-2 ring-fin-orange/30",
  "accent-subtle": "bg-fin-orange/25 ring-2 ring-fin-orange/30",
  "fin-subtle": "bg-fin-orange/25 ring-2 ring-fin-orange/30",
  brand: "bg-brand-blue/85 ring-2 ring-brand-blue/30",
  "brand-subtle": "bg-brand-blue/25 ring-2 ring-brand-blue/30",
  destructive: "bg-semantic-error/85 ring-2 ring-semantic-error/30",
  error: "bg-semantic-error/85 ring-2 ring-semantic-error/30",
  "destructive-subtle": "bg-semantic-error/25 ring-2 ring-semantic-error/30",
  "error-subtle": "bg-semantic-error/25 ring-2 ring-semantic-error/30",
  "destructive-outline": "bg-semantic-error/25 ring-2 ring-semantic-error/30",
  success: "bg-semantic-success/85 ring-2 ring-semantic-success/30",
  "success-subtle": "bg-semantic-success/25 ring-2 ring-semantic-success/30",
  inverse: "bg-inverse-surface-1 ring-2 ring-inverse-surface-1/40",
};

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size,
      shape = "default",
      asChild = false,
      loading = false,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      active = false,
      disabled,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const asChildElement =
      asChild && isValidElement(children) ? children : null;
    const label = asChildElement ? asChildElement.props.children : children;

    // Resolve size from prop > context > default
    const contextSize = useSizeVariant();
    const resolvedSize = size
      ? (legacySizeAliases[size] ?? size)
      : contextSize === "compact"
        ? "compact"
        : "default";

    const isIconOnly =
      resolvedSize === "icon" ||
      resolvedSize === "icon-compact" ||
      resolvedSize === "icon-lg";
    const isCompact =
      resolvedSize === "compact" || resolvedSize === "icon-compact";
    const isLg = resolvedSize === "lg" || resolvedSize === "icon-lg";

    const iconSize = isCompact ? 14 : isLg ? 18 : 16;
    const spinnerSizeClass = isCompact
      ? "size-4"
      : isLg
        ? "size-5"
        : "size-4.5";

    const activeClass = active ? activeVariantClasses[variant] || "" : "";

    const content = (
      <>
        {loading ? (
          <>
            <span className="pointer-events-none flex items-center justify-center gap-[inherit] opacity-0">
              {LeadingIcon && !isIconOnly && (
                <LeadingIcon size={iconSize} strokeWidth={2} />
              )}
              {label}
              {TrailingIcon && !isIconOnly && (
                <TrailingIcon size={iconSize} strokeWidth={2} />
              )}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className={cn("animate-spin text-current", spinnerSizeClass)}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          </>
        ) : isIconOnly ? (
          <>
            {LeadingIcon ? (
              <LeadingIcon size={iconSize} strokeWidth={2} />
            ) : (
              label
            )}
          </>
        ) : (
          <>
            {LeadingIcon && (
              <LeadingIcon
                size={iconSize}
                strokeWidth={2}
                className="transition-transform duration-100 group-hover:scale-105"
              />
            )}
            <span>{label}</span>
            {TrailingIcon && (
              <TrailingIcon
                size={iconSize}
                strokeWidth={2}
                className="transition-transform duration-100 group-hover:scale-105"
              />
            )}
          </>
        )}
      </>
    );

    const rootClassName = cn(
      buttonVariants({
        variant,
        size: resolvedSize,
        shape,
        iconLeft: !isIconOnly && !!LeadingIcon,
        iconRight: !isIconOnly && !!TrailingIcon,
      }),
      activeClass,
      className
    );

    if (asChildElement) {
      const childProps = asChildElement.props;
      return cloneElement(
        asChildElement,
        {
          ...props,
          ref,
          className: cn(rootClassName, childProps.className),
          style: { ...style, ...childProps.style },
        },
        content
      );
    }

    return (
      <ButtonPrimitive
        ref={ref}
        className={rootClassName}
        disabled={disabled || loading}
        style={style}
        {...props}
      >
        {content}
      </ButtonPrimitive>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
