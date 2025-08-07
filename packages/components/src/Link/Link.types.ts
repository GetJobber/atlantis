import { IconNames } from "@jobber/design";
import { CSSProperties } from "react";

export type LinkVariation = "work" | "learning" | "subtle" | "destructive";
export type LinkSize = "small" | "base" | "large";
export type LinkType = "primary" | "secondary" | "tertiary";

export interface LinkProps {
  readonly url: string;
  readonly ariaLabel?: string;
  readonly ariaExpanded?: boolean;
  readonly external?: boolean;
  
  /**
   * Visual style variation for the link
   */
  readonly variation?: LinkVariation;
  
  /**
   * Visual prominence of the link
   */
  readonly type?: LinkType;
  
  /**
   * Size of the link
   */
  readonly size?: LinkSize;
  
  /**
   * Make the link take up the full width of its container
   */
  readonly fullWidth?: boolean;
  
  /**
   * Icon to display in the link
   */
  readonly icon?: IconNames;
  
  /**
   * Position icon on the right side
   */
  readonly iconOnRight?: boolean;
  
  /**
   * Disable the link
   */
  readonly disabled?: boolean;
  
  /**
   * Show loading state
   */
  readonly loading?: boolean;
  
  /**
   * Additional aria-controls attribute
   */
  readonly ariaControls?: string;
  
  /**
   * Additional aria-haspopup attribute
   */
  readonly ariaHaspopup?: boolean;
  
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   */
  readonly UNSAFE_className?: {
    container?: string;
  };
  
  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
  };
}