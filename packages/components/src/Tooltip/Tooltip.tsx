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
      const activator = shadowRef.current.nextElementSibling;
      const tooltip = tooltipRef.current;
      const activatorBounds = activator.getBoundingClientRect();
      const xOffset =
        activatorBounds.right -
        activatorBounds.width / 2 -
        tooltip.clientWidth / 2;
      const clientY = getCumulativeScrollTop(activator);
      const pageY = getCumulativeOffsetTop(activator);

      if (activatorBounds.top <= 100) {
        setDirection("below");
        setPosition({
          top: `${activatorBounds.bottom + window.scrollY}px`,
          left: `${xOffset}px`,
        });
      } else {
        setDirection("above");
        setPosition({
          top: `${pageY - clientY + window.scrollY - tooltip.clientHeight}px`,
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

  const variation = {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.6, opacity: 0 },
  };

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
                variants={variation}
                initial="initial"
                animate="animate"
                exit="exit"
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

/**
 * Calculate cumulative scrollTop from an Element.
 * @param {Element} node - Element to calculate cumulative scrollTop from.
 * @returns {number} - cumulativeScrollTop
 */
function getCumulativeScrollTop(node?: Node) {
  let cumulativeScrollTop = 0;

  while (node) {
    if (node instanceof Element) {
      cumulativeScrollTop += node.scrollTop || 0;
    }

    node = node.parentNode || undefined;
  }

  return cumulativeScrollTop;
}

function getCumulativeOffsetTop(node?: HTMLElement) {
  let cumulativeOffsetTop = 0;

  while (node) {
    if (node instanceof HTMLElement) {
      cumulativeOffsetTop += node.offsetTop || 0;
    }
    node = node.offsetParent || undefined;
  }

  return cumulativeOffsetTop;
}
