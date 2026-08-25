"use client";
import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useId,
} from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/springs";
import { useSizeVariant } from "@/lib/size-context";

// Geometry metrics per size ladder
const METRICS = {
  compact: {
    trackWidth: 28,
    trackHeight: 16,
    thumbSize: 12,
    pillExtend: 2,
    pressExtend: 3,
    pressShrink: 3,
  },
  default: {
    trackWidth: 36,
    trackHeight: 20,
    thumbSize: 16,
    pillExtend: 2,
    pressExtend: 4,
    pressShrink: 4,
  },
  lg: {
    trackWidth: 44,
    trackHeight: 24,
    thumbSize: 20,
    pillExtend: 3,
    pressExtend: 5,
    pressShrink: 5,
  },
};

const switchVariants = cva(
  "relative shrink-0 cursor-pointer outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-dark",
  {
    variants: {
      variant: {
        // 1. Primary (Signature monochrome toggle: active ink #111111)
        primary:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=checked]:bg-canvas dark:data-[state=unchecked]:bg-surface-dark-elevated",
        default:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=checked]:bg-canvas dark:data-[state=unchecked]:bg-surface-dark-elevated",

        // 2. Accent & Brand (Cal Blue #3b82f6)
        accent:
          "data-[state=checked]:bg-brand-accent data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        brand:
          "data-[state=checked]:bg-brand-accent data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        "brand-accent":
          "data-[state=checked]:bg-brand-accent data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",

        // 3. Semantic Statuses
        success:
          "data-[state=checked]:bg-success data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        warning:
          "data-[state=checked]:bg-warning data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        destructive:
          "data-[state=checked]:bg-error data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        error:
          "data-[state=checked]:bg-error data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",

        // 4. Badge Pastels
        "badge-orange":
          "data-[state=checked]:bg-badge-orange data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        "badge-pink":
          "data-[state=checked]:bg-badge-pink data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        "badge-violet":
          "data-[state=checked]:bg-badge-violet data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",
        "badge-emerald":
          "data-[state=checked]:bg-badge-emerald data-[state=unchecked]:bg-surface-strong hover:data-[state=unchecked]:bg-muted-soft/40 dark:data-[state=unchecked]:bg-surface-dark-elevated",

        // 5. Inverse / Dark Surface
        inverse:
          "data-[state=checked]:bg-white data-[state=unchecked]:bg-surface-dark-elevated border border-hairline",
        dark: "data-[state=checked]:bg-white data-[state=unchecked]:bg-surface-dark-elevated border border-hairline",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
        md: "rounded-md",
        sm: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "pill",
    },
  }
);

const THUMB_OFFSET = 2;
const DRAG_DEAD_ZONE = 2;

const Switch = forwardRef(
  (
    {
      label,
      description,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      onToggle,
      disabled = false,
      variant = "default",
      shape = "pill",
      size: explicitSize,
      labelPlacement = "right",
      thumbTransition,
      thumbIcon,
      className,
      trackClassName,
      ...props
    },
    ref
  ) => {
    const labelId = useId();
    const descriptionId = useId();
    const hasMounted = useRef(false);
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    // Controlled or uncontrolled checked state
    const [uncontrolledChecked, setUncontrolledChecked] =
      useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    // Resolve sizing from prop > SizeContext > default
    const contextSize = useSizeVariant();
    const resolvedSize =
      explicitSize ?? (contextSize === "compact" ? "compact" : "default");
    const m = METRICS[resolvedSize] || METRICS.default;
    const thumbTravel = m.trackWidth - m.thumbSize - THUMB_OFFSET * 2;

    const dragging = useRef(false);
    const didDrag = useRef(false);
    const pointerStart = useRef(null);

    const motionX = useMotionValue(
      isChecked ? THUMB_OFFSET + thumbTravel : THUMB_OFFSET
    );

    useEffect(() => {
      hasMounted.current = true;
    }, []);

    const thumbWidth = pressed
      ? m.thumbSize + m.pressExtend
      : hovered
        ? m.thumbSize + m.pillExtend
        : m.thumbSize;
    const thumbHeight = pressed ? m.thumbSize - m.pressShrink : m.thumbSize;
    const thumbY = pressed ? THUMB_OFFSET + m.pressShrink / 2 : THUMB_OFFSET;
    const extraWidth = thumbWidth - m.thumbSize;
    const thumbX = isChecked
      ? THUMB_OFFSET + thumbTravel - extraWidth
      : THUMB_OFFSET;

    useEffect(() => {
      if (dragging.current) return;
      if (!hasMounted.current) {
        motionX.set(thumbX);
      } else {
        animate(motionX, thumbX, thumbTransition ?? spring.moderate);
      }
    }, [thumbX, motionX, thumbTransition]);

    const handleToggle = useCallback(() => {
      if (disabled) return;
      const nextChecked = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
      onToggle?.(nextChecked);
    }, [disabled, isChecked, isControlled, onCheckedChange, onToggle]);

    const handlePointerDown = useCallback(
      (e) => {
        if (disabled) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        setPressed(true);
        dragging.current = false;
        didDrag.current = false;
        pointerStart.current = {
          clientX: e.clientX,
          originX: motionX.get(),
        };
        e.currentTarget.setPointerCapture(e.pointerId);
      },
      [disabled, motionX]
    );

    const handlePointerMove = useCallback(
      (e) => {
        if (!pointerStart.current) return;
        const delta = e.clientX - pointerStart.current.clientX;

        if (!dragging.current) {
          if (Math.abs(delta) < DRAG_DEAD_ZONE) return;
          dragging.current = true;
        }

        const dragMin = THUMB_OFFSET;
        const pressedThumbWidth = m.thumbSize + m.pressExtend;
        const dragMax = m.trackWidth - THUMB_OFFSET - pressedThumbWidth;
        const rawX = pointerStart.current.originX + delta;
        motionX.set(Math.max(dragMin, Math.min(dragMax, rawX)));
      },
      [motionX, m]
    );

    const handlePointerUp = useCallback(() => {
      if (!pointerStart.current) return;
      setPressed(false);

      if (dragging.current) {
        didDrag.current = true;
        dragging.current = false;

        const currentX = motionX.get();
        const dragMin = THUMB_OFFSET;
        const pressedThumbWidth = m.thumbSize + m.pressExtend;
        const dragMax = m.trackWidth - THUMB_OFFSET - pressedThumbWidth;
        const midpoint = (dragMin + dragMax) / 2;

        const shouldBeOn = currentX > midpoint;

        if (shouldBeOn !== isChecked) {
          handleToggle();
        } else {
          const snapTarget = isChecked
            ? THUMB_OFFSET + thumbTravel
            : THUMB_OFFSET;
          animate(motionX, snapTarget, thumbTransition ?? spring.moderate);
        }

        requestAnimationFrame(() => {
          didDrag.current = false;
        });
      }

      pointerStart.current = null;
    }, [isChecked, handleToggle, motionX, thumbTransition, m, thumbTravel]);

    const handlePointerCancel = useCallback(() => {
      if (!pointerStart.current) return;
      setPressed(false);

      if (dragging.current) {
        dragging.current = false;
        const snapTarget = isChecked
          ? THUMB_OFFSET + thumbTravel
          : THUMB_OFFSET;
        animate(motionX, snapTarget, thumbTransition ?? spring.moderate);
      }

      pointerStart.current = null;
    }, [isChecked, motionX, thumbTransition, thumbTravel]);

    // Typography & gap styles by size
    const labelClasses =
      resolvedSize === "compact"
        ? "text-xs leading-none"
        : resolvedSize === "lg"
          ? "text-base font-medium leading-none"
          : "text-sm font-medium leading-none";

    const descClasses =
      resolvedSize === "compact"
        ? "text-[11px] text-muted-text"
        : "text-xs text-muted-text";

    const thumbRadiusClass =
      shape === "rounded" || shape === "md"
        ? "rounded-[4px]"
        : shape === "sm"
          ? "rounded-[3px]"
          : "rounded-full";

    const switchElement = (
      <SwitchPrimitive.Root
        checked={isChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        onCheckedChange={() => {
          if (didDrag.current) return;
          handleToggle();
        }}
        disabled={disabled}
        tabIndex={0}
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn(switchVariants({ variant, shape }), trackClassName)}
        style={{
          width: m.trackWidth,
          height: m.trackHeight,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <SwitchPrimitive.Thumb
          render={(thumbProps) => {
            const {
              style: baseStyle,
              onDrag: _onDrag,
              onDragStart: _onDragStart,
              onDragEnd: _onDragEnd,
              onAnimationStart: _onAnimationStart,
              onAnimationEnd: _onAnimationEnd,
              onAnimationIteration: _onAnimationIteration,
              ...rest
            } = thumbProps;
            return (
              <motion.span
                {...rest}
                className={cn(
                  "shadow-subtle dark:bg-canvas absolute top-0 left-0 flex items-center justify-center bg-white",
                  variant === "inverse" || variant === "dark"
                    ? "bg-primary dark:bg-primary text-white dark:text-white"
                    : "text-ink",
                  thumbRadiusClass
                )}
                initial={false}
                style={{
                  ...baseStyle,
                  x: motionX,
                }}
                animate={{
                  y: thumbY,
                  width: thumbWidth,
                  height: thumbHeight,
                }}
                transition={
                  hasMounted.current
                    ? (thumbTransition ?? spring.moderate)
                    : { duration: 0 }
                }
              >
                {thumbIcon && (
                  <span className="pointer-events-none flex size-full items-center justify-center overflow-hidden">
                    {typeof thumbIcon === "function"
                      ? thumbIcon({ checked: isChecked, size: resolvedSize })
                      : thumbIcon}
                  </span>
                )}
              </motion.span>
            );
          }}
        />
      </SwitchPrimitive.Root>
    );

    const hasLabelOrDescription = Boolean(label || description);

    if (!hasLabelOrDescription) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative inline-flex cursor-pointer touch-none items-center select-none",
            disabled && "pointer-events-none opacity-50",
            className
          )}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClick={() => {
            if (disabled || didDrag.current) return;
            handleToggle();
          }}
          {...props}
        >
          {switchElement}
        </div>
      );
    }

    return (
      <label
        ref={ref}
        className={cn(
          "relative z-10 flex cursor-pointer touch-none items-center justify-between gap-3 select-none",
          labelPlacement === "left" && "flex-row-reverse justify-end",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={() => {
          if (disabled || didDrag.current) return;
          handleToggle();
        }}
        {...props}
      >
        {switchElement}

        <div className="flex flex-col gap-0.5">
          {label && (
            <span
              id={labelId}
              className={cn(
                "font-sans transition-colors duration-100",
                labelClasses,
                isChecked ? "text-ink font-medium" : "text-body"
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span id={descriptionId} className={descClasses}>
              {description}
            </span>
          )}
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants };
