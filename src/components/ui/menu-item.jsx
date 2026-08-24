"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSize } from "@/lib/size-context";

export const DropdownContext = createContext(null);

export function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdown must be used within a Dropdown");
  return ctx;
}

/** Null-safe context read for callers that render outside a provider. */
export function useDropdownMaybe() {
  return useContext(DropdownContext);
}

const MenuItem = forwardRef(
  (
    {
      icon: Icon,
      label,
      description,
      shortcut,
      badge,
      index,
      checked,
      onSelect,
      disabled = false,
      destructive = false,
      closeOnClick = true,
      className,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef(null);
    const hasMounted = useRef(false);
    const dropdownCtx = useDropdownMaybe();
    const registerItem = dropdownCtx?.registerItem;
    const activeIndex = dropdownCtx?.activeIndex;
    const checkedIndex = dropdownCtx?.checkedIndex;
    const renderMenuItem = dropdownCtx?.renderMenuItem;

    useEffect(() => {
      if (index !== undefined && registerItem) {
        registerItem(index, internalRef.current);
        return () => registerItem(index, null);
      }
    }, [index, registerItem]);

    useEffect(() => {
      hasMounted.current = true;
    }, []);

    const isActive = index !== undefined && activeIndex === index;
    const isChecked =
      checked ?? (index !== undefined && checkedIndex === index);
    const sizeClasses = useSize();

    const mergeRef = (node) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const handleActivate = disabled
      ? undefined
      : (e) => {
          onClick?.(e);
          onSelect?.();
        };

    const itemClassName = cn(
      "relative z-10 flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none select-none transition-colors cursor-pointer",
      destructive
        ? "text-error hover:bg-error/10 focus-visible:bg-error/10 dark:text-rose-400"
        : isChecked || isActive
          ? "bg-surface-soft text-ink dark:bg-surface-dark dark:text-on-dark"
          : "text-muted-text hover:bg-surface-soft hover:text-ink dark:text-on-dark-soft dark:hover:bg-surface-dark dark:hover:text-on-dark",
      disabled && "opacity-45 pointer-events-none cursor-not-allowed",
      className
    );

    const content = (
      <>
        {Icon && (
          <span
            className={cn(
              "pointer-events-none shrink-0 transition-colors",
              destructive
                ? "text-error dark:text-rose-400"
                : isChecked || isActive
                  ? "text-ink dark:text-on-dark"
                  : "text-muted-text dark:text-on-dark-soft"
            )}
          >
            {typeof Icon === "function" || typeof Icon === "object" ? (
              <Icon className="size-4" aria-hidden="true" />
            ) : (
              Icon
            )}
          </span>
        )}

        <div className="flex flex-1 flex-col text-left">
          {label && (
            <span
              className={cn(
                "leading-none transition-colors",
                isChecked
                  ? "text-ink dark:text-on-dark font-semibold"
                  : "font-medium"
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-muted-soft dark:text-on-dark-soft/70 mt-0.5 text-[11px] leading-tight font-normal">
              {description}
            </span>
          )}
          {!label && !description && children}
        </div>

        {badge && <span className="shrink-0">{badge}</span>}

        {shortcut && (
          <span className="text-muted-soft dark:text-on-dark-soft font-mono text-[10px] tracking-widest uppercase">
            {shortcut}
          </span>
        )}

        {isChecked && !badge && (
          <span className="text-ink dark:text-on-dark shrink-0">
            <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
          </span>
        )}
      </>
    );

    if (renderMenuItem) {
      return renderMenuItem({
        radio: typeof checked === "boolean",
        value: index,
        disabled,
        label,
        closeOnClick,
        element: (
          <div
            ref={mergeRef}
            data-proximity-index={index}
            aria-label={typeof label === "string" ? label : undefined}
            onClick={handleActivate}
            className={itemClassName}
            {...props}
          />
        ),
        children: content,
      });
    }

    return (
      <div
        ref={mergeRef}
        data-proximity-index={index}
        tabIndex={!disabled ? 0 : -1}
        role={typeof checked === "boolean" ? "menuitemradio" : "menuitem"}
        aria-checked={typeof checked === "boolean" ? isChecked : undefined}
        aria-disabled={disabled || undefined}
        aria-label={typeof label === "string" ? label : undefined}
        onClick={handleActivate}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleActivate(e);
          }
        }}
        className={itemClassName}
        {...props}
      >
        {content}
      </div>
    );
  }
);

MenuItem.displayName = "MenuItem";

export { MenuItem };
export default MenuItem;
