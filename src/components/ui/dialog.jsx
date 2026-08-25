"use client";

import { forwardRef } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/springs";
import { useSizeVariant } from "@/lib/size-context";
import { Button } from "@/components/ui/button";

function Dialog({ children, open, defaultOpen, onOpenChange, modal = true }) {
  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
      modal={modal}
    >
      {children}
    </DialogPrimitive.Root>
  );
}

const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const dialogVariants = cva(
  "fixed top-1/2 left-1/2 z-50 border shadow-card focus:outline-none flex flex-col box-border",
  {
    variants: {
      variant: {
        // 1. Default Canvas (from design.md: background canvas #ffffff with hairline border)
        default:
          "border-hairline bg-canvas text-ink dark:border-hairline dark:bg-surface-dark dark:text-on-dark",
        canvas:
          "border-hairline bg-canvas text-ink dark:border-hairline dark:bg-surface-dark dark:text-on-dark",

        // 2. Surface Card (from design.md: surface-card #f5f5f5)
        surface:
          "border-hairline bg-surface-card text-ink dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark",
        card: "border-hairline bg-surface-card text-ink dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark",

        // 3. Dark / Inverse Surface (from design.md: surface-dark #101010)
        inverse:
          "border-hairline bg-surface-dark text-on-dark shadow-card dark:bg-surface-dark-elevated",
        dark: "border-hairline bg-surface-dark text-on-dark shadow-card dark:bg-surface-dark-elevated",
      },
      size: {
        sm: "w-[min(calc(100vw-2rem),380px)] p-5", // ~380px
        default: "w-[min(calc(100vw-2rem),480px)] p-6", // ~480px standard modal
        md: "w-[min(calc(100vw-2rem),520px)] p-6", // ~520px
        lg: "w-[min(calc(100vw-2rem),640px)] p-7", // ~640px
        xl: "w-[min(calc(100vw-2rem),800px)] p-8", // ~800px
        full: "w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] p-6 overflow-y-auto",
      },
      shape: {
        default: "rounded-xl", // 16px from design.md: rounded.xl
        lg: "rounded-lg", // 12px
        xl: "rounded-xl", // 16px
        md: "rounded-md", // 8px
        full: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

const DialogContent = forwardRef(
  (
    {
      className,
      children,
      variant = "default",
      size = "default",
      shape = "default",
      showCloseButton = true,
      container,
      ...props
    },
    ref
  ) => {
    const contextSize = useSizeVariant();
    const resolvedSize =
      size === "default" && contextSize === "compact" ? "sm" : size;

    return (
      <DialogPrimitive.Portal container={container ?? undefined}>
        <DialogPrimitive.Backdrop
          render={(backdropProps, state) => {
            const exiting = state.transitionStatus === "ending";
            const {
              style: _style,
              onDrag: _onDrag,
              onDragStart: _onDragStart,
              onDragEnd: _onDragEnd,
              onAnimationStart: _onAnimationStart,
              onAnimationEnd: _onAnimationEnd,
              onAnimationIteration: _onAnimationIteration,
              ...rest
            } = backdropProps;
            return (
              <motion.div
                {...rest}
                className={cn(
                  container ? "absolute" : "fixed",
                  "inset-0 z-50 bg-black/45 backdrop-blur-[2px] dark:bg-black/75"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: exiting ? 0 : 1 }}
                transition={exiting ? spring.slow.exit : spring.slow}
              />
            );
          }}
        />
        <DialogPrimitive.Popup
          ref={ref}
          render={(popupProps, state) => {
            const exiting = state.transitionStatus === "ending";
            const {
              style: baseStyle,
              onDrag: _onDrag,
              onDragStart: _onDragStart,
              onDragEnd: _onDragEnd,
              onAnimationStart: _onAnimationStart,
              onAnimationEnd: _onAnimationEnd,
              onAnimationIteration: _onAnimationIteration,
              ...rest
            } = popupProps;
            return (
              <motion.div
                {...rest}
                {...props}
                className={cn(
                  dialogVariants({ variant, size: resolvedSize, shape }),
                  className
                )}
                style={{
                  ...baseStyle,
                  ...props.style,
                }}
                initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "-50%" }}
                animate={{
                  opacity: exiting ? 0 : 1,
                  scale: exiting ? 0.96 : 1,
                  x: "-50%",
                  y: "-50%",
                }}
                transition={exiting ? spring.moderate.exit : spring.moderate}
              >
                {children}

                {showCloseButton && (
                  <DialogPrimitive.Close
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-text hover:text-ink dark:text-on-dark-soft dark:hover:text-on-dark absolute top-3.5 right-3.5 cursor-pointer"
                        aria-label="Close dialog"
                      >
                        <X className="size-4" />
                      </Button>
                    }
                  />
                )}
              </motion.div>
            );
          }}
        />
      </DialogPrimitive.Portal>
    );
  }
);

DialogContent.displayName = "DialogContent";

function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn("mb-4 flex w-full flex-col gap-1.5 text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "border-hairline mt-6 flex w-full flex-row items-center justify-end gap-2.5 pt-4",
        className
      )}
      {...props}
    />
  );
}

const DialogTitle = forwardRef(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-title-md text-ink dark:text-on-dark text-left font-sans leading-snug font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        "text-body-sm text-muted-text dark:text-on-dark-soft text-left leading-relaxed",
        className
      )}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogVariants,
};
