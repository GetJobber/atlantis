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
  const [toolTipBelow, setToolTipBelow] = useState(true);
  const [visible, setVisible] = useState(true);
  const tooltipRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const bounds = tooltipRef.current.getBoundingClientRect();
      if (bounds.top <= window.innerHeight / 2) {
        setToolTipBelow(false);
      } else {
        setToolTipBelow(true);
      }
    }
  }, [visible]);

  const toolTipClassNames = classnames(
    styles.tooltip,
    toolTipBelow && styles.below,
    !toolTipBelow && styles.above,
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
