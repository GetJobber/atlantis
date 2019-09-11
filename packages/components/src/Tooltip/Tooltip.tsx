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
import { AnimatePresence, motion } from "framer-motion";
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
    if (
      tooltipRef.current &&
      shadowRef.current &&
      shadowRef.current.nextElementSibling
    ) {
      const activatorBounds = shadowRef.current.nextElementSibling.getBoundingClientRect();
      const tipBounds = tooltipRef.current.getBoundingClientRect();
      const activatorCenter = activatorBounds.width / 2;
      const tipCenter = tipBounds.width / 2;
      const xOffset = activatorBounds.right - activatorCenter - tipCenter;

      if (tipBounds.top <= window.innerHeight / 2) {
        setDirection("below");
        setPosition({
          top: `${activatorBounds.bottom}px`,
          left: `${xOffset}px`,
        });
      } else {
        setDirection("above");
        setPosition({
          top: `${activatorBounds.top - tipBounds.height}px`,
          left: `${xOffset}px`,
        });
      }
    }
  }, [visible]);

  const toolTipClassNames = classnames(
    styles.tooltipWrapper,
    direction === "below" && styles.below,
    direction === "above" && styles.above,
  );

  return (
    <>
      <span className={styles.wrapper} ref={shadowRef} />
      {children}
      <TooltipPortal>
        <AnimatePresence>
          {visible && (
            <div
              className={toolTipClassNames}
              ref={tooltipRef}
              style={position}
            >
              <motion.div
                className={styles.tooltip}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
              >
                <Text>{message}</Text>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </TooltipPortal>
    </>
  );
}

function bindHover(
  node: React.RefObject<HTMLSpanElement>,
  setVisibleCallback: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const showTooltip = () => {
      setVisibleCallback(true);
    };

    const hideTooltip = () => {
      setVisibleCallback(false);
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

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
