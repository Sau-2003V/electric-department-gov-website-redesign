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
} from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/springs";
import { fontWeights } from "@/lib/font-weight";
import { useShape } from "@/lib/shape-context";
import { SizeProvider, useSize } from "@/lib/size-context";
import { useSurface } from "@/lib/surface-context";
import { surfaceClasses } from "@/lib/surface-classes";
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

    // Resolve value: explicit value > selectedIndex lookup > uncontrolled state.
    // Uncontrolled with no defaultValue falls back to the first tab so the
    // FF layer's selectedValue matches what the primitive shows.
    const resolvedValue =
      value ??
      (selectedIndex != null
        ? valueOrder[selectedIndex]
        : (uncontrolledValue ?? valueOrder[0]));

    // Base UI passes (value, eventDetails); we only need value.
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
        {/*
        Always controlled: Base UI's useControlled logs a dev warning when
        value flips undefined → defined. valueOrder is empty on the first
        commit, so fall back to an empty-string sentinel — TabsList's
        layout effect populates valueOrder pre-paint, so the corrected
        value lands before anything is visible.
      */}
        <TabsPrimitive.Root
          ref={ref}
          value={resolvedValue ?? ""}
          onValueChange={handleValueChange}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsValueOrderContext.Provider>
    );

    // A size prop pins the whole compound (list + items) to one ladder step.
    return size ? <SizeProvider size={size}>{root}</SizeProvider> : root;
  }
);

Tabs.displayName = "Tabs";

const TabsList = forwardRef(({ children, className, ...props }, ref) => {
  const containerRef = useRef(null);
  const isMouseInside = useRef(false);
  const shape = useShape();
  const sizeClasses = useSize();
  const substrate = useSurface();
  const indicatorLevel = Math.min(substrate + 3, 8);
  const valueOrderCtx = useContext(TabsValueOrderContext);
  const [optimisticIdx, setOptimisticIdx] = useState(null);

  const values = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => child.props.value)
    .filter((v) => typeof v === "string");
  const valueOrderKey = values.join(",");
  const setValueOrder = valueOrderCtx?.setValueOrder;

  useLayoutEffect(() => {
    setValueOrder?.(values);
  }, [setValueOrder, valueOrderKey]);

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
      isMouseInside.current = true;
      handlers.onMouseMove(e);
    },
    [handlers]
  );

  const handleMouseLeave = useCallback(() => {
    isMouseInside.current = false;
    handlers.onMouseLeave();
  }, [handlers]);

  const [focusedIndex, setFocusedIndex] = useState(null);
  const selectedValue = valueOrderCtx?.selectedValue;
  const selectedIdx =
    selectedValue !== undefined ? values.indexOf(selectedValue) : -1;

  useEffect(() => {
    setOptimisticIdx(selectedIdx >= 0 ? selectedIdx : null);
  }, [selectedIdx]);

  const activeSelectedIdx = optimisticIdx;
  const selectedRect =
    activeSelectedIdx !== null ? itemRects[activeSelectedIdx] : null;
  const hoverRect = hoveredIndex !== null ? itemRects[hoveredIndex] : null;
  const focusRect = focusedIndex !== null ? itemRects[focusedIndex] : null;
  const isHoveringSelected = hoveredIndex === activeSelectedIdx;
  const isHovering = hoveredIndex !== null && !isHoveringSelected;

  const indexedChildren = Children.map(children, (child, i) => {
    // Skip plain DOM elements — injecting _index into e.g. a <div>
    // triggers React's unknown-prop warning.
    if (isValidElement(child) && typeof child.type !== "string") {
      return cloneElement(child, {
        _index: i,
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
      }}
    >
      <TabsPrimitive.List
        // Match Radix's `activationMode="automatic"` — arrow keys move + activate.
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
          if (isMouseInside.current) return;
          setHoveredIndex(null);
        }}
        className={cn(
          // segmentPad + segmentItem add up to the ladder's control height
          // (36px default, 28px compact) so the segmented control's outer
          // box lines up with buttons, selects, and inputs beside it.
          "bg-muted relative inline-flex items-center gap-0.5 select-none",
          sizeClasses.segmentPad,
          shape.container,
          className
        )}
        {...props}
      >
        {/* Active segment indicator */}
        {selectedRect && (
          <motion.div
            className={cn(
              "pointer-events-none absolute",
              surfaceClasses(indicatorLevel),
              shape.bg
            )}
            initial={false}
            animate={{
              left: selectedRect.left,
              width: selectedRect.width,
              top: selectedRect.top,
              height: selectedRect.height,
              opacity: isHovering ? 0.85 : 1,
            }}
            transition={{
              ...spring.moderate,
              opacity: { duration: 0.08 },
            }}
          />
        )}

        {/* Hover indicator */}
        <AnimatePresence>
          {hoverRect && !isHoveringSelected && selectedRect && (
            <motion.div
              className={cn("bg-hover pointer-events-none absolute", shape.bg)}
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
                opacity: 0.4,
              }}
              exit={
                !isMouseInside.current && selectedRect
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

        {/* Focus ring */}
        <AnimatePresence>
          {focusRect && (
            <motion.div
              className={cn(
                "pointer-events-none absolute z-20 border border-[color:var(--focus-ring,#6B97FF)]",
                shape.focusRing
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
});

TabsList.displayName = "TabsList";

const TabItem = forwardRef(
  (
    { value, icon: Icon, label, _index = 0, className, onClick, ...props },
    ref
  ) => {
    const internalRef = useRef(null);
    const sizeClasses = useSize();
    const { registerTab, hoveredIndex, selectedValue, setOptimisticIdx } =
      useTabsList();

    useEffect(() => {
      registerTab(_index, value, internalRef.current);
      return () => registerTab(_index, value, null);
    }, [_index, value, registerTab]);

    const isSelected = selectedValue === value;
    const isActive = hoveredIndex === _index || isSelected;

    return (
      <TabsPrimitive.Tab
        // Composed (not spread-overridable): a consumer onClick must not
        // replace the optimistic indicator jump.
        onClick={(e) => {
          setOptimisticIdx(_index);
          onClick?.(e);
        }}
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        value={value}
        data-proximity-index={_index}
        className={cn(
          // Fixed height (not py) so the text-box trim below doesn't shrink
          // the tab — browsers without text-box support render identically.
          "relative z-10 flex cursor-pointer items-center border-none bg-transparent px-3 outline-none",
          sizeClasses.segmentItem,
          sizeClasses.gap,
          className
        )}
        {...props}
      >
        {Icon && (
          <Icon
            size={sizeClasses.icon}
            strokeWidth={isActive ? 2 : 1.5}
            className={cn(
              "transition-[color,stroke-width] duration-80",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          />
        )}
        {/* Both stacked spans carry the text-box trim so the invisible bold
            sizer and the visible label keep identical boxes. */}
        <span className={cn("inline-grid whitespace-nowrap", sizeClasses.text)}>
          <span
            className="invisible col-start-1 row-start-1 [text-box:trim-both_cap_alphabetic]"
            style={{ fontVariationSettings: fontWeights.semibold }}
            aria-hidden="true"
          >
            {label}
          </span>
          <span
            className={cn(
              "col-start-1 row-start-1 transition-[color,font-variation-settings] duration-80 [text-box:trim-both_cap_alphabetic]",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
            style={{
              fontVariationSettings: isSelected
                ? fontWeights.semibold
                : fontWeights.normal,
            }}
          >
            {label}
          </span>
        </span>
      </TabsPrimitive.Tab>
    );
  }
);

TabItem.displayName = "TabItem";

const TabPanel = forwardRef(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Panel
      ref={ref}
      className={cn("outline-none", className)}
      {...props}
    />
  );
});

TabPanel.displayName = "TabPanel";

export { Tabs, TabsList, TabItem, TabPanel };
