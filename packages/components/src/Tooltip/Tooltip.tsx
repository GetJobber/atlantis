import React, { ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import styles from "./Tooltip.css";
import { useTooltipPositioning } from "./useTooltipPositioning";
import { ClientOnly } from "../LightBox/ClientOnly";

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
      <ClientOnly>
        <TooltipPortal>
          {show && Boolean(message) && (
            <div
              className={toolTipClassNames}
              style={popperStyles.popper}
              ref={setTooltipRef}
              role="tooltip"
              {...attributes.popper}
            >
              <motion.div
                className={styles.tooltip}
                variants={variation}
                initial="startOrStop"
                animate="done"
                exit="startOrStop"
                transition={{
                  damping: 50,
                  stiffness: 500,
                }}
              >
                <p className={styles.tooltipMessage}>{message}</p>
                <div
                  ref={setArrowRef}
                  style={popperStyles.arrow}
                  className={styles.arrow}
                />
              </motion.div>
            </div>
          )}
        </TooltipPortal>
      </ClientOnly>
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

    useSafeLayoutEffect(() => {
      injectAttributes();
      addListeners();

      return () => {
        removeListeners();
      };
    }, []);
  }
}

interface TooltipPortalProps {
  readonly children: ReactNode;
}

function TooltipPortal({ children }: TooltipPortalProps) {
  return typeof document !== "undefined" ? (
    ReactDOM.createPortal(children, document.body)
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
}
