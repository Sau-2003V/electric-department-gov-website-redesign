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
import { SizeProvider, useSize } from "@/lib/size-context";
import { useProximityHover } from "@/hooks/use-proximity-hover";

const TabsValueOrderContext = createContext(null);
const TabsListContext = createContext(null);

function useTabsList() {
  const ctx = useContext(TabsListContext);
  if (!ctx)
    throw new Error("TabItem/TabsTrigger must be used within a TabsList");
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
        // 1. Signature nav-pill-group (from design.md §159: background surface-soft #f8f9fa, rounded.pill, 6px internal padding)
        default:
          "border border-hairline/80 bg-surface-soft text-muted-text p-1 rounded-full shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",
        pill: "border border-hairline/80 bg-surface-soft text-muted-text p-1 rounded-full shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",
        "nav-pill-group":
          "border border-hairline/80 bg-surface-soft text-muted-text p-1.5 rounded-full shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",

        // 2. Segmented / Rounded
        segmented:
          "border border-hairline/80 bg-surface-soft text-muted-text p-1 rounded-xl shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",
        rounded:
          "border border-hairline/80 bg-surface-soft text-muted-text p-1 rounded-xl shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",

        // 3. Surface Card & Canvas
        surface:
          "border border-hairline bg-surface-card text-muted-text p-1 rounded-full shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",
        card: "border border-hairline bg-surface-card text-muted-text p-1 rounded-xl shadow-subtle dark:border-hairline dark:bg-surface-dark-elevated dark:text-on-dark-soft",
        canvas:
          "border border-hairline bg-canvas text-muted-text p-1 rounded-full dark:border-hairline dark:bg-surface-dark dark:text-on-dark-soft",

        // 4. Line / Underline tab bar
        line: "border-b border-hairline bg-transparent text-muted-text gap-6 p-0 rounded-none dark:border-hairline dark:text-on-dark-soft",
        underline:
          "border-b border-hairline bg-transparent text-muted-text gap-6 p-0 rounded-none dark:border-hairline dark:text-on-dark-soft",

        // 5. Ghost / Minimal
        ghost:
          "bg-transparent text-muted-text gap-1 p-1 dark:text-on-dark-soft",
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
      shape,
      size = "default",
      ...props
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const [isMouseInside, setIsMouseInside] = useState(false);
    const sizeClasses = useSize(size);
    const valueOrderCtx = useContext(TabsValueOrderContext);
    const [optimisticIdx, setOptimisticIdx] = useState(null);

    const isUnderline = variant === "line" || variant === "underline";
    const isPill =
      !isUnderline &&
      (shape === "pill" ||
        variant === "default" ||
        variant === "pill" ||
        variant === "nav-pill-group" ||
        variant === "surface" ||
        variant === "canvas");

    const effectiveShape = isUnderline
      ? "line"
      : shape || (isPill ? "pill" : "rounded");

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
          shape: child.props.shape ?? effectiveShape,
          variant: child.props.variant ?? variant,
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
          shape: effectiveShape,
          variant,
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
            isUnderline
              ? "rounded-none"
              : isPill
                ? "rounded-full"
                : "rounded-xl",
            className
          )}
          {...props}
        >
          {/* Active indicator */}
          {selectedRect &&
            (isUnderline ? (
              <motion.div
                className="bg-primary dark:bg-canvas pointer-events-none absolute bottom-0 z-10 h-0.5"
                initial={false}
                animate={{
                  left: selectedRect.left,
                  width: selectedRect.width,
                }}
                transition={{
                  ...spring.moderate,
                }}
              />
            ) : (
              <motion.div
                className={cn(
                  "bg-canvas text-ink border-hairline/80 shadow-subtle dark:border-hairline dark:bg-canvas dark:text-ink pointer-events-none absolute border",
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
            ))}

          {/* Hover indicator: Soft proximity highlight */}
          <AnimatePresence>
            {!isUnderline &&
              hoverRect &&
              !isHoveringSelected &&
              selectedRect && (
                <motion.div
                  className={cn(
                    "bg-surface-card/70 dark:bg-surface-dark/40 pointer-events-none absolute",
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
                    opacity: 0.7,
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
                  "border-brand-accent ring-brand-accent/25 pointer-events-none absolute z-20 border ring-2",
                  isUnderline
                    ? "rounded-xs"
                    : isPill
                      ? "rounded-full"
                      : "rounded-[10px]"
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
  "relative z-10 flex cursor-pointer items-center justify-center border-none bg-transparent outline-none select-none transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none font-sans font-medium",
  {
    variants: {
      size: {
        default: "h-9 px-4 text-sm gap-2",
        sm: "h-7 px-3 text-xs gap-1.5",
        compact: "h-7.5 px-3 text-xs gap-1.5",
        lg: "h-11 px-5.5 text-base gap-2.5",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-lg",
        md: "rounded-md",
        line: "rounded-none pb-2 pt-1 px-1",
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
    const isUnderline =
      listCtx.variant === "line" || listCtx.variant === "underline";

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
            "transition-colors duration-100 shrink-0 pointer-events-none",
            isActive
              ? "text-ink dark:text-on-dark"
              : "text-muted-text dark:text-on-dark-soft",
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
              "pointer-events-none shrink-0 transition-colors duration-100",
              isActive
                ? "text-ink dark:text-on-dark"
                : "text-muted-text dark:text-on-dark-soft"
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
          tabItemVariants({
            size: effectiveSize,
            shape: isUnderline ? "line" : effectiveShape,
          }),
          isActive
            ? "text-ink dark:text-on-dark font-medium"
            : "text-muted-text hover:text-ink dark:text-on-dark-soft dark:hover:text-on-dark font-medium",
          className
        )}
        {...props}
      >
        {renderIcon()}

        {displayLabel !== null ? (
          <span className="whitespace-nowrap">{displayLabel}</span>
        ) : (
          children
        )}

        {badge && (
          <span className="shrink-0">
            {typeof badge === "string" || typeof badge === "number" ? (
              <span
                className={cn(
                  "border-hairline inline-flex items-center justify-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium transition-colors",
                  isSelected
                    ? "bg-surface-card text-ink dark:bg-surface-dark-elevated dark:text-on-dark"
                    : "bg-surface-soft text-muted-text dark:bg-surface-dark dark:text-on-dark-soft"
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
        "focus-visible:ring-ring mt-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});

TabPanel.displayName = "TabPanel";

// Aliases for compatibility
const TabsTrigger = TabItem;
const TabsContent = TabPanel;

export {
  Tabs,
  TabsList,
  TabItem,
  TabPanel,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabItemVariants,
};
