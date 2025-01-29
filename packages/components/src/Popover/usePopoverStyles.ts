import classnames from "classnames";
import { PopoverProps } from "./types";
import classes from "./Popover.module.css";

export const usePopoverStyles = ({
  UNSAFE_className,
}: Pick<PopoverProps, "UNSAFE_className">) => {
  const popoverClassNames = classnames(
    classes.popover,
    UNSAFE_className?.container,
  );
  const dismissButtonClassNames = classnames(
    classes.dismissButton,
    UNSAFE_className?.dismissButtonContainer,
  );
  const arrowClassNames = classnames(classes.arrow, UNSAFE_className?.arrow);

  return { popoverClassNames, arrowClassNames, dismissButtonClassNames };
};
