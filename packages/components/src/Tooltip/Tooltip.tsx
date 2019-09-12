import React, {
  ReactElement,
  ReactNode,
  createRef,
  useEffect,
  useState,
} from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Text } from "../Text";
import styles from "./Tooltip.css";

interface TooltipProps {
  readonly children: ReactElement;
  /**
   * Tooltip text
   */
  readonly message: string;

  /**
   * Show the tooltip on load
   */
  readonly showOnLoad?: boolean;
}

export function Tooltip({
  message,
  children,
  showOnLoad = false,
}: TooltipProps) {
  const [direction, setDirection] = useState("above");
  const [visible, setVisible] = useState(showOnLoad);
  const [position, setPosition] = useState({ top: "0px", left: "0px" });
  const tooltipRef = createRef<HTMLDivElement>();
  const shadowRef = createRef<HTMLSpanElement>();

  !showOnLoad && showOnHover(shadowRef, setVisible);

  useEffect(() => {
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

      if (activatorBounds.top <= 100) {
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
      <span className={styles.shadowActivator} ref={shadowRef} />
      {children}
      <TooltipPortal>
        <AnimatePresence>
          {visible && (
            <div
              className={toolTipClassNames}
              style={position}
              ref={tooltipRef}
            >
              <motion.div
                className={styles.tooltip}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{
                  type: "spring",
                  duration: 0.2,
                  damping: 20,
                  stiffness: 300,
                }}
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

function showOnHover(
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
  }, []);
}

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
