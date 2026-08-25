import { cloneElement, isValidElement } from "react";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center border font-sans font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 select-none [&>svg]:pointer-events-none [&>svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 1. Core Brand & Surfaces (from design.md)
        default:
          "border-transparent bg-primary text-on-primary shadow-subtle [a]:hover:bg-primary-active dark:bg-canvas dark:text-ink",
        primary:
          "border-transparent bg-primary text-on-primary shadow-subtle [a]:hover:bg-primary-active dark:bg-canvas dark:text-ink",
        secondary:
          "border-transparent bg-surface-card text-ink [a]:hover:bg-surface-strong dark:bg-surface-dark-elevated dark:text-on-dark",
        surface:
          "border-hairline bg-surface-card text-ink [a]:hover:bg-surface-strong dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark",
        canvas:
          "border-hairline bg-canvas text-muted-text [a]:hover:bg-surface-soft [a]:hover:text-ink dark:border-hairline dark:bg-surface-dark dark:text-on-dark-soft",
        outline:
          "border-hairline bg-transparent text-ink [a]:hover:bg-surface-soft dark:border-hairline dark:text-on-dark dark:hover:bg-surface-dark-elevated",
        "outline-muted":
          "border-hairline-soft bg-transparent text-muted-text [a]:hover:bg-surface-soft [a]:hover:text-ink dark:border-hairline dark:text-on-dark-soft",
        ghost:
          "border-transparent bg-transparent text-muted-text hover:bg-surface-soft hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark-elevated dark:hover:text-on-dark",
        link: "border-transparent bg-transparent text-ink underline-offset-4 hover:underline dark:text-on-dark",
        inverse:
          "border-transparent bg-surface-dark text-on-dark [a]:hover:bg-surface-dark-elevated dark:bg-canvas dark:text-ink",
        dark: "border-transparent bg-surface-dark text-on-dark [a]:hover:bg-surface-dark-elevated dark:bg-canvas dark:text-ink",

        // 2. Brand Accent (from design.md: brand-accent #3b82f6)
        accent:
          "border-transparent bg-brand-accent text-white shadow-subtle [a]:hover:bg-brand-accent/90",
        brand:
          "border-transparent bg-brand-accent text-white shadow-subtle [a]:hover:bg-brand-accent/90",
        "brand-accent":
          "border-transparent bg-brand-accent text-white shadow-subtle [a]:hover:bg-brand-accent/90",
        "accent-subtle":
          "border-brand-accent/25 bg-brand-accent/10 text-brand-accent [a]:hover:bg-brand-accent/20 dark:border-brand-accent/35 dark:bg-brand-accent/20 dark:text-blue-400",
        "brand-subtle":
          "border-brand-accent/25 bg-brand-accent/10 text-brand-accent [a]:hover:bg-brand-accent/20 dark:border-brand-accent/35 dark:bg-brand-accent/20 dark:text-blue-400",

        // 3. Semantic Statuses (from design.md: success, warning, error)
        success:
          "border-success/30 bg-success/10 text-emerald-700 [a]:hover:bg-success/20 dark:border-success/35 dark:bg-success/20 dark:text-emerald-400",
        "success-subtle":
          "border-success/30 bg-success/10 text-emerald-700 [a]:hover:bg-success/20 dark:border-success/35 dark:bg-success/20 dark:text-emerald-400",
        "success-solid":
          "border-transparent bg-success text-white shadow-subtle [a]:hover:bg-success/90",

        warning:
          "border-warning/30 bg-warning/10 text-amber-700 [a]:hover:bg-warning/20 dark:border-warning/35 dark:bg-warning/20 dark:text-amber-400",
        "warning-subtle":
          "border-warning/30 bg-warning/10 text-amber-700 [a]:hover:bg-warning/20 dark:border-warning/35 dark:bg-warning/20 dark:text-amber-400",
        "warning-solid":
          "border-transparent bg-warning text-white shadow-subtle [a]:hover:bg-warning/90",

        destructive:
          "border-error/30 bg-error/10 text-rose-700 [a]:hover:bg-error/20 dark:border-error/35 dark:bg-error/20 dark:text-rose-400",
        "destructive-subtle":
          "border-error/30 bg-error/10 text-rose-700 [a]:hover:bg-error/20 dark:border-error/35 dark:bg-error/20 dark:text-rose-400",
        "destructive-solid":
          "border-transparent bg-error text-white shadow-subtle [a]:hover:bg-error/90",

        error:
          "border-error/30 bg-error/10 text-rose-700 [a]:hover:bg-error/20 dark:border-error/35 dark:bg-error/20 dark:text-rose-400",
        "error-subtle":
          "border-error/30 bg-error/10 text-rose-700 [a]:hover:bg-error/20 dark:border-error/35 dark:bg-error/20 dark:text-rose-400",
        "error-solid":
          "border-transparent bg-error text-white shadow-subtle [a]:hover:bg-error/90",

        info: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent [a]:hover:bg-brand-accent/20 dark:border-brand-accent/35 dark:bg-brand-accent/20 dark:text-blue-400",
        "info-subtle":
          "border-brand-accent/30 bg-brand-accent/10 text-brand-accent [a]:hover:bg-brand-accent/20 dark:border-brand-accent/35 dark:bg-brand-accent/20 dark:text-blue-400",
        "info-solid":
          "border-transparent bg-brand-accent text-white shadow-subtle [a]:hover:bg-brand-accent/90",

        // 4. Badge Pastels (from design.md section 29 & 199: orange, pink, violet, emerald)
        "badge-orange":
          "border-badge-orange/30 bg-badge-orange/15 text-[#c2410c] [a]:hover:bg-badge-orange/25 dark:border-badge-orange/35 dark:bg-badge-orange/25 dark:text-orange-300",
        "badge-orange-solid":
          "border-transparent bg-badge-orange text-white shadow-subtle [a]:hover:bg-badge-orange/90",
        "pastel-orange":
          "border-badge-orange/30 bg-badge-orange/15 text-[#c2410c] [a]:hover:bg-badge-orange/25 dark:border-badge-orange/35 dark:bg-badge-orange/25 dark:text-orange-300",

        "badge-pink":
          "border-badge-pink/30 bg-badge-pink/15 text-[#be185d] [a]:hover:bg-badge-pink/25 dark:border-badge-pink/35 dark:bg-badge-pink/25 dark:text-pink-300",
        "badge-pink-solid":
          "border-transparent bg-badge-pink text-white shadow-subtle [a]:hover:bg-badge-pink/90",
        "pastel-pink":
          "border-badge-pink/30 bg-badge-pink/15 text-[#be185d] [a]:hover:bg-badge-pink/25 dark:border-badge-pink/35 dark:bg-badge-pink/25 dark:text-pink-300",

        "badge-violet":
          "border-badge-violet/30 bg-badge-violet/15 text-[#6d28d9] [a]:hover:bg-badge-violet/25 dark:border-badge-violet/35 dark:bg-badge-violet/25 dark:text-violet-300",
        "badge-violet-solid":
          "border-transparent bg-badge-violet text-white shadow-subtle [a]:hover:bg-badge-violet/90",
        "pastel-violet":
          "border-badge-violet/30 bg-badge-violet/15 text-[#6d28d9] [a]:hover:bg-badge-violet/25 dark:border-badge-violet/35 dark:bg-badge-violet/25 dark:text-violet-300",

        "badge-emerald":
          "border-badge-emerald/30 bg-badge-emerald/15 text-[#047857] [a]:hover:bg-badge-emerald/25 dark:border-badge-emerald/35 dark:bg-badge-emerald/25 dark:text-emerald-300",
        "badge-emerald-solid":
          "border-transparent bg-badge-emerald text-white shadow-subtle [a]:hover:bg-badge-emerald/90",
        "pastel-emerald":
          "border-badge-emerald/30 bg-badge-emerald/15 text-[#047857] [a]:hover:bg-badge-emerald/25 dark:border-badge-emerald/35 dark:bg-badge-emerald/25 dark:text-emerald-300",
      },
      size: {
        default:
          "h-5 px-2.5 py-0.5 text-xs gap-1.5 [&>svg]:size-3 [&_svg]:size-3",
        sm: "h-4 px-1.5 py-0 text-[10px] gap-1 [&>svg]:size-2.5 [&_svg]:size-2.5",
        lg: "h-6 px-3 py-0.5 text-xs font-medium gap-1.5 [&>svg]:size-3.5 [&_svg]:size-3.5",
        pill: "h-6 px-3 py-1 text-caption gap-1.5 [&>svg]:size-3.5 [&_svg]:size-3.5", // design.md: 4px x 12px / caption 13px
      },
      shape: {
        pill: "rounded-full", // design.md: rounded.pill (9999px)
        full: "rounded-full",
        circular: "rounded-full",
        rounded: "rounded-xs", // design.md: rounded.xs (4px)
        xs: "rounded-xs",
        tag: "rounded-sm", // design.md: rounded.sm (6px)
        sm: "rounded-sm",
        md: "rounded-md", // design.md: rounded.md (8px)
        lg: "rounded-lg", // design.md: rounded.lg (12px)
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "pill",
    },
  }
);

function renderBadgeIcon(Icon) {
  if (!Icon) return null;
  if (isValidElement(Icon)) {
    return cloneElement(Icon, {
      className: cn(
        "shrink-0 pointer-events-none align-middle",
        Icon.props.className
      ),
      "aria-hidden": true,
    });
  }
  if (typeof Icon === "function" || typeof Icon === "object") {
    const Component = Icon;
    return (
      <Component
        className="pointer-events-none shrink-0 align-middle"
        aria-hidden="true"
      />
    );
  }
  return Icon;
}

function Badge({
  className,
  variant = "default",
  size = "default",
  shape = "pill",
  text,
  label,
  dot = false,
  dotClassName,
  icon: Icon,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  render,
  ...props
}) {
  const badgeText = text ?? label ?? children;
  const resolvedLeading = LeadingIcon || Icon;

  const content = (
    <>
      {dot && (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full bg-current opacity-85",
            dotClassName
          )}
          aria-hidden="true"
        />
      )}
      {resolvedLeading && renderBadgeIcon(resolvedLeading)}
      {badgeText !== undefined && badgeText !== null && badgeText !== "" && (
        <span>{badgeText}</span>
      )}
      {TrailingIcon && renderBadgeIcon(TrailingIcon)}
    </>
  );

  const rootClassName = cn(badgeVariants({ variant, size, shape }), className);

  return useRender({
    defaultTagName: "span",
    props: {
      ...props,
      className: rootClassName,
      children: content,
    },
    render,
    state: {
      slot: "badge",
      variant,
      size,
      shape,
    },
  });
}

export { Badge, badgeVariants };
