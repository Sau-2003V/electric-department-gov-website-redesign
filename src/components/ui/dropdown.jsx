"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@base-ui/react/menu";
import {
  DropdownContext,
  useDropdown,
  useDropdownMaybe,
} from "@/components/ui/menu-item";
import { cn } from "@/lib/utils";
import { spring, exitFallbackMs } from "@/lib/springs";
import { useProximityHover } from "@/hooks/use-proximity-hover";
import { SizeProvider, useSize } from "@/lib/size-context";

export { useDropdown, useDropdownMaybe };

const Dropdown = forwardRef(
  ({ children, checkedIndex, size, className, ...props }, ref) => {
    const containerRef = useRef(null);
    const {
      activeIndex,
      setActiveIndex,
      itemRects,
      sessionRef,
      handlers,
      registerItem,
      measureItems,
    } = useProximityHover(containerRef);

    useEffect(() => {
      measureItems();
    }, [measureItems, children]);

    const [focusedIndex, setFocusedIndex] = useState(null);

    const activeRect = activeIndex !== null ? itemRects[activeIndex] : null;
    const checkedRect = checkedIndex != null ? itemRects[checkedIndex] : null;
    const focusRect = focusedIndex !== null ? itemRects[focusedIndex] : null;

    const panel = (
      <DropdownContext.Provider
        value={{ registerItem, activeIndex, checkedIndex }}
      >
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          onMouseEnter={handlers.onMouseEnter}
          onMouseMove={handlers.onMouseMove}
          onMouseLeave={handlers.onMouseLeave}
          onFocus={(e) => {
            const indexAttr = e.target
              .closest("[data-proximity-index]")
              ?.getAttribute("data-proximity-index");
            if (indexAttr != null) {
              const idx = Number(indexAttr);
              setActiveIndex(idx);
              setFocusedIndex(e.target.matches(":focus-visible") ? idx : null);
            }
          }}
          onBlur={(e) => {
            if (containerRef.current?.contains(e.relatedTarget)) return;
            setFocusedIndex(null);
            setActiveIndex(null);
          }}
          onKeyDown={(e) => {
            const items = Array.from(
              containerRef.current?.querySelectorAll(
                '[role="menuitem"], [role="menuitemradio"]'
              ) ?? []
            );
            const currentIdx = items.indexOf(e.target);
            if (currentIdx === -1) return;

            if (
              ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(
                e.key
              )
            ) {
              e.preventDefault();
              const next = ["ArrowDown", "ArrowRight"].includes(e.key)
                ? (currentIdx + 1) % items.length
                : (currentIdx - 1 + items.length) % items.length;
              items[next].focus();
            } else if (e.key === "Home") {
              e.preventDefault();
              items[0]?.focus();
            } else if (e.key === "End") {
              e.preventDefault();
              items[items.length - 1]?.focus();
            }
          }}
          role="group"
          className={cn(
            "bg-canvas text-ink border-hairline shadow-card dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark relative flex w-64 max-w-full flex-col gap-0.5 rounded-xl border p-1.5 select-none focus:outline-none",
            className
          )}
          {...props}
        >
          {/* Selected background */}
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
                exit={{ opacity: 0, transition: spring.moderate.exit }}
                transition={{
                  ...spring.moderate,
                  opacity: { duration: 0.08 },
                }}
              />
            )}
          </AnimatePresence>

          {/* Hover background */}
          <AnimatePresence>
            {activeRect && (
              <motion.div
                key={sessionRef.current}
                className="bg-surface-soft/80 dark:bg-surface-dark/70 pointer-events-none absolute rounded-md"
                initial={{
                  opacity: 0,
                  top: checkedRect?.top ?? activeRect.top,
                  left: checkedRect?.left ?? activeRect.left,
                  width: checkedRect?.width ?? activeRect.width,
                  height: checkedRect?.height ?? activeRect.height,
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

          {/* Focus ring */}
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

          {children}
        </div>
      </DropdownContext.Provider>
    );

    return size ? <SizeProvider size={size}>{panel}</SizeProvider> : panel;
  }
);

Dropdown.displayName = "Dropdown";

const DropdownMenuContext = createContext(null);

function useDropdownMenuContext() {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx)
    throw new Error(
      "DropdownMenu compound components must be inside <DropdownMenu>"
    );
  return ctx;
}

function DropdownMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  size,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = openProp !== undefined ? openProp : internalOpen;
  const actionsRef = useRef(null);

  const handleOpenChange = useCallback(
    (next) => {
      if (openProp === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );

  const ctx = useMemo(() => ({ open, actionsRef }), [open]);

  const root = (
    <DropdownMenuContext.Provider value={ctx}>
      <Menu.Root
        open={open}
        onOpenChange={handleOpenChange}
        actionsRef={actionsRef}
        disabled={disabled}
        modal={false}
      >
        {children}
      </Menu.Root>
    </DropdownMenuContext.Provider>
  );

  return size ? <SizeProvider size={size}>{root}</SizeProvider> : root;
}

DropdownMenu.displayName = "DropdownMenu";

const DropdownTrigger = Menu.Trigger;

const DropdownContent = forwardRef(
  (
    {
      className,
      children,
      checkedIndex,
      side = "bottom",
      align = "start",
      sideOffset = 6,
    },
    ref
  ) => {
    const { open, actionsRef } = useDropdownMenuContext();
    const containerRef = useRef(null);

    const {
      activeIndex,
      setActiveIndex,
      itemRects,
      sessionRef,
      handlers,
      registerItem,
      measureItems,
    } = useProximityHover(containerRef);

    const [focusedIndex, setFocusedIndex] = useState(null);

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
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          measureItems();
        });
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }, [open, measureItems]);

    const activeRect = activeIndex !== null ? itemRects[activeIndex] : null;
    const checkedRect = checkedIndex != null ? itemRects[checkedIndex] : null;
    const focusRect = focusedIndex !== null ? itemRects[focusedIndex] : null;

    const renderMenuItem = useCallback(
      ({ radio, value, disabled, label, closeOnClick, element, children }) =>
        radio ? (
          <Menu.RadioItem
            value={value}
            disabled={disabled}
            label={label}
            closeOnClick={closeOnClick}
            render={element}
          >
            {children}
          </Menu.RadioItem>
        ) : (
          <Menu.Item
            disabled={disabled}
            label={label}
            closeOnClick={closeOnClick}
            render={element}
          >
            {children}
          </Menu.Item>
        ),
      []
    );

    const contentCtx = useMemo(
      () => ({
        registerItem,
        activeIndex,
        checkedIndex,
        inMenu: true,
        renderMenuItem,
      }),
      [registerItem, activeIndex, checkedIndex, renderMenuItem]
    );

    return (
      <Menu.Portal>
        <Menu.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="z-50 outline-none"
        >
          <motion.div
            initial={{ opacity: 0, y: side === "top" ? 4 : -4, scaleY: 0.96 }}
            animate={
              open
                ? { opacity: 1, y: 0, scaleY: 1 }
                : { opacity: 0, y: side === "top" ? 4 : -4, scaleY: 0.96 }
            }
            transition={open ? spring.fast : spring.fast.exit}
            style={{
              transformOrigin: side === "top" ? "bottom center" : "top center",
            }}
            onAnimationComplete={() => {
              if (!open) actionsRef.current?.unmount();
            }}
          >
            <DropdownContext.Provider value={contentCtx}>
              <Menu.Popup
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
                      "bg-canvas text-ink border-hairline shadow-card dark:bg-surface-dark-elevated dark:border-hairline dark:text-on-dark relative flex max-h-[min(480px,var(--available-height))] w-64 max-w-full min-w-[var(--anchor-width)] flex-col gap-0.5 overflow-y-auto rounded-xl border p-1.5 outline-none select-none",
                      className
                    )}
                  >
                    {/* Selected background */}
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

                    {/* Hover background */}
                    <AnimatePresence>
                      {activeRect && (
                        <motion.div
                          key={sessionRef.current}
                          className="bg-surface-soft/80 dark:bg-surface-dark/70 pointer-events-none absolute rounded-md"
                          initial={{
                            opacity: 0,
                            top: checkedRect?.top ?? activeRect.top,
                            left: checkedRect?.left ?? activeRect.left,
                            width: checkedRect?.width ?? activeRect.width,
                            height: checkedRect?.height ?? activeRect.height,
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

                    {/* Focus ring */}
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

                    <Menu.RadioGroup
                      value={checkedIndex ?? null}
                      className="contents"
                    >
                      {children}
                    </Menu.RadioGroup>
                  </div>
                )}
              />
            </DropdownContext.Provider>
          </motion.div>
        </Menu.Positioner>
      </Menu.Portal>
    );
  }
);

DropdownContent.displayName = "DropdownContent";

// ---------------------------------------------------------------------------
// DropdownLabel
// ---------------------------------------------------------------------------

const DropdownLabel = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-muted-text dark:text-on-dark-soft shrink-0 px-2.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase select-none",
        className
      )}
      {...props}
    />
  );
});

DropdownLabel.displayName = "DropdownLabel";

// ---------------------------------------------------------------------------
// DropdownSeparator
// ---------------------------------------------------------------------------

const DropdownSeparator = forwardRef(({ className, ...props }, ref) => (
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

DropdownSeparator.displayName = "DropdownSeparator";

export {
  Dropdown,
  DropdownLabel,
  DropdownSeparator,
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
};
export default Dropdown;
