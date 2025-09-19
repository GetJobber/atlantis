import React, { ComponentProps, ReactNode } from "react";
import { Canvas } from "@storybook/addon-docs";

interface CustomCanvasProps extends ComponentProps<typeof Canvas> {
  readonly children: ReactNode | (() => void);
}

/**
 * Storybook Doc Canvas doesn't allow `() => void` child so this component makes
 * it happen.
 */
export function CustomCanvas({ children, ...props }: CustomCanvasProps) {
  return (
    <Canvas {...props}>
      {typeof children === "function" ? children() : children}
    </Canvas>
  );
}
