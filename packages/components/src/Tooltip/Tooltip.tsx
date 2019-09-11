import React, {
  ReactElement,
  ReactNode,
  createRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
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
  const [direction, setDirection] = useState("above");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: "auto", left: "auto" });
  const tooltipRef = createRef<HTMLDivElement>();
  const shadowRef = createRef<HTMLSpanElement>();

  bindHover(shadowRef, setVisible);

  useLayoutEffect(() => {
    tooltipRef.current && findDirection(tooltipRef.current, setDirection);
    shadowRef.current &&
      findPosition(shadowRef.current, direction, setPosition);
  }, [visible]);

  const toolTipClassNames = classnames(
    styles.tooltip,
    direction === "below" && styles.below,
    direction === "above" && styles.above,
  );

  return (
    <>
      <span className={styles.wrapper} ref={shadowRef} />
      {children}
      <TooltipPortal>
        {visible && (
          <div className={toolTipClassNames} ref={tooltipRef} style={position}>
            <Text>{message}</Text>
          </div>
        )}
      </TooltipPortal>
    </>
  );
}

function bindHover(
  node: React.RefObject<HTMLSpanElement>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const showTooltip = () => {
      setVisible(true);
    };

    const hideTooltip = () => {
      setVisible(false);
    };

    if (node.current && node.current.nextElementSibling) {
      const activator = node.current.nextElementSibling;
      activator.addEventListener("mouseenter", showTooltip);
      activator.addEventListener("mouseleave", hideTooltip);
    }

    return () => {
      window.removeEventListener("mouseenter", showTooltip);
      window.removeEventListener("mouseleave", hideTooltip);
    };
  }, []);
}

function findPosition(
  node: HTMLElement,
  direction: string,
  setPositionCallback: React.Dispatch<
    React.SetStateAction<{
      top: string;
      left: string;
    }>
  >,
) {
  if (node && node.nextElementSibling) {
    const activator = node.nextElementSibling;
    const bounds = activator.getBoundingClientRect();

    if (direction === "above") {
      setPositionCallback({
        top: `${bounds.top - bounds.height - 8}px`,
        left: `${bounds.right - bounds.width / 2}px`,
      });
    } else {
      setPositionCallback({
        top: `${bounds.top + bounds.height + 8}px`,
        left: `${bounds.right - bounds.width / 2}px`,
      });
    }
  }
}

function findDirection(
  node: HTMLElement,
  setDirectionCallback: { (state: string): void },
) {
  if (node) {
    const tipBounds = node.getBoundingClientRect();
    if (tipBounds.top <= window.innerHeight / 2) {
      setDirectionCallback("below");
    } else {
      setDirectionCallback("above");
    }
  }
}

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
