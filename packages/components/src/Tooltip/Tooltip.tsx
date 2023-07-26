import React, {
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useState,
} from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import styles from "./Tooltip.css";
import { useTooltipPositioning } from "./useTooltipPositioning";
import { Text } from "../Text";

const variationUp = {
  startOrStop: { y: 3, opacity: 0 },
  done: { y: 0, opacity: 1 },
};

const variationDown = {
  startOrStop: { y: -3, opacity: 0 },
  done: { y: 0, opacity: 1 },
};

interface TooltipProps {
  readonly children: ReactElement;
  /**
   * Tooltip text
   */
  readonly message: string;
}

export function Tooltip({ message, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  const {
    attributes,
    placement,
    shadowRef,
    styles: popperStyles,
    setArrowRef,
    setTooltipRef,
  } = useTooltipPositioning();

  initializeListeners();

  const toolTipClassNames = classnames(
    styles.tooltipWrapper,
    placement === "bottom" && styles.below,
    placement === "top" && styles.above,
  );

  return (
    <>
      <span className={styles.shadowActivator} ref={shadowRef} />
      {children}
      <TooltipPortal>
        {show && (
          <div
            className={toolTipClassNames}
            style={popperStyles.popper}
            ref={setTooltipRef}
            role="tooltip"
            {...attributes.popper}
          >
            <motion.div
              className={styles.tooltip}
              variants={placement === "bottom" ? variationDown : variationUp}
              initial="startOrStop"
              animate="done"
              exit="startOrStop"
            >
              <Text>{message}</Text>
              <div
                ref={setArrowRef}
                style={popperStyles.arrow}
                className={styles.arrow}
              />
            </motion.div>
          </div>
        )}
      </TooltipPortal>
    </>
  );

  function initializeListeners() {
    const showTooltip = () => {
      setShow(true);
    };

    const hideTooltip = () => {
      setShow(false);
    };

    const injectAttributes = () => {
      if (shadowRef?.current?.nextElementSibling) {
        const activator = shadowRef.current.nextElementSibling;
        // Manually inject "aria-description" and "tabindex" to let the screen
        // readers read the tooltip message.
        // This is to avoid having to add those attribute as a prop on every
        // component we have.
        activator.setAttribute("aria-description", message);
        activator.setAttribute("tabindex", "0"); // enable focus
      }
    };

    const addListeners = () => {
      if (shadowRef?.current?.nextElementSibling) {
        const activator = shadowRef.current.nextElementSibling;
        activator.addEventListener("mouseenter", showTooltip);
        activator.addEventListener("mouseleave", hideTooltip);
        activator.addEventListener("focus", showTooltip);
        activator.addEventListener("blur", hideTooltip);
      }
    };

    const removeListeners = () => {
      if (shadowRef?.current?.nextElementSibling) {
        const activator = shadowRef.current.nextElementSibling;
        activator.removeEventListener("mouseenter", showTooltip);
        activator.removeEventListener("mouseleave", hideTooltip);
        activator.removeEventListener("focus", showTooltip);
        activator.removeEventListener("blur", hideTooltip);
      }
    };

    useLayoutEffect(() => {
      injectAttributes();
      addListeners();

      return () => {
        removeListeners();
      };
    }, []);
  }
}

interface TooltipPortalProps {
  children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return ReactDOM.createPortal(children, document.body);
}
