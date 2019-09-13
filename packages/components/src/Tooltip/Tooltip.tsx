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
}

export function Tooltip({ message, children }: TooltipProps) {
  const [direction, setDirection] = useState("above");
  const [showOnLoad, setShowOnLoad] = useState(false);
  const [position, setPosition] = useState({ top: "0px", left: "0px" });
  const tooltipRef = createRef<HTMLDivElement>();
  const shadowRef = createRef<HTMLSpanElement>();

  showOnHover(shadowRef, setShowOnLoad);

  useEffect(() => {
    if (
      tooltipRef.current &&
      shadowRef.current &&
      shadowRef.current.nextElementSibling
    ) {
      const activator = shadowRef.current.nextElementSibling;
      const tooltip = tooltipRef.current;
      const activatorBounds = activator.getBoundingClientRect();
      const xOffset =
        activatorBounds.right -
        activatorBounds.width / 2 -
        tooltip.clientWidth / 2;

      if (activatorBounds.top <= 100) {
        setDirection("below");
        setPosition({
          top: `${activatorBounds.bottom + window.scrollY}px`,
          left: `${xOffset}px`,
        });
      } else {
        setDirection("above");
        setPosition({
          top: `${activatorBounds.top +
            window.scrollY -
            tooltip.clientHeight}px`,
          left: `${xOffset}px`,
        });
      }
    }
  }, [showOnLoad]);

  const toolTipClassNames = classnames(
    styles.tooltipWrapper,
    direction === "below" && styles.below,
    direction === "above" && styles.above,
  );

  const variation = {
    startOrStop: { scale: 0.6, opacity: 0 },
    done: { scale: 1, opacity: 1 },
  };

  return (
    <>
      <span className={styles.shadowActivator} ref={shadowRef} />
      {children}
      <TooltipPortal>
        <AnimatePresence>
          {showOnLoad && (
            <div
              className={toolTipClassNames}
              style={position}
              ref={tooltipRef}
            >
              <motion.div
                className={styles.tooltip}
                variants={variation}
                initial="startOrStop"
                animate="done"
                exit="startOrStop"
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
