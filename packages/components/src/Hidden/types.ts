import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHelpers/types";

export interface HiddenProps extends CommonAtlantisProps {
  as: CommonAllowedElements;
  above?: "small" | "medium" | "large" | "extraLarge";
  below?: "small" | "medium" | "large" | "extraLarge";
  children: React.ReactNode;
  /** **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
  };
  /** **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: React.CSSProperties;
  };
}
