import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all border focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        // Brand & Surface Variants
        default:
          "border-transparent bg-ink text-on-primary [a]:hover:bg-ink/90 dark:bg-primary dark:text-primary-foreground",
        primary:
          "border-transparent bg-ink text-on-primary [a]:hover:bg-ink/90 dark:bg-primary dark:text-primary-foreground",
        secondary:
          "border-transparent bg-surface-2 text-ink [a]:hover:bg-surface-2/80 dark:bg-secondary dark:text-secondary-foreground",
        surface:
          "border-hairline bg-surface-1 text-ink [a]:hover:bg-surface-2/50 dark:border-border dark:bg-card dark:text-card-foreground",
        canvas:
          "border-hairline bg-canvas text-ink-muted [a]:hover:bg-surface-2/60 dark:border-border dark:bg-muted dark:text-muted-foreground",
        outline:
          "border-hairline bg-transparent text-ink [a]:hover:bg-surface-2/40 dark:border-border dark:text-foreground dark:hover:bg-muted",
        "outline-muted":
          "border-hairline-soft bg-transparent text-ink-muted [a]:hover:bg-surface-2/30 dark:border-border dark:text-muted-foreground",
        ghost:
          "border-transparent text-ink-muted hover:bg-surface-2/60 hover:text-ink dark:text-muted-foreground dark:hover:bg-muted/50",
        link: "border-transparent text-ink underline-offset-4 hover:underline dark:text-primary",
        inverse:
          "border-inverse-surface-1 bg-inverse-canvas text-inverse-ink [a]:hover:bg-inverse-surface-1 dark:bg-foreground dark:text-background",

        // Accent & Brand Variants
        accent:
          "border-transparent bg-primary text-primary-foreground shadow-button-inset [a]:hover:opacity-90",
        "accent-subtle":
          "border-hairline bg-surface-2 text-ink [a]:hover:bg-surface-2/80",
        fin: "border-transparent bg-primary text-primary-foreground shadow-button-inset [a]:hover:opacity-90",
        "fin-subtle":
          "border-hairline bg-surface-2 text-ink [a]:hover:bg-surface-2/80",
        brand:
          "border-transparent bg-brand-blue text-white [a]:hover:bg-brand-blue/90",
        "brand-subtle":
          "border-brand-blue/20 bg-brand-blue/10 text-brand-blue [a]:hover:bg-brand-blue/20",

        // Semantic Status Variants
        success:
          "border-semantic-success/20 bg-semantic-success/10 text-semantic-success [a]:hover:bg-semantic-success/20",
        "success-solid":
          "border-transparent bg-semantic-success text-white [a]:hover:bg-semantic-success/90",
        destructive:
          "border-semantic-error/20 bg-semantic-error/10 text-semantic-error focus-visible:ring-semantic-error/20 [a]:hover:bg-semantic-error/20 dark:border-destructive/30 dark:bg-destructive/20 dark:text-destructive",
        "destructive-solid":
          "border-transparent bg-semantic-error text-white [a]:hover:bg-semantic-error/90 dark:bg-destructive dark:text-destructive-foreground",
        error:
          "border-semantic-error/20 bg-semantic-error/10 text-semantic-error focus-visible:ring-semantic-error/20 [a]:hover:bg-semantic-error/20 dark:border-destructive/30 dark:bg-destructive/20 dark:text-destructive",
        "error-solid":
          "border-transparent bg-semantic-error text-white [a]:hover:bg-semantic-error/90 dark:bg-destructive dark:text-destructive-foreground",
        warning:
          "border-report-orange/20 bg-report-orange/10 text-report-orange [a]:hover:bg-report-orange/20",
        "warning-solid":
          "border-transparent bg-report-orange text-white [a]:hover:bg-report-orange/90",
        info: "border-report-blue/20 bg-report-blue/10 text-report-blue [a]:hover:bg-report-blue/20",
        "info-solid":
          "border-transparent bg-report-blue text-white [a]:hover:bg-report-blue/90",

        // In-Product Report Palette Variants
        "report-blue":
          "border-report-blue/20 bg-report-blue/10 text-report-blue [a]:hover:bg-report-blue/20",
        "report-green":
          "border-report-green/20 bg-report-green/10 text-report-green [a]:hover:bg-report-green/20",
        "report-pink":
          "border-report-pink/20 bg-report-pink/10 text-report-pink [a]:hover:bg-report-pink/20",
        "report-lime":
          "border-report-lime/20 bg-report-lime/10 text-report-lime [a]:hover:bg-report-lime/20",
        "report-cyan":
          "border-report-cyan/20 bg-report-cyan/10 text-report-cyan [a]:hover:bg-report-cyan/20",
        "report-orange":
          "border-report-orange/20 bg-report-orange/10 text-report-orange [a]:hover:bg-report-orange/20",
      },
      size: {
        default: "h-5 px-2 py-0.5 text-xs gap-1 [&>svg]:size-3!",
        sm: "h-4 px-1.5 py-0 text-[10px] gap-0.5 [&>svg]:size-2.5!",
        lg: "h-6 px-2.5 py-0.5 text-xs gap-1.5 [&>svg]:size-3.5!",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-[4px]",
        tag: "rounded-[6px]",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "pill",
    },
  }
);

function Badge({
  className,
  variant = "default",
  size = "default",
  shape = "pill",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ variant, size, shape }), className),
      },
      props
    ),
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
