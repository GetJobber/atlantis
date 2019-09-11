import React, {
  ReactElement,
  createRef,
  useLayoutEffect,
  useState,
} from "react";
import classnames from "classnames";
import { Text } from "../Text";
import styles from "./Tooltip.css";

interface TooltipProps {
  /**
   * Tooltip text
   */
  readonly message: string;
  /**
   * Content to show tooltip on.
   */
  readonly children: ReactElement;
}

export function Tooltip({ message, children }: TooltipProps) {
  const [toolTipAbove, setToolTipAbove] = useState(true);
  const [visible, setVisible] = useState(true);
  const tooltipRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const bounds = tooltipRef.current.getBoundingClientRect();
      if (bounds.top <= window.innerHeight / 2) {
        setToolTipAbove(true);
      } else {
        setToolTipAbove(false);
      }
    }
  }, [visible]);

  const toolTipClassNames = classnames(
    styles.tooltip,
    toolTipAbove && styles.below,
    !toolTipAbove && styles.above,
  );

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={toggleTooltip}
      onMouseLeave={toggleTooltip}
    >
      {children}
      {visible && (
        <div className={toolTipClassNames} ref={tooltipRef}>
          <Text>{message}</Text>
        </div>
      )}
    </span>
  );
}
