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
import { Instance as PopperInstance, createPopper } from "@popperjs/core";
import styles from "./Tooltip.css";
import { Text } from "../Text";

const variation = {
  startOrStop: { scale: 0.6, opacity: 0 },
  done: { scale: 1, opacity: 1 },
};

interface TooltipProps {
  readonly children: ReactElement;
  /**
   * Tooltip text
   */
  readonly message: string;
}

type Direction = "above" | "below";

export function Tooltip({ message, children }: TooltipProps) {
  const [placement, setPlacement] = useState("above" as Direction);
  const [tooltipStyles, setTooltipStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});
  const [show, setShow] = useState(true);

  const tooltipRef = createRef<HTMLDivElement>();
  const arrowRef = createRef<HTMLDivElement>();
  const shadowRef = createRef<HTMLSpanElement>();

  showOnHover();

  const toolTipClassNames = classnames(
    styles.tooltipWrapper,
    placement === "below" && styles.below,
    placement === "above" && styles.above,
  );

  return (
    <>
      <span className={styles.shadowActivator} ref={shadowRef} />
      {children}
      <TooltipPortal>
        <AnimatePresence>
          <div
            className={toolTipClassNames}
            style={tooltipStyles}
            ref={tooltipRef}
          >
            {show && (
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
                <div
                  ref={arrowRef}
                  style={arrowStyles}
                  className={styles.arrow}
                ></div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </TooltipPortal>
    </>
  );

  function showOnHover() {
    const [popperInstance, setPopperInstance] = useState<
      PopperInstance | undefined
    >(undefined);

    useEffect(() => {
      if (popperInstance) popperInstance.update();
    }, [show]);

    useLayoutEffect(() => {
      const popper = setupPopper();
      setPopperInstance(popper);
      setShow(false);

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

      return () => {
        if (popper) popper.destroy();

        if (shadowRef.current && shadowRef.current.nextElementSibling) {
          const activator = shadowRef.current.nextElementSibling;
          activator.removeEventListener("mouseenter", showTooltip);
          activator.removeEventListener("mouseleave", hideTooltip);
        }
      };
    }, []);
  }

  function setupPopper() {
    if (
      shadowRef.current &&
      shadowRef.current.nextElementSibling &&
      tooltipRef.current
    ) {
      const popper = createPopper(
        shadowRef.current.nextElementSibling,
        tooltipRef.current,
        {
          placement: "top",
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                padding: 5,
              },
            },
            {
              name: "flip",
              options: { padding: 50, fallbackPlacements: ["bottom"] },
            },
            {
              name: "arrow",
              options: { element: arrowRef.current, padding: 5 },
            },
            {
              name: "applyStyles",
              fn: data => {
                setTooltipStyles(data.state.styles.popper);
                setArrowStyles(data.state.styles.arrow);
                if (data.state.placement === "top") {
                  setPlacement("above");
                } else {
                  setPlacement("below");
                }
              },
            },
          ],
        },
      );

      return popper;
    } else {
      return undefined;
    }
  }
}

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
