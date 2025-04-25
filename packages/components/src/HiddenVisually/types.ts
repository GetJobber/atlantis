import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHelpers/types";

export interface HiddenVisuallyProps extends CommonAtlantisProps {
  above?: "small" | "medium" | "large" | "extraLarge";
  below?: "small" | "medium" | "large" | "extraLarge";
  children: React.ReactNode;
  as?: CommonAllowedElements;
  /** **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  UNSAFE_className?: string;

  /** **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  UNSAFE_style?: React.CSSProperties;
}
