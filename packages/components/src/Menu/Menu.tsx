import React, {
  MouseEvent,
  ReactElement,
  RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { IconNames } from "@jobber/design";
import { usePopper } from "react-popper";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import ReactDOM from "react-dom";
import styles from "./Menu.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

const variation = {
  overlayStartStop: { opacity: 0 },
  startOrStop: (position: string) => {
    let y = 10;

    if (position === "below") y *= -1;
    if (window.innerWidth < 640) y = 150;

    return { opacity: 0, y };
  },
  done: { opacity: 1, y: 0 },
};

export interface MenuProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items: SectionProps[];
}

export interface SectionProps {
  /**
   * Defines the section header to further explain the group of actions.
   */
  header?: string;

  /**
   * List of actions.
   */
  actions: Omit<ActionProps, "shouldFocus">[];
}

// eslint-disable-next-line max-statements
export function Menu({ activator, items }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const fullWidth = activator?.props?.fullWidth || false;
  // const wrapper = useRef<HTMLDivElement>(null);
  // const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);

  const buttonID = useId();
  const menuID = useId();

  useOnKeyDown(handleKeyboardShortcut, ["Escape"]);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const {
    styles: popperStyles,
    attributes,
    state,
  } = usePopper(shadowRef.current?.nextElementSibling, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "flip",
        options: {
          // fallbackPlacements: ["top-start"]
          flipVariations: true,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });
  useRefocusOnActivator(visible);

  if (!activator) {
    activator = (
      <Button
        fullWidth={true}
        label="More Actions"
        icon="more"
        type="secondary"
      />
    );
  }

  // position related
  const menuClasses = classnames(styles.menu);

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      <span ref={shadowRef} style={{ display: "none" }} />
      {React.cloneElement(activator, {
        onClick: toggle(activator.props.onClick),
        id: buttonID,
        ariaControls: menuID,
        ariaExpanded: visible,
        ariaHaspopup: true,
      })}
      <MenuPortal>
        <AnimatePresence>
          {visible && (
            <>
              <motion.div
                className={styles.overlay}
                onClick={toggle()}
                variants={variation}
                initial="overlayStartStop"
                animate="done"
                exit="overlayStartStop"
                transition={{
                  type: "tween",
                  duration: 0.15,
                }}
              />
              <div
                ref={setPopperElement}
                {...attributes.popper}
                style={popperStyles.popper}
                className={styles.popperContainer}
              >
                <motion.div
                  className={menuClasses}
                  role="menu"
                  aria-labelledby={buttonID}
                  id={menuID}
                  onClick={hide}
                  variants={variation}
                  initial="startOrStop"
                  animate="done"
                  exit="startOrStop"
                  // custom={position}
                  transition={{
                    type: "tween",
                    duration: 0.25,
                  }}
                >
                  {items.map((item, key: number) => (
                    <div key={key} className={styles.section}>
                      {item.header && <SectionHeader text={item.header} />}

                      {item.actions.map((action, index) => (
                        <Action
                          sectionLabel={item.header}
                          key={action.label}
                          shouldFocus={key === 0 && index === 0}
                          {...action}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </MenuPortal>
    </div>
  );

  function toggle(callbackPassthrough?: (event?: MouseEvent) => void) {
    return (event: MouseEvent) => {
      setVisible(!visible);
      callbackPassthrough && callbackPassthrough(event);
    };
  }

  function hide() {
    setVisible(false);
  }

  function handleKeyboardShortcut(event: KeyboardEvent) {
    const { key } = event;
    if (!visible) return;

    event.preventDefault();
    event.stopPropagation();
    key === "Escape" && hide();
  }

  function handleParentClick(event: MouseEvent<HTMLDivElement>) {
    // Since the menu is being rendered within the same parent as the activator,
    // we need to stop the click event from bubbling up. If the Menu component
    // gets added within a parent that has a click handler, any click on the
    // menu will trigger the parent's click handler.
    event.stopPropagation();
  }
}

interface SectionHeaderProps {
  readonly text: string;
}

function SectionHeader({ text }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader} aria-hidden={true}>
      <Typography
        element="h6"
        size="base"
        textColor="textSecondary"
        fontWeight="regular"
      >
        {text}
      </Typography>
    </div>
  );
}

export interface ActionProps {
  /**
   * Action label
   */
  readonly label: string;

  /**
   * Parent Section Label
   */
  readonly sectionLabel?: string;

  /**
   * Visual cue for the action label
   */
  readonly icon?: IconNames;

  /**
   * Callback when an action gets clicked
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;

  /**
   * Focus on the action when rendered
   */
  readonly shouldFocus?: boolean;
}

function Action({
  label,
  sectionLabel,
  icon,
  onClick,
  shouldFocus = false,
}: ActionProps) {
  const actionButtonRef = useRef() as RefObject<HTMLButtonElement>;

  useEffect(() => {
    if (shouldFocus) {
      // Focus on the next tick to allow useRefocusOnActivator to initialize
      setTimeout(() => actionButtonRef.current?.focus(), 0);
    }
  }, [shouldFocus]);

  return (
    <button
      role="menuitem"
      type="button"
      className={styles.action}
      key={label}
      onClick={onClick}
      ref={actionButtonRef}
    >
      {icon && <Icon name={icon} />}
      <Typography
        element="span"
        fontWeight="semiBold"
        textColor="textSecondary"
      >
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </button>
  );
}

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
}
