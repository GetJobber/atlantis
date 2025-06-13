import React, { ReactNode } from "react";
import { BREAKPOINT_SIZES } from "@jobber/hooks/useBreakpoints";
import styles from "./ResponsiveSwap.module.css";

type Breakpoints = keyof typeof BREAKPOINT_SIZES;

const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;

export function ResponsiveSwap({
  children,
  swapAt,
  swapWith,
}: {
  readonly children: ReactNode;
  readonly swapAt: Breakpoints;
  readonly swapWith: ReactNode;
}) {
  const cssVariables = getBreakpointCSSVariables(swapAt);

  return (
    <div
      className={styles.swapComponentAt}
      style={{
        ...cssVariables,
      }}
    >
      {/* Show children below breakpoint, hide above */}
      <div>{children}</div>

      {/* Hide swapWith below breakpoint, show above */}
      <div>{swapWith}</div>
    </div>
  );
}

function getBreakpointCSSVariables(swapAt: Breakpoints) {
  const breakpointIndex = breakpoints.findIndex(bp => bp === swapAt) + 1;

  const cssVariables = breakpoints.reduce((acc, bp, index) => {
    if (index < breakpointIndex) {
      return {
        ...acc,
        [`--swapped-display-${bp}`]: "contents",
        [`--default-display-${bp}`]: "none",
      };
    } else {
      return {
        ...acc,
        [`--swapped-display-${bp}`]: "none",
        [`--default-display-${bp}`]: "contents",
      };
    }
  }, {} as Record<string, string>);

  return cssVariables;
}
