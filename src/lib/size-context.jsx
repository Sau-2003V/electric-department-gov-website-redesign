"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const sizeMap = {
  // 36px — the default control height. Matches a 13px label with comfortable
  // breathing room and keeps controls a workable pointer target.
  default: {
    variant: "default",
    control: "h-9",
    controlHeight: 36,
    segmentItem: "h-7",
    segmentPad: "p-1",
    text: "text-[13px]",
    px: "px-3",
    itemPx: "px-2",
    gap: "gap-2",
    icon: 16,
  },
  // 28px — the compact height for dense surfaces: filter bars, toolbars,
  // table headers, sidebars. One step down in text (12px) and icon (14px)
  // so the whole control shrinks together, not just its box.
  compact: {
    variant: "compact",
    control: "h-7",
    controlHeight: 28,
    segmentItem: "h-6",
    segmentPad: "p-0.5",
    text: "text-[12px]",
    px: "px-2.5",
    itemPx: "px-1.5",
    gap: "gap-1",
    icon: 14,
  },
};

/**
 * Role-based type scale, per ladder step (px values).
 *
 * The default column is the system as shipped; the compact column steps each
 * role down one notch so dense regions read as a smaller sibling of the same
 * hierarchy, not a squeezed copy. `body`, `caption`, and `subtitle` are what
 * the sized components already render through `SizeClasses.text` and their
 * compact conditionals; `display` and `title` are the page-level roles
 * for consumers composing their own screens.
 */
const typeScale = {
  /** Page titles. */
  display: { default: 28, compact: 24 },

  /** Section headings, dialog titles. */
  title: { default: 16, compact: 15 },

  /** Card titles, chat bubbles, emphasized rows. */
  subtitle: { default: 14, compact: 13 },

  /** Control labels and body copy — `SizeClasses.text`. */
  body: { default: 13, compact: 12 },

  /** Secondary text: descriptions, meta rows, errors, eyebrows and group
   *  labels (the former overline role — an uppercase or muted caption). */
  caption: { default: 12, compact: 11 },
};

/** The type scale resolved for the active ladder step (px per role):
 *  explicit override > surrounding SizeProvider > "default". */
function useTypeScale(override) {
  const variant = useSizeVariant(override);
  return {
    display: typeScale.display[variant],
    title: typeScale.title[variant],
    subtitle: typeScale.subtitle[variant],
    body: typeScale.body[variant],
    caption: typeScale.caption[variant],
  };
}

const SizeContext = createContext(null);

/** Resolve the active size variant: explicit prop > provider > "default". */
function useSizeVariant(override) {
  const ctx = useContext(SizeContext);
  return override ?? ctx?.size ?? "default";
}

/** Resolve size classes: explicit prop > provider > "default". */
function useSize(override) {
  return sizeMap[useSizeVariant(override)];
}

function useSizeContext() {
  const ctx = useContext(SizeContext);
  if (!ctx)
    throw new Error("useSizeContext must be used within a SizeProvider");
  return ctx;
}

function SizeProvider({ children, size, defaultSize = "default" }) {
  const [internalSize, setInternalSize] = useState(defaultSize);
  const isControlled = size !== undefined;
  const resolved = size ?? internalSize;

  // Controlled providers ignore setSize entirely — a background write to the
  // shadowed internal state would pop back out if the size prop were later
  // removed.
  const setSize = useCallback(
    (next) => {
      if (isControlled) return;
      setInternalSize(next);
    },
    [isControlled]
  );

  const value = useMemo(
    () => ({ size: resolved, setSize, classes: sizeMap[resolved] }),
    [resolved, setSize]
  );

  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
}

export {
  SizeProvider,
  useSize,
  useSizeVariant,
  useSizeContext,
  useTypeScale,
  sizeMap,
  typeScale,
};
