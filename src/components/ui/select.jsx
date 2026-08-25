"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring, exitFallbackMs } from "@/lib/springs";
import { useProximityHover } from "@/hooks/use-proximity-hover";
import { SizeProvider, useSize } from "@/lib/size-context";

const selectionAckMs = 240;

const SelectContext = createContext(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx)
    throw new Error("Select compound components must be inside <Select>");
  return ctx;
}

const SelectContentContext = createContext(null);

function collectSelectItems(node, out = []) {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props;
    if (typeof props.value === "string") {
      out.push({
        value: props.value,
        label:
          typeof props.children === "string" ? props.children : props.value,
      });
    } else if (props.children) {
      collectSelectItems(props.children, out);
    }
  });
  return out;
}

function Select({
  children,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  required,
  size,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const actionsRef = useRef(null);
  const currentValue = value !== undefined ? value : internalValue;

  const items = useMemo(() => collectSelectItems(children), [children]);

  const handleValueChange = useCallback(
    (next) => {
      const v = next ?? "";
      if (value === undefined) setInternalValue(v);
      onValueChange?.(v);
    },
    [value, onValueChange]
  );

  const ackTimeoutRef = useRef(null);
  const cancelAckClose = useCallback(() => {
    if (ackTimeoutRef.current !== null) {
      clearTimeout(ackTimeoutRef.current);
      ackTimeoutRef.current = null;
    }
  }, []);
  useEffect(() => cancelAckClose, [cancelAckClose]);

  const handleOpenChange = useCallback(
    (nextOpen, eventDetails) => {
      if (!nextOpen && eventDetails.reason === "item-press") {
        cancelAckClose();
        ackTimeoutRef.current = window.setTimeout(() => {
          ackTimeoutRef.current = null;
          setOpen(false);
        }, selectionAckMs);
        return;
      }
      cancelAckClose();
      setOpen(nextOpen);
    },
    [cancelAckClose]
  );

  const ctx = useMemo(
    () => ({ value: currentValue, open, actionsRef }),
    [currentValue, open]
  );

  const root = (
    <SelectContext.Provider value={ctx}>
      <SelectPrimitive.Root
        value={currentValue === "" ? null : currentValue}
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={handleOpenChange}
        actionsRef={actionsRef}
        items={items}
        disabled={disabled}
        name={name}
        required={required}
        modal={false}
      >
        {children}
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  );

  return size ? <SizeProvider size={size}>{root}</SizeProvider> : root;
}

Select.displayName = "Select";

// ---------------------------------------------------------------------------
// SelectTrigger
// ---------------------------------------------------------------------------

const triggerVariants = cva(
  "group inline-flex items-center justify-between border text-sm font-medium transition-colors cursor-pointer select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-hairline bg-canvas text-ink hover:border-ink/40 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark dark:focus:border-brand-accent",
        card: "border-hairline bg-surface-card text-ink hover:border-ink/40 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 dark:bg-surface-dark dark:border-hairline dark:text-on-dark",
        ghost:
          "border-transparent bg-transparent text-ink hover:bg-surface-soft focus:bg-surface-soft dark:text-on-dark dark:hover:bg-surface-dark",
      },
      size: {
        compact: "h-8 px-2.5 text-xs rounded-lg min-w-[120px]",
        default: "h-10 px-3 text-sm rounded-lg min-w-[160px]",
        lg: "h-12 px-4 text-base rounded-xl min-w-[180px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SelectTrigger = forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      icon: Icon,
      placeholder = "Select an option…",
      label,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1.5 text-left">
        {label && (
          <label className="text-muted-text dark:text-on-dark-soft text-xs font-medium">
            {label}
          </label>
        )}
        <SelectPrimitive.Trigger
          ref={ref}
          aria-invalid={!!error || undefined}
          className={cn(
            triggerVariants({ variant, size }),
            error &&
              "border-error focus:border-error focus:ring-error/20 dark:border-rose-500",
            className
          )}
          {...props}
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {Icon && (
              <Icon className="text-muted-text group-hover:text-ink dark:text-on-dark-soft size-4 shrink-0 transition-colors" />
            )}
            <SelectPrimitive.Value
              placeholder={placeholder}
              className="data-[placeholder]:text-muted-text dark:data-[placeholder]:text-on-dark-soft/60 min-w-0 flex-1 truncate text-left"
            />
          </span>

          <ChevronDown className="text-muted-text group-hover:text-ink dark:text-on-dark-soft size-4 shrink-0 transition-colors" />
        </SelectPrimitive.Trigger>
        {error && (
          <span className="text-error text-xs font-medium dark:text-rose-400">
            {error}
          </span>
        )}
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

// ---------------------------------------------------------------------------
// SelectContent
// ---------------------------------------------------------------------------

const SelectContent = forwardRef(
  ({ className, children, sideOffset = 6 }, ref) => {
    const { open, value, actionsRef } = useSelectContext();
    const containerRef = useRef(null);

    const {
      activeIndex,
      setActiveIndex,
      itemRects,
      isMeasured,
      sessionRef,
      handlers,
      registerItem,
      remeasure,
    } = useProximityHover(containerRef);

    const [focusedIndex, setFocusedIndex] = useState(null);
    const [checkedIndex, setCheckedIndex] = useState(undefined);

    useEffect(() => {
      if (open) return;
      const id = setTimeout(
        () => actionsRef.current?.unmount(),
        exitFallbackMs(spring.fast)
      );
      return () => clearTimeout(id);
    }, [open, actionsRef]);

    useEffect(() => {
      if (!open) return;
      remeasure();
    }, [open, remeasure]);

    useEffect(() => {
      if (!open) return;
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const items = Array.from(
              container.querySelectorAll("[data-proximity-index]")
            );
            const idx = items.findIndex(
              (el) => el.getAttribute("data-value") === value
            );
            setCheckedIndex(idx !== -1 ? idx : undefined);
          }
        });
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, [open, value]);

    useEffect(() => {
      if (open) return;
      setCheckedIndex(undefined);
      setActiveIndex(null);
      setFocusedIndex(null);
    }, [open, setActiveIndex]);

    const activeRect =
      isMeasured && activeIndex !== null ? itemRects[activeIndex] : null;
    const checkedRect =
      isMeasured && checkedIndex != null ? itemRects[checkedIndex] : null;
    const focusRect =
      isMeasured && focusedIndex !== null ? itemRects[focusedIndex] : null;

    const contentCtx = useMemo(
      () => ({ registerItem, activeIndex, checkedIndex }),
      [registerItem, activeIndex, checkedIndex]
    );

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={sideOffset}
          alignItemWithTrigger={false}
          className="z-50 outline-none"
        >
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
            animate={
              open
                ? { opacity: 1, y: 0, scaleY: 1 }
                : { opacity: 0, y: -4, scaleY: 0.96 }
            }
            transition={open ? spring.fast : spring.fast.exit}
            style={{ transformOrigin: "top center" }}
            onAnimationComplete={() => {
              if (!open) actionsRef.current?.unmount();
            }}
          >
            <SelectContentContext.Provider value={contentCtx}>
              <SelectPrimitive.Popup
                render={(popupProps) => (
                  <div
                    {...popupProps}
                    ref={(node) => {
                      containerRef.current = node;
                      if (typeof ref === "function") ref(node);
                      else if (ref) ref.current = node;
                    }}
                    onMouseEnter={() => {
                      handlers.onMouseEnter();
                      setFocusedIndex(null);
                    }}
                    onMouseMove={handlers.onMouseMove}
                    onMouseLeave={handlers.onMouseLeave}
                    onFocus={(e) => {
                      const indexAttr = e.target
                        .closest("[data-proximity-index]")
                        ?.getAttribute("data-proximity-index");
                      if (indexAttr != null) {
                        const idx = Number(indexAttr);
                        setActiveIndex(idx);
                        setFocusedIndex(
                          e.target.matches(":focus-visible") ? idx : null
                        );
                      }
                    }}
                    onBlur={(e) => {
                      if (containerRef.current?.contains(e.relatedTarget))
                        return;
                      setFocusedIndex(null);
                      setActiveIndex(null);
                    }}
                    className={cn(
                      "bg-canvas text-ink border-hairline shadow-card dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark relative flex max-h-[min(320px,var(--available-height))] min-w-[var(--anchor-width)] flex-col gap-0.5 overflow-y-auto rounded-xl border p-1.5 outline-none select-none",
                      className
                    )}
                  >
                    {/* Selected background */}
                    {open && (
                      <AnimatePresence>
                        {checkedRect && (
                          <motion.div
                            className="bg-surface-soft dark:bg-surface-dark pointer-events-none absolute rounded-md"
                            initial={false}
                            animate={{
                              top: checkedRect.top,
                              left: checkedRect.left,
                              width: checkedRect.width,
                              height: checkedRect.height,
                              opacity: 1,
                            }}
                            exit={{
                              opacity: 0,
                              transition: spring.moderate.exit,
                            }}
                            transition={{
                              ...spring.moderate,
                              opacity: { duration: 0.08 },
                            }}
                          />
                        )}
                      </AnimatePresence>
                    )}

                    {/* Hover background */}
                    {open && (
                      <AnimatePresence>
                        {activeRect && (
                          <motion.div
                            key={sessionRef.current}
                            className="bg-surface-soft/80 dark:bg-surface-dark/70 pointer-events-none absolute rounded-md"
                            initial={{
                              opacity: 0,
                              top: activeRect.top,
                              left: activeRect.left,
                              width: activeRect.width,
                              height: activeRect.height,
                            }}
                            animate={{
                              opacity: 1,
                              top: activeRect.top,
                              left: activeRect.left,
                              width: activeRect.width,
                              height: activeRect.height,
                            }}
                            exit={{ opacity: 0, transition: spring.fast.exit }}
                            transition={{
                              ...spring.fast,
                              opacity: { duration: 0.08 },
                            }}
                          />
                        )}
                      </AnimatePresence>
                    )}

                    {/* Focus ring */}
                    {open && (
                      <AnimatePresence>
                        {focusRect && (
                          <motion.div
                            className="border-brand-accent ring-brand-accent/25 pointer-events-none absolute z-20 rounded-md border ring-2"
                            initial={false}
                            animate={{
                              left: focusRect.left - 1,
                              top: focusRect.top - 1,
                              width: focusRect.width + 2,
                              height: focusRect.height + 2,
                            }}
                            exit={{ opacity: 0, transition: spring.fast.exit }}
                            transition={{
                              ...spring.fast,
                              opacity: { duration: 0.08 },
                            }}
                          />
                        )}
                      </AnimatePresence>
                    )}

                    {children}
                  </div>
                )}
              />
            </SelectContentContext.Provider>
          </motion.div>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    );
  }
);

SelectContent.displayName = "SelectContent";

// ---------------------------------------------------------------------------
// SelectItem
// ---------------------------------------------------------------------------

const SelectItem = forwardRef(
  (
    {
      className,
      children,
      icon: Icon,
      value,
      index,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const selectCtx = useSelectContext();
    const contentCtx = useContext(SelectContentContext);
    const internalRef = useRef(null);

    const registerItem = contentCtx?.registerItem;
    useEffect(() => {
      if (!registerItem) return;
      registerItem(index, internalRef.current);
      return () => registerItem(index, null);
    }, [index, registerItem]);

    const isActive = contentCtx?.activeIndex === index;
    const isChecked = selectCtx.value === value;

    return (
      <SelectPrimitive.Item
        value={value}
        disabled={disabled}
        label={typeof children === "string" ? children : undefined}
        render={
          <div
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            data-proximity-index={index}
            data-value={value}
            className={cn(
              "relative z-10 flex h-8.5 w-full shrink-0 cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-xs font-medium transition-colors outline-none select-none",
              isChecked || isActive
                ? "bg-surface-soft text-ink dark:bg-surface-dark dark:text-on-dark"
                : "text-muted-text hover:bg-surface-soft hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark dark:hover:text-on-dark",
              disabled && "pointer-events-none cursor-not-allowed opacity-45",
              className
            )}
            {...props}
          />
        }
      >
        {Icon && (
          <Icon
            className={cn(
              "size-4 shrink-0 transition-colors",
              isChecked || isActive
                ? "text-ink dark:text-on-dark"
                : "text-muted-text dark:text-on-dark-soft"
            )}
          />
        )}

        <SelectPrimitive.ItemText
          render={
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-left",
                isChecked
                  ? "text-ink dark:text-on-dark font-medium"
                  : "font-medium"
              )}
            />
          }
        >
          {children}
        </SelectPrimitive.ItemText>

        <span
          aria-hidden
          className="flex size-4 shrink-0 items-center justify-center"
        >
          <AnimatePresence>
            {isChecked && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className="text-ink dark:text-on-dark"
              >
                <Check className="size-3.5 stroke-[2.5]" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </SelectPrimitive.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

// ---------------------------------------------------------------------------
// SelectGroup + SelectLabel + SelectSeparator
// ---------------------------------------------------------------------------

function SelectGroup({ children, className, ...props }) {
  return (
    <div role="group" className={className} {...props}>
      {children}
    </div>
  );
}

SelectGroup.displayName = "SelectGroup";

const SelectLabel = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-muted-text dark:text-on-dark-soft shrink-0 px-2.5 py-1.5 text-[11px] font-medium tracking-wider uppercase select-none",
        className
      )}
      {...props}
    />
  );
});

SelectLabel.displayName = "SelectLabel";

const SelectSeparator = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      "bg-hairline dark:bg-hairline -mx-1 my-1 h-px shrink-0",
      className
    )}
    {...props}
  />
));

SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  triggerVariants,
};
export default Select;
