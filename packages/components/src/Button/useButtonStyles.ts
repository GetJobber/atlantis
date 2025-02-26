import classnames from "classnames";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";

export interface UseButtonStyles {
  /**
   * The class names styling the button element
   */
  buttonClassNames: string;
  /**
   * The class names styling the button children. This is used for adding the correct spacing between the icon and label inside of the button
   */
  buttonChildrenStyles: string;
}
export type UseButtonStylesProps = Pick<
  ButtonProps,
  "size" | "disabled" | "fullWidth" | "loading" | "variation" | "type"
>;

export function useButtonStyles({
  size = "base",
  disabled,
  fullWidth,
  loading,
  variation = "work",
  type = "primary",
}: UseButtonStylesProps) {
  const buttonClassNames = classnames(styles.button, styles[size], {
    [styles[variation]]: variation,
    [styles[type]]: type,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
    [styles.loading]: loading,
  });
  const buttonChildrenStyles = classnames(styles.buttonChildren);

  return { buttonClassNames, buttonChildrenStyles };
}
