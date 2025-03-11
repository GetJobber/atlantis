import classnames from "classnames";
import styles from "./Button.module.css";
import { ButtonSize, ButtonType, ButtonVariation } from "./Button.types";
import { useButton } from "./ButtonProvider";

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
  const wrapper = classnames(
    [styles.button, styles[size], styles[variation], styles[type]],
    {
      [styles.disabled]: disabled,
      [styles.fullWidth]: fullWidth,
      [styles.loading]: loading,
    },
  );
  const children = styles.buttonChildren;

  return {
    wrapper,
    children,
    combined: classnames(wrapper, children),
  };
}
