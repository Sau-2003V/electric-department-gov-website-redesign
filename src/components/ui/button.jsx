"use client";
import { cloneElement, forwardRef, isValidElement } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSizeVariant } from "@/lib/size-context";

const buttonVariants = cva(
  [
    "group relative isolate inline-flex flex-row items-center justify-center font-sans font-semibold whitespace-nowrap cursor-pointer select-none rounded-md",
    "transition-all duration-150 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-ring/60",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:align-middle",
  ],
  {
    variants: {
      variant: {
        // 1. Primary / Signature CTA (High-contrast CTA: dark in light mode, crisp white in dark mode)
        primary:
          "bg-primary text-on-primary shadow-subtle hover:bg-primary-active active:bg-primary-active",
        default:
          "bg-primary text-on-primary shadow-subtle hover:bg-primary-active active:bg-primary-active",

        // 2. Secondary / Canvas with hairline border (from design.md: button-secondary)
        secondary:
          "bg-canvas text-ink border border-hairline shadow-subtle hover:bg-surface-soft hover:border-hairline active:bg-surface-strong dark:bg-surface-card dark:text-ink dark:border-hairline dark:hover:bg-surface-soft dark:active:bg-surface-strong",

        // 3. Tertiary / Surface Soft Card Background
        tertiary:
          "bg-surface-card text-ink border border-transparent hover:bg-surface-soft active:bg-surface-strong dark:bg-surface-card dark:text-ink dark:hover:bg-surface-soft dark:active:bg-surface-strong",
        soft: "bg-surface-soft text-ink border border-transparent hover:bg-surface-strong active:bg-surface-strong dark:bg-surface-soft dark:text-ink dark:hover:bg-surface-strong",
        surface:
          "bg-surface-card text-ink border border-transparent hover:bg-surface-soft active:bg-surface-strong dark:bg-surface-card dark:text-ink dark:hover:bg-surface-soft dark:active:bg-surface-strong",

        // 4. Outline / Transparent with hairline border
        outline:
          "bg-transparent text-ink border border-hairline hover:bg-surface-soft hover:border-hairline active:bg-surface-card dark:text-ink dark:border-hairline dark:hover:bg-surface-soft dark:active:bg-surface-card",
        "outline-muted":
          "bg-transparent text-muted-text border border-hairline hover:bg-surface-soft hover:text-ink hover:border-hairline active:bg-surface-card dark:text-muted-text dark:border-hairline dark:hover:bg-surface-soft dark:hover:text-ink dark:active:bg-surface-card",

        // 6. Ghost / Minimal hover background
        ghost:
          "bg-transparent text-muted-text hover:bg-surface-soft hover:text-ink active:bg-surface-card dark:text-muted-text dark:hover:bg-surface-soft dark:hover:text-ink dark:active:bg-surface-card",

        // 7. Link / Inline text link (from design.md: button-text-link / text-link)
        link: "bg-transparent text-ink underline-offset-4 hover:underline active:opacity-75 dark:text-ink !h-auto !p-0 font-medium",
        "text-link":
          "bg-transparent text-ink underline-offset-4 hover:underline active:opacity-75 dark:text-ink !h-auto !p-0 font-medium",

        // 8. Brand Accent / Blue (from design.md: brand-accent #3b82f6)
        accent:
          "bg-brand-accent text-white shadow-subtle hover:bg-brand-accent/90 active:bg-brand-accent/80 focus-visible:ring-brand-accent/50 dark:bg-brand-accent dark:text-white dark:hover:bg-brand-accent/90",
        brand:
          "bg-brand-accent text-white shadow-subtle hover:bg-brand-accent/90 active:bg-brand-accent/80 focus-visible:ring-brand-accent/50 dark:bg-brand-accent dark:text-white dark:hover:bg-brand-accent/90",
        "brand-accent":
          "bg-brand-accent text-white shadow-subtle hover:bg-brand-accent/90 active:bg-brand-accent/80 focus-visible:ring-brand-accent/50 dark:bg-brand-accent dark:text-white dark:hover:bg-brand-accent/90",
        fin: "bg-brand-accent text-white shadow-subtle hover:bg-brand-accent/90 active:bg-brand-accent/80 focus-visible:ring-brand-accent/50 dark:bg-brand-accent dark:text-white dark:hover:bg-brand-accent/90",

        // 9. Accent Subtle / Brand Subtle
        "accent-subtle":
          "border border-brand-accent/25 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 active:bg-brand-accent/25 focus-visible:ring-brand-accent/40 dark:border-brand-accent/30 dark:bg-brand-accent/15 dark:text-brand-accent dark:hover:bg-brand-accent/25",
        "brand-subtle":
          "border border-brand-accent/25 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 active:bg-brand-accent/25 focus-visible:ring-brand-accent/40 dark:border-brand-accent/30 dark:bg-brand-accent/15 dark:text-brand-accent dark:hover:bg-brand-accent/25",
        "fin-subtle":
          "border border-brand-accent/25 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 active:bg-brand-accent/25 focus-visible:ring-brand-accent/40 dark:border-brand-accent/30 dark:bg-brand-accent/15 dark:text-brand-accent dark:hover:bg-brand-accent/25",

        // 10. Semantic Destructive / Error (from design.md: error #ef4444)
        destructive:
          "bg-error text-white shadow-subtle hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/50 dark:bg-error dark:text-white dark:hover:bg-error/90",
        error:
          "bg-error text-white shadow-subtle hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/50 dark:bg-error dark:text-white dark:hover:bg-error/90",
        "destructive-subtle":
          "border border-error/25 bg-error/10 text-error hover:bg-error/20 active:bg-error/25 focus-visible:ring-error/40 dark:border-error/30 dark:bg-error/15 dark:text-error dark:hover:bg-error/25",
        "error-subtle":
          "border border-error/25 bg-error/10 text-error hover:bg-error/20 active:bg-error/25 focus-visible:ring-error/40 dark:border-error/30 dark:bg-error/15 dark:text-error dark:hover:bg-error/25",
        "destructive-outline":
          "border border-error/30 bg-transparent text-error hover:bg-error/10 active:bg-error/15 focus-visible:ring-error/40 dark:border-error/40 dark:text-error dark:hover:bg-error/15",

        // 11. Semantic Success (from design.md: success #10b981)
        success:
          "bg-success text-white shadow-subtle hover:bg-success/90 active:bg-success/80 focus-visible:ring-success/50 dark:bg-success dark:text-white dark:hover:bg-success/90",
        "success-subtle":
          "border border-success/25 bg-success/10 text-success hover:bg-success/20 active:bg-success/25 focus-visible:ring-success/40 dark:border-success/30 dark:bg-success/15 dark:text-success dark:hover:bg-success/25",

        // 12. Semantic Warning (from design.md: warning #f59e0b)
        warning:
          "bg-warning text-white shadow-subtle hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-warning/50 dark:bg-warning dark:text-white dark:hover:bg-warning/90",
        "warning-subtle":
          "border border-warning/25 bg-warning/10 text-warning hover:bg-warning/20 active:bg-warning/25 focus-visible:ring-warning/40 dark:border-warning/30 dark:bg-warning/15 dark:text-warning dark:hover:bg-warning/25",

        // 13. Badge Pastels (from design.md section 29: badge-orange, badge-pink, badge-violet, badge-emerald)
        "badge-orange":
          "border border-badge-orange/30 bg-badge-orange/15 text-[#c2410c] hover:bg-badge-orange/25 active:bg-badge-orange/30 dark:bg-badge-orange/20 dark:text-badge-orange dark:border-badge-orange/40 dark:hover:bg-badge-orange/30",
        "badge-pink":
          "border border-badge-pink/30 bg-badge-pink/15 text-[#be185d] hover:bg-badge-pink/25 active:bg-badge-pink/30 dark:bg-badge-pink/20 dark:text-badge-pink dark:border-badge-pink/40 dark:hover:bg-badge-pink/30",
        "badge-violet":
          "border border-badge-violet/30 bg-badge-violet/15 text-[#6d28d9] hover:bg-badge-violet/25 active:bg-badge-violet/30 dark:bg-badge-violet/20 dark:text-badge-violet dark:border-badge-violet/40 dark:hover:bg-badge-violet/30",
        "badge-emerald":
          "border border-badge-emerald/30 bg-badge-emerald/15 text-[#047857] hover:bg-badge-emerald/25 active:bg-badge-emerald/30 dark:bg-badge-emerald/20 dark:text-badge-emerald dark:border-badge-emerald/40 dark:hover:bg-badge-emerald/30",

        // 14. Inverse / Dark Surface (from design.md: surface-dark #101010)
        inverse:
          "bg-surface-dark text-on-dark hover:bg-surface-dark-elevated active:bg-surface-dark-elevated/90 shadow-subtle dark:bg-surface-soft dark:text-ink dark:border dark:border-hairline dark:hover:bg-surface-strong",
        dark: "bg-surface-dark text-on-dark hover:bg-surface-dark-elevated active:bg-surface-dark-elevated/90 shadow-subtle dark:bg-surface-soft dark:text-ink dark:border dark:border-hairline dark:hover:bg-surface-strong",
        "surface-dark":
          "bg-surface-dark text-on-dark hover:bg-surface-dark-elevated active:bg-surface-dark-elevated/90 shadow-subtle dark:bg-surface-soft dark:text-ink dark:border dark:border-hairline dark:hover:bg-surface-strong",

        // 15. Nav-Pill-Group / Category Tab (from design.md: category-tab)
        tab: "bg-transparent text-muted-text hover:text-ink active:bg-canvas active:text-ink data-[state=active]:bg-canvas data-[state=active]:text-ink data-[state=active]:shadow-subtle dark:data-[state=active]:bg-surface-card dark:data-[state=active]:text-ink dark:data-[state=active]:border dark:data-[state=active]:border-hairline",
        "category-tab":
          "bg-transparent text-muted-text hover:text-ink active:bg-canvas active:text-ink data-[state=active]:bg-canvas data-[state=active]:text-ink data-[state=active]:shadow-subtle dark:data-[state=active]:bg-surface-card dark:data-[state=active]:text-ink dark:data-[state=active]:border dark:data-[state=active]:border-hairline",
      },
      size: {
        // Default: 40px height, 14px Inter font (from design.md: button-primary 12px x 20px / 40px h)
        default: "h-10 px-5 py-2.5 text-sm leading-none gap-2 [&_svg]:size-4",
        md: "h-10 px-5 py-2.5 text-sm leading-none gap-2 [&_svg]:size-4",
        // Compact / Small
        compact:
          "h-8 px-3 py-1.5 text-xs leading-none gap-1.5 [&_svg]:size-3.5",
        sm: "h-8 px-3 py-1.5 text-xs leading-none gap-1.5 [&_svg]:size-3.5",
        // Large: 48px height
        lg: "h-12 px-6 py-3 text-base leading-none gap-2.5 [&_svg]:size-5",
        // Icon variants
        icon: "size-10 p-0 [&_svg]:size-4",
        "icon-compact": "size-8 p-0 [&_svg]:size-3.5",
        "icon-sm": "size-8 p-0 [&_svg]:size-3.5",
        "icon-circular": "size-9 p-0 rounded-full [&_svg]:size-4", // 36px diameter from design.md: button-icon-circular
        "icon-lg": "size-12 p-0 [&_svg]:size-5",
      },
      shape: {
        default: "rounded-md", // 8px from design.md: rounded.md
        rounded: "rounded-md",
        md: "rounded-md",
        sm: "rounded-sm", // 6px from design.md: rounded.sm
        xs: "rounded-xs", // 4px from design.md: rounded.xs
        lg: "rounded-lg", // 12px from design.md: rounded.lg
        xl: "rounded-xl", // 16px from design.md: rounded.xl
        pill: "rounded-full", // 9999px from design.md: rounded.pill
        full: "rounded-full", // 9999px / 50% from design.md: rounded.full
        circular: "rounded-full",
        tag: "rounded-sm",
        square: "rounded-none",
      },
      iconLeft: { true: "" },
      iconRight: { true: "" },
    },
    compoundVariants: [
      { size: "compact", iconLeft: true, className: "pl-2.5" },
      { size: "sm", iconLeft: true, className: "pl-2.5" },
      { size: "default", iconLeft: true, className: "pl-4" },
      { size: "md", iconLeft: true, className: "pl-4" },
      { size: "lg", iconLeft: true, className: "pl-5" },
      { size: "compact", iconRight: true, className: "pr-2.5" },
      { size: "sm", iconRight: true, className: "pr-2.5" },
      { size: "default", iconRight: true, className: "pr-4" },
      { size: "md", iconRight: true, className: "pr-4" },
      { size: "lg", iconRight: true, className: "pr-5" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
      shape: "default",
    },
  }
);

const legacySizeAliases = {
  sm: "sm",
  compact: "compact",
  md: "default",
  default: "default",
  lg: "lg",
  "icon-sm": "icon-compact",
  "icon-compact": "icon-compact",
  icon: "icon",
  "icon-circular": "icon-circular",
  "icon-md": "icon",
  "icon-lg": "icon-lg",
};

const activeVariantClasses = {
  primary: "bg-primary-active text-on-primary ring-2 ring-primary/20",
  default: "bg-primary-active text-on-primary ring-2 ring-primary/20",
  secondary:
    "bg-surface-strong text-ink ring-2 ring-hairline dark:bg-surface-soft dark:ring-hairline",
  tertiary:
    "bg-surface-strong text-ink ring-2 ring-hairline dark:bg-surface-soft dark:ring-hairline",
  soft: "bg-surface-strong text-ink ring-2 ring-hairline dark:bg-surface-soft dark:ring-hairline",
  surface:
    "bg-surface-strong text-ink ring-2 ring-hairline dark:bg-surface-soft dark:ring-hairline",
  outline:
    "bg-surface-card text-ink ring-2 ring-hairline dark:bg-surface-soft dark:ring-hairline",
  "outline-muted":
    "bg-surface-card text-ink ring-2 ring-hairline dark:bg-surface-soft dark:ring-hairline",
  ghost: "bg-surface-card text-ink dark:bg-surface-soft dark:text-ink",
  link: "underline text-ink dark:text-ink",
  "text-link": "underline text-ink dark:text-ink",
  accent: "bg-brand-accent/90 ring-2 ring-brand-accent/30 text-white",
  brand: "bg-brand-accent/90 ring-2 ring-brand-accent/30 text-white",
  "brand-accent": "bg-brand-accent/90 ring-2 ring-brand-accent/30 text-white",
  fin: "bg-brand-accent/90 ring-2 ring-brand-accent/30 text-white",
  "accent-subtle":
    "bg-brand-accent/25 ring-2 ring-brand-accent/30 text-brand-accent",
  "brand-subtle":
    "bg-brand-accent/25 ring-2 ring-brand-accent/30 text-brand-accent",
  "fin-subtle":
    "bg-brand-accent/25 ring-2 ring-brand-accent/30 text-brand-accent",
  destructive: "bg-error/90 ring-2 ring-error/30 text-white",
  error: "bg-error/90 ring-2 ring-error/30 text-white",
  "destructive-subtle": "bg-error/25 ring-2 ring-error/30 text-error",
  "error-subtle": "bg-error/25 ring-2 ring-error/30 text-error",
  "destructive-outline": "bg-error/25 ring-2 ring-error/30 text-error",
  success: "bg-success/90 ring-2 ring-success/30 text-white",
  "success-subtle": "bg-success/25 ring-2 ring-success/30 text-success",
  warning: "bg-warning/90 ring-2 ring-warning/30 text-white",
  "warning-subtle": "bg-warning/25 ring-2 ring-warning/30 text-warning",
  "badge-orange":
    "bg-badge-orange/30 ring-2 ring-badge-orange/40 text-[#c2410c] dark:text-badge-orange",
  "badge-pink":
    "bg-badge-pink/30 ring-2 ring-badge-pink/40 text-[#be185d] dark:text-badge-pink",
  "badge-violet":
    "bg-badge-violet/30 ring-2 ring-badge-violet/40 text-[#6d28d9] dark:text-badge-violet",
  "badge-emerald":
    "bg-badge-emerald/30 ring-2 ring-badge-emerald/40 text-[#047857] dark:text-badge-emerald",
  inverse:
    "bg-surface-dark-elevated text-on-dark ring-2 ring-surface-strong dark:bg-surface-soft dark:text-ink",
  dark: "bg-surface-dark-elevated text-on-dark ring-2 ring-surface-strong dark:bg-surface-soft dark:text-ink",
  "surface-dark":
    "bg-surface-dark-elevated text-on-dark ring-2 ring-surface-strong dark:bg-surface-soft dark:text-ink",
  tab: "bg-canvas text-ink shadow-subtle ring-1 ring-hairline dark:bg-surface-card dark:text-ink",
  "category-tab":
    "bg-canvas text-ink shadow-subtle ring-1 ring-hairline dark:bg-surface-card dark:text-ink",
};

function renderIcon(Icon, { size, className }) {
  if (!Icon) return null;
  if (isValidElement(Icon)) {
    return cloneElement(Icon, {
      className: cn(
        "shrink-0 pointer-events-none align-middle",
        Icon.props.className
      ),
      ...(Icon.props.size || Icon.props.width || Icon.props.height
        ? {}
        : { size }),
      ...(Icon.props.strokeWidth ? {} : { strokeWidth: 2 }),
      "aria-hidden": true,
    });
  }
  if (typeof Icon === "function" || typeof Icon === "object") {
    const Component = Icon;
    return (
      <Component
        size={size}
        strokeWidth={2}
        className={cn(
          "pointer-events-none shrink-0 transition-transform duration-100 group-hover:scale-105",
          className
        )}
        aria-hidden="true"
      />
    );
  }
  return Icon;
}

const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size,
      shape = "default",
      asChild = false,
      loading = false,
      icon,
      iconPosition = "left",
      iconPlacement,
      leftIcon,
      rightIcon,
      leadingIcon,
      trailingIcon,
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

    const placement = iconPlacement || iconPosition || "left";
    const resolvedLeftIcon =
      leadingIcon || leftIcon || (icon && placement !== "right" ? icon : null);
    const resolvedRightIcon =
      trailingIcon ||
      rightIcon ||
      (icon && placement === "right" ? icon : null);

    const hasLeftIcon = Boolean(resolvedLeftIcon);
    const hasRightIcon = Boolean(resolvedRightIcon);
    const hasLabel = label !== null && label !== undefined && label !== "";

    const isIconOnly =
      resolvedSize === "icon" ||
      resolvedSize === "icon-compact" ||
      resolvedSize === "icon-lg" ||
      (!hasLabel && (hasLeftIcon || hasRightIcon));
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

    const renderedLeftIcon = hasLeftIcon
      ? renderIcon(resolvedLeftIcon, {
          size: iconSize,
          className: "transition-transform duration-100 group-hover:scale-105",
        })
      : null;

    const renderedRightIcon = hasRightIcon
      ? renderIcon(resolvedRightIcon, {
          size: iconSize,
          className: "transition-transform duration-100 group-hover:scale-105",
        })
      : null;

    const content = (
      <>
        {loading ? (
          <>
            <span className="pointer-events-none inline-flex flex-row items-center justify-center gap-[inherit] whitespace-nowrap opacity-0">
              {!isIconOnly && renderedLeftIcon}
              {hasLabel && (
                <span className="inline-flex items-center leading-none whitespace-nowrap">
                  {label}
                </span>
              )}
              {!isIconOnly && renderedRightIcon}
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
          renderedLeftIcon ||
          renderedRightIcon ||
          (isValidElement(label)
            ? renderIcon(label, { size: iconSize })
            : label)
        ) : (
          <>
            {renderedLeftIcon}
            {hasLabel && (
              <span className="inline-flex flex-row items-center justify-center gap-2 leading-none whitespace-nowrap">
                {label}
              </span>
            )}
            {renderedRightIcon}
          </>
        )}
      </>
    );

    const rootClassName = cn(
      buttonVariants({
        variant,
        size: resolvedSize,
        shape,
        iconLeft: !isIconOnly && hasLeftIcon,
        iconRight: !isIconOnly && hasRightIcon,
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
