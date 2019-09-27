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
import styles from "./Tooltip.css";
import { Text } from "../Text";

interface TooltipProps {
  readonly children: ReactElement;
  /**
   * Tooltip text
   */
  readonly message: string;
}

type Direction = "above" | "below";

export function Tooltip({ message, children }: TooltipProps) {
  const [direction, setDirection] = useState("above" as Direction);
  const [position, setPosition] = useState({ top: "0px", left: "0px" });
  const [show, setShow] = useState(false);
  const tooltipRef = createRef<HTMLDivElement>();
  const shadowRef = createRef<HTMLSpanElement>();

  showOnHover();
  useEffect(() => {
    if (
      tooltipRef.current &&
      shadowRef.current &&
      shadowRef.current.nextElementSibling
    ) {
      const activator = shadowRef.current.nextElementSibling;
      const activatorBounds = activator.getBoundingClientRect();
      if (activatorBounds.top <= 100) {
        setDirection("below");
        setPosition(getPosition("below", activatorBounds, tooltipRef.current));
      } else {
        setDirection("above");
        setPosition(getPosition("above", activatorBounds, tooltipRef.current));
      }
    }
  }, [show]);

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
          {show && (
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

  function showOnHover() {
    useEffect(() => {
      const showTooltip = () => {
        setShow(true);
      };

      const hideTooltip = () => {
        setShow(false);
      };

      if (shadowRef.current && shadowRef.current.nextElementSibling) {
        const activator = shadowRef.current.nextElementSibling;
        activator.addEventListener("mouseenter", showTooltip);
        activator.addEventListener("mouseleave", hideTooltip);
      }
    }, []);
  }
}

function getPosition(
  direction: Direction,
  bounds: ClientRect,
  tooltip: HTMLDivElement,
) {
  const xOffset = bounds.right - bounds.width / 2 - tooltip.clientWidth / 2;

  if (direction === "below") {
    return {
      top: `${bounds.bottom + window.scrollY}px`,
      left: `${xOffset}px`,
    };
  } else {
    return {
      top: `${bounds.top + window.scrollY - tooltip.clientHeight}px`,
      left: `${xOffset}px`,
    };
  }
}

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
