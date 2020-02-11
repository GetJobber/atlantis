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
import { createPopper } from "@popperjs/core";
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
  const [position, setPosition] = useState({
    transform: "translate(0px, 0px)",
  });
  const [show, setShow] = useState(true);
  const tooltipRef = createRef<HTMLDivElement>();
  const shadowRef = createRef<HTMLSpanElement>();

  // showOnHover();
  // positionTooltip();

  useLayoutEffect(() => {
    let popperInstance: ReturnType<typeof createPopper>;
    if (
      shadowRef.current &&
      shadowRef.current.nextElementSibling &&
      tooltipRef.current
    ) {
      popperInstance = createPopper(
        shadowRef.current.nextElementSibling,
        tooltipRef.current,
        {
          modifiers: [
            {
              name: "applyStyles",
              fn: data => {
                console.log({ data });
                setPosition({ transform: data.state.styles.popper.transform });
              },
            },
          ],
        },
      );
    }

    return () => {
      popperInstance.destroy();
    };
  }, []);

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

  // function positionTooltip() {
  //   useEffect(() => {
  //     if (
  //       tooltipRef.current &&
  //       shadowRef.current &&
  //       shadowRef.current.nextElementSibling
  //     ) {
  //       const { bounds, positionStyle } = getPosition(
  //         shadowRef.current.nextElementSibling,
  //         tooltipRef.current,
  //       );
  //       if (bounds.top <= 100) {
  //         setDirection("below");
  //         setPosition(positionStyle.below);
  //       } else {
  //         setDirection("above");
  //         setPosition(positionStyle.above);
  //       }
  //     }
  //   }, [show]);
  // }

  // function showOnHover() {
  //   useEffect(() => {
  //     const showTooltip = () => {
  //       setShow(true);
  //     };

  //     const hideTooltip = () => {
  //       setShow(false);
  //     };

  //     if (shadowRef.current && shadowRef.current.nextElementSibling) {
  //       const activator = shadowRef.current.nextElementSibling;
  //       activator.addEventListener("mouseenter", showTooltip);
  //       activator.addEventListener("mouseleave", hideTooltip);
  //     }
  //   }, []);
  // }
}

function getPosition(activator: Element, tooltip: HTMLDivElement) {
  const bounds = activator.getBoundingClientRect();
  const xOffset = bounds.right - bounds.width / 2 - tooltip.clientWidth / 2;
  const positionStyle = {
    above: {
      top: `${bounds.top + window.scrollY - tooltip.clientHeight}px`,
      left: `${xOffset}px`,
    },
    below: {
      top: `${bounds.bottom + window.scrollY}px`,
      left: `${xOffset}px`,
    },
  };

  return { bounds, positionStyle };
}

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
