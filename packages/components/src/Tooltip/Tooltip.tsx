import React, { ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import styles from "./Tooltip.module.css";
import { useTooltipPositioning } from "./useTooltipPositioning";
import { Intent, Placement } from "./Tooltip.types";

const variation = {
  startOrStop: { opacity: 0 },
  done: { opacity: 1 },
};

interface TooltipProps {
  readonly children: ReactElement;
  /**
   * Tooltip text
   */
  readonly message: string;
  /**
   * Describes the preferred placement of the Popover.
   * @default 'top'
   */
  readonly preferredPlacement?: Placement;
  /**
   * The intent of the tooltip.
   * @default 'info'
   */
  readonly intent?: Intent;

  readonly setTabIndex?: boolean;
}

export function Tooltip({
  message,
  children,
  preferredPlacement = "top",
  intent = "info",
  setTabIndex = true,
}: TooltipProps) {
  const [show, setShow] = useState(false);

  const {
    attributes,
    placement,
    shadowRef,
    styles: popperStyles,
    setArrowRef,
    setTooltipRef,
  } = useTooltipPositioning({ preferredPlacement: preferredPlacement });

  initializeListeners();

  const toolTipClassNames = classnames(
    styles.tooltipWrapper,
    placement === "bottom" && styles.bottom,
    placement === "top" && styles.top,
    placement === "left" && styles.left,
    placement === "right" && styles.right,
  );

  return (
    <>
      <span className={styles.shadowActivator} ref={shadowRef} />
      {intent === "help" ? (
        <span className={styles.help}>{children}</span>
      ) : (
        <>{children}</>
      )}
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
                ease: "easeOut",
                duration: 0.15,
                delay: 0.3,
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

        if (setTabIndex) {
          activator.setAttribute("tabindex", "0"); // enable focus
        }
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
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
}
