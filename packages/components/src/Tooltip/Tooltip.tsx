import React, {
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { usePopper } from "react-popper";
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

export function Tooltip({ message, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const shadowRef = useRef<HTMLSpanElement>(null); // eslint-disable-line no-null/no-null
  const [positionElement, setPositionedElementRef] =
    useState<HTMLElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();

  const popper = usePopper(
    shadowRef.current?.nextElementSibling,
    positionElement,
    {
      placement: "top",
      modifiers: [
        { name: "flip", options: { fallbackPlacements: ["bottom"] } },
        {
          name: "arrow",
          options: { element: arrowElement, padding: 10 },
        },
      ],
    },
  );

  initializeListeners();

  const toolTipClassNames = classnames(
    styles.tooltipWrapper,
    popper.state?.placement === "bottom" && styles.below,
    popper.state?.placement === "top" && styles.above,
  );

  return (
    <>
      <span className={styles.shadowActivator} ref={shadowRef} />
      {children}
      <TooltipPortal>
        {show && (
          <div
            className={toolTipClassNames}
            style={popper.styles.popper}
            ref={setPositionedElementRef}
            role="tooltip"
            {...popper.attributes.popper}
          >
            <motion.div
              className={styles.tooltip}
              variants={variation}
              initial="startOrStop"
              animate="done"
              exit="startOrStop"
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
            >
              <Text>{message}</Text>
              <div
                ref={setArrowElement}
                style={popper.styles.arrow}
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
