import React, {
  MouseEvent,
  ReactElement,
  useId,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useWindowDimensions } from "@jobber/hooks/useWindowDimensions";
import { IconNames } from "@jobber/design";
import { usePopper } from "react-popper";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import ReactDOM from "react-dom";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { List, ListItemProps } from "@jobber/components/List";
import styles from "./Menu.module.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";

const SMALL_SCREEN_BREAKPOINT = 490;
const MENU_OFFSET = 6;

const variation = {
  overlayStartStop: { opacity: 0 },
  startOrStop: (placement: string | undefined) => {
    let y = 10;

    if (placement?.includes("bottom")) y *= -1;
    if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) y = 150;

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
  actions: ActionProps[];
}

interface MenuListItems extends ListItemProps {
  destructive?: boolean;
}

// eslint-disable-next-line max-statements
export function Menu({ activator, items }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const shadowRef = useRef<HTMLSpanElement>(null);

  const { width } = useWindowDimensions();

  const buttonID = useId();
  const menuID = useId();

  const fullWidth = activator?.props?.fullWidth || false;

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  useOnKeyDown(handleKeyboardShortcut, ["Escape"]);

  // we're doing a lot of iteration now, memoize this value and building
  const listItems: MenuListItems[] = items.reduce((acc, curr) => {
    // iterate again
    // conditionally assign key/value pairs
    curr.actions.forEach(action => {
      const currentItem: MenuListItems = {
        id: action.label,
        content: action.label,
        ...(curr.header && { section: curr.header }),
        ...(action.destructive && { destructive: action.destructive }),
        ...(action.onClick && { onClick: action.onClick }),
        ...(action.icon && { icon: action.icon }),
      };

      acc.push(currentItem);
    });

    return acc;
  }, [] as MenuListItems[]);

  console.log(listItems);

  // useRefocusOnActivator must come before useFocusTrap for them both to work
  useRefocusOnActivator(visible);
  const menuRef = useFocusTrap<HTMLDivElement>(visible);

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const {
    styles: popperStyles,
    attributes,
    state,
  } = usePopper(shadowRef.current?.nextElementSibling, popperElement, {
    placement: "bottom-start",
    strategy: "fixed",
    modifiers: [
      {
        name: "flip",
        options: {
          flipVariations: true,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, MENU_OFFSET],
        },
      },
    ],
  });
  const positionAttributes =
    width >= SMALL_SCREEN_BREAKPOINT
      ? {
          ...attributes.popper,
          style: popperStyles.popper,
        }
      : {};

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

  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      <span ref={shadowRef} className={styles.shadowRef} />
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
                className={styles.popperContainer}
                {...positionAttributes}
                {...formFieldFocusAttribute}
              >
                {items.length > 0 && (
                  <motion.div
                    className={styles.menu}
                    role="menu"
                    data-elevation={"elevated"}
                    aria-labelledby={buttonID}
                    id={menuID}
                    onClick={hide}
                    variants={variation}
                    initial="startOrStop"
                    animate="done"
                    exit="startOrStop"
                    custom={state?.placement}
                    ref={menuRef}
                    transition={{
                      type: "tween",
                      duration: 0.25,
                    }}
                  >
                    <List
                      items={listItems}
                      customItemStyles={true}
                      customRenderItem={item => (
                        <div
                          style={{
                            borderRadius: "8px",
                            display: "flex",
                            gap: "8px",
                            padding: "8px",
                            alignItems: "center",
                          }}
                        >
                          {item.icon && (
                            <div>
                              <Icon
                                color={
                                  item.destructive ? "destructive" : undefined
                                }
                                name={item.icon}
                              />
                            </div>
                          )}
                          <Typography
                            element="span"
                            fontWeight="semiBold"
                            textColor="text"
                          >
                            {item.content}
                          </Typography>
                        </div>
                      )}
                    />
                  </motion.div>
                )}
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
   * Visual style for the action button
   */
  readonly destructive?: boolean;

  /**
   * Callback when an action gets clicked
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
}
