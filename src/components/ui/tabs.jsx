"use client";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  useMemo,
} from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/springs";
import { fontWeights } from "@/lib/font-weight";
import { useShape } from "@/lib/shape-context";
import { SizeProvider, useSize } from "@/lib/size-context";
import { useProximityHover } from "@/hooks/use-proximity-hover";

const TabsValueOrderContext = createContext(null);
const TabsListContext = createContext(null);

function useTabsList() {
  const ctx = useContext(TabsListContext);
  if (!ctx) throw new Error("TabItem must be used within a TabsList");
  return ctx;
}

const Tabs = forwardRef(
  (
    {
      value,
      onValueChange,
      selectedIndex,
      onSelect,
      defaultValue,
      size,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [valueOrder, setValueOrder] = useState([]);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const updateValueOrder = useCallback((order) => {
      setValueOrder((current) => {
        if (
          current.length === order.length &&
          current.every((v, i) => v === order[i])
        ) {
          return current;
        }
        return order;
      });
    }, []);

    // Resolve value: explicit value > selectedIndex lookup > uncontrolled state
    const resolvedValue =
      value ??
      (selectedIndex != null
        ? valueOrder[selectedIndex]
        : (uncontrolledValue ?? valueOrder[0]));

    // Base UI passes (value, eventDetails); we handle both value and selected index
    const handleValueChange = useCallback(
      (newValue) => {
        const v = newValue;
        if (value === undefined && selectedIndex == null) {
          setUncontrolledValue(v);
        }
        onValueChange?.(v);
        if (onSelect) {
          const idx = valueOrder.indexOf(v);
          if (idx !== -1) onSelect(idx);
        }
      },
      [onValueChange, onSelect, valueOrder, value, selectedIndex]
    );

    const root = (
      <TabsValueOrderContext.Provider
        value={{
          valueOrder,
          setValueOrder: updateValueOrder,
          selectedValue: resolvedValue,
        }}
      >
        <TabsPrimitive.Root
          ref={ref}
          value={resolvedValue ?? ""}
          onValueChange={handleValueChange}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsValueOrderContext.Provider>
    );

    return size ? <SizeProvider size={size}>{root}</SizeProvider> : root;
  }
);

Tabs.displayName = "Tabs";

const tabsListVariants = cva(
  "relative inline-flex items-center select-none transition-colors",
  {
    variants: {
      variant: {
        // Pill toggle according to design system (default)
        default:
          "border-hairline bg-surface-2 text-ink-muted border p-1 rounded-full shadow-2xs dark:border-hairline dark:bg-surface-2/60 dark:text-muted-foreground",
        pill: "border-hairline bg-surface-2 text-ink-muted border p-1 rounded-full shadow-2xs dark:border-hairline dark:bg-surface-2/60 dark:text-muted-foreground",
        segmented:
          "border-hairline bg-surface-2 text-ink-muted border p-1 rounded-xl shadow-2xs dark:border-hairline dark:bg-surface-2/60 dark:text-muted-foreground",
        surface:
          "border-hairline bg-surface-1 text-ink-muted border p-1 rounded-full shadow-2xs dark:border-hairline dark:bg-card dark:text-muted-foreground",
        canvas:
          "border-hairline bg-canvas text-ink-muted border p-1 rounded-full dark:border-hairline dark:bg-canvas dark:text-muted-foreground",
        ghost: "bg-transparent text-ink-muted dark:text-muted-foreground p-1",
      },
      size: {
        default: "gap-0.5",
        sm: "gap-0.5 p-0.5",
        compact: "gap-0.5 p-0.5",
        lg: "gap-1 p-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const TabsList = forwardRef(
  (
    {
      children,
      className,
      variant = "default",
      shape = "pill",
      size = "default",
      ...props
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const [isMouseInside, setIsMouseInside] = useState(false);
    const contextShape = useShape();
    const effectiveShape =
      shape ||
      (contextShape?.container?.includes("rounded-full") ? "pill" : "rounded");
    const sizeClasses = useSize(size);
    const valueOrderCtx = useContext(TabsValueOrderContext);
    const [optimisticIdx, setOptimisticIdx] = useState(null);

    const isPill =
      effectiveShape === "pill" || variant === "default" || variant === "pill";

    const values = useMemo(() => {
      return Children.toArray(children)
        .filter(isValidElement)
        .map((child) => child.props.value)
        .filter((v) => typeof v === "string");
    }, [children]);

    const valueOrderKey = values.join(",");
    const setValueOrder = valueOrderCtx?.setValueOrder;

    useLayoutEffect(() => {
      setValueOrder?.(values);
    }, [setValueOrder, valueOrderKey, values]);

    const {
      activeIndex: hoveredIndex,
      setActiveIndex: setHoveredIndex,
      itemRects,
      handlers,
      registerItem,
      measureItems,
    } = useProximityHover(containerRef, { axis: "x" });

    const registerTab = useCallback(
      (index, _value, el) => {
        registerItem(index, el);
      },
      [registerItem]
    );

    useEffect(() => {
      measureItems();
    }, [measureItems, children]);

    const handleMouseMove = useCallback(
      (e) => {
        setIsMouseInside(true);
        handlers.onMouseMove(e);
      },
      [handlers]
    );

    const handleMouseLeave = useCallback(() => {
      setIsMouseInside(false);
      handlers.onMouseLeave();
    }, [handlers]);

    const [focusedIndex, setFocusedIndex] = useState(null);
    const selectedValue = valueOrderCtx?.selectedValue;
    const selectedIdx =
      selectedValue !== undefined ? values.indexOf(selectedValue) : -1;

    const activeSelectedIdx =
      optimisticIdx !== null
        ? optimisticIdx
        : selectedIdx >= 0
          ? selectedIdx
          : null;
    const selectedRect =
      activeSelectedIdx !== null ? itemRects[activeSelectedIdx] : null;
    const hoverRect = hoveredIndex !== null ? itemRects[hoveredIndex] : null;
    const focusRect = focusedIndex !== null ? itemRects[focusedIndex] : null;
    const isHoveringSelected = hoveredIndex === activeSelectedIdx;
    const isHovering = hoveredIndex !== null && !isHoveringSelected;

    const indexedChildren = Children.map(children, (child, i) => {
      if (isValidElement(child) && typeof child.type !== "string") {
        return cloneElement(child, {
          _index: i,
          size: child.props.size ?? size,
          shape: child.props.shape ?? (isPill ? "pill" : "rounded"),
        });
      }
      return child;
    });

    return (
      <TabsListContext.Provider
        value={{
          registerTab,
          hoveredIndex,
          selectedValue,
          setOptimisticIdx,
          size,
          shape: isPill ? "pill" : "rounded",
        }}
      >
        <TabsPrimitive.List
          activateOnFocus
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onFocus={(e) => {
            const trigger = e.target.closest('[role="tab"]');
            if (!trigger) return;
            const indexAttr = trigger.getAttribute("data-proximity-index");
            if (indexAttr != null) {
              const idx = Number(indexAttr);
              setHoveredIndex(idx);
              setFocusedIndex(e.target.matches(":focus-visible") ? idx : null);
            }
          }}
          onBlur={(e) => {
            if (containerRef.current?.contains(e.relatedTarget)) return;
            setFocusedIndex(null);
            if (isMouseInside) return;
            setHoveredIndex(null);
          }}
          className={cn(
            tabsListVariants({ variant, size }),
            isPill ? "rounded-full" : "rounded-xl",
            className
          )}
          {...props}
        >
          {/* Active segment indicator: Crisp white pill lift with soft elevation */}
          {selectedRect && (
            <motion.div
              className={cn(
                "border-hairline/50 bg-surface-1 text-ink dark:border-hairline/80 dark:bg-surface-2 dark:text-foreground pointer-events-none absolute border shadow-xs dark:shadow-none",
                isPill ? "rounded-full" : "rounded-lg"
              )}
              initial={false}
              animate={{
                left: selectedRect.left,
                width: selectedRect.width,
                top: selectedRect.top,
                height: selectedRect.height,
                opacity: isHovering ? 0.95 : 1,
              }}
              transition={{
                ...spring.moderate,
                opacity: { duration: 0.08 },
              }}
            />
          )}

          {/* Hover indicator: Soft proximity highlight */}
          <AnimatePresence>
            {hoverRect && !isHoveringSelected && selectedRect && (
              <motion.div
                className={cn(
                  "bg-surface-3/50 dark:bg-surface-3/30 pointer-events-none absolute",
                  isPill ? "rounded-full" : "rounded-lg"
                )}
                initial={{
                  left: selectedRect.left,
                  width: selectedRect.width,
                  top: selectedRect.top,
                  height: selectedRect.height,
                  opacity: 0,
                }}
                animate={{
                  left: hoverRect.left,
                  width: hoverRect.width,
                  top: hoverRect.top,
                  height: hoverRect.height,
                  opacity: 0.6,
                }}
                exit={
                  !isMouseInside && selectedRect
                    ? {
                        left: selectedRect.left,
                        width: selectedRect.width,
                        top: selectedRect.top,
                        height: selectedRect.height,
                        opacity: 0,
                        transition: {
                          ...spring.moderate,
                          opacity: { duration: 0.06 },
                        },
                      }
                    : { opacity: 0, transition: spring.fast.exit }
                }
                transition={{
                  ...spring.fast,
                  opacity: { duration: 0.08 },
                }}
              />
            )}
          </AnimatePresence>

          {/* Focus ring: Adheres to design system ring token */}
          <AnimatePresence>
            {focusRect && (
              <motion.div
                className={cn(
                  "border-ring/60 ring-ring/25 dark:border-ring dark:ring-ring/40 pointer-events-none absolute z-20 border ring-2",
                  isPill ? "rounded-full" : "rounded-[10px]"
                )}
                initial={false}
                animate={{
                  left: focusRect.left - 2,
                  top: focusRect.top - 2,
                  width: focusRect.width + 4,
                  height: focusRect.height + 4,
                }}
                exit={{ opacity: 0, transition: spring.fast.exit }}
                transition={{
                  ...spring.fast,
                  opacity: { duration: 0.08 },
                }}
              />
            )}
          </AnimatePresence>

          {indexedChildren}
        </TabsPrimitive.List>
      </TabsListContext.Provider>
    );
  }
);

TabsList.displayName = "TabsList";

const tabItemVariants = cva(
  "relative z-10 flex cursor-pointer items-center justify-center border-none bg-transparent outline-none select-none transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      size: {
        default: "h-9 px-4 sm:px-5 text-[14px] sm:text-[15px] gap-2",
        sm: "h-7 px-3 text-[12px] gap-1.5",
        compact: "h-7.5 px-3 text-[13px] gap-1.5",
        lg: "h-11 px-6 text-[16px] gap-2.5",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-lg",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "pill",
    },
  }
);

const TabItem = forwardRef(
  (
    {
      value,
      icon,
      badge,
      label,
      children,
      size,
      shape,
      _index = 0,
      className,
      onClick,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef(null);
    const listCtx = useTabsList();
    const { registerTab, hoveredIndex, selectedValue, setOptimisticIdx } =
      listCtx;

    const effectiveSize = size || listCtx.size || "default";
    const effectiveShape = shape || listCtx.shape || "pill";

    useEffect(() => {
      registerTab(_index, value, internalRef.current);
      return () => registerTab(_index, value, null);
    }, [_index, value, registerTab]);

    const isSelected = selectedValue === value;
    const isActive = hoveredIndex === _index || isSelected;

    const displayLabel =
      label ??
      (typeof children === "string" || typeof children === "number"
        ? children
        : null);

    const renderIcon = () => {
      if (!icon) return null;
      const strokeWidth = isActive ? 2 : 1.5;

      if (isValidElement(icon)) {
        return cloneElement(icon, {
          className: cn(
            "transition-[color,stroke-width] duration-100 shrink-0",
            isActive
              ? "text-ink dark:text-foreground"
              : "text-ink-muted dark:text-muted-foreground",
            icon.props.className
          ),
          strokeWidth: icon.props.strokeWidth ?? strokeWidth,
        });
      }

      if (typeof icon === "function" || typeof icon === "object") {
        const IconComponent = icon;
        return (
          <IconComponent
            size={effectiveSize === "sm" ? 14 : 16}
            strokeWidth={strokeWidth}
            className={cn(
              "shrink-0 transition-[color,stroke-width] duration-100",
              isActive
                ? "text-ink dark:text-foreground"
                : "text-ink-muted dark:text-muted-foreground"
            )}
          />
        );
      }

      return null;
    };

    return (
      <TabsPrimitive.Tab
        onClick={(e) => {
          if (disabled) return;
          setOptimisticIdx(_index);
          onClick?.(e);
        }}
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        value={value}
        disabled={disabled}
        data-proximity-index={_index}
        className={cn(
          tabItemVariants({ size: effectiveSize, shape: effectiveShape }),
          isActive
            ? "text-ink dark:text-foreground font-medium"
            : "text-ink-muted hover:text-ink dark:text-muted-foreground dark:hover:text-foreground font-normal",
          className
        )}
        {...props}
      >
        {renderIcon()}

        {displayLabel ? (
          <span className="inline-grid whitespace-nowrap text-inherit">
            <span
              className="invisible col-start-1 row-start-1 font-medium [text-box:trim-both_cap_alphabetic]"
              style={{ fontVariationSettings: fontWeights.semibold }}
              aria-hidden="true"
            >
              {displayLabel}
            </span>
            <span
              className={cn(
                "col-start-1 row-start-1 transition-[color,font-weight] duration-100 [text-box:trim-both_cap_alphabetic]",
                isActive
                  ? "text-ink dark:text-foreground font-medium"
                  : "text-ink-muted hover:text-ink dark:text-muted-foreground dark:hover:text-foreground font-normal"
              )}
              style={{
                fontVariationSettings: isSelected
                  ? fontWeights.semibold
                  : fontWeights.normal,
              }}
            >
              {displayLabel}
            </span>
          </span>
        ) : (
          children
        )}

        {badge && (
          <span className="shrink-0">
            {typeof badge === "string" || typeof badge === "number" ? (
              <span
                className={cn(
                  "border-hairline/60 py-0.2 inline-flex items-center justify-center rounded-full border px-1.5 text-[10px] font-medium transition-colors",
                  isSelected
                    ? "bg-surface-2 text-ink dark:bg-surface-3 dark:text-foreground"
                    : "bg-surface-1/80 text-ink-muted dark:bg-surface-2 dark:text-muted-foreground"
                )}
              >
                {badge}
              </span>
            ) : (
              badge
            )}
          </span>
        )}
      </TabsPrimitive.Tab>
    );
  }
);

TabItem.displayName = "TabItem";

const TabPanel = forwardRef(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Panel
      ref={ref}
      className={cn(
        "focus-visible:ring-ring/50 mt-2 outline-none focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
});

TabPanel.displayName = "TabPanel";

export { Tabs, TabsList, TabItem, TabPanel, tabsListVariants, tabItemVariants };
