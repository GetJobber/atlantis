import classnames from "classnames";
import styles from "./Button.module.css";
import { ButtonSize, ButtonType, ButtonVariation } from "./Button.types";
import { useButton } from "./ButtonProvider";

export interface UseButtonStyles {
  /**
   * The class names styling the button element
   */
  buttonWrapperStyles: string;
  /**
   * The class names styling the button children. This is used for adding the correct spacing between the icon and label inside of the button
   */
  buttonChildrenStyles: string;
}

/**
 * The props that are used to style the button
 */
export interface UseButtonStylesProps {
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  variation?: ButtonVariation;
  type?: ButtonType;
}

export function useButtonStyles({
  size: sizeProp,
  disabled,
  fullWidth,
  loading,
  variation = "work",
  type = "primary",
}: UseButtonStylesProps) {
  const { size: contextSize } = useButton();
  const size = sizeProp || contextSize;
  const buttonWrapperStyles = classnames(styles.button, styles[size], {
    [styles[variation]]: variation,
    [styles[type]]: type,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
    [styles.loading]: loading,
  });
  const buttonChildrenStyles = classnames(styles.buttonChildren);

  return { buttonWrapperStyles, buttonChildrenStyles };
}
