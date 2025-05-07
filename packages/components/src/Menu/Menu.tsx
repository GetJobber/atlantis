import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
  useRef,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { IconNames } from "@jobber/design";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import ReactDOM from "react-dom";
import styles from "./Menu.module.css";
import { useMenu } from "./useMenu";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";

export interface MenuProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items?: SectionProps[];

  /**
   * Custom menu item.
   */
  readonly children?: ReactNode;
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

// eslint-disable-next-line max-statements
export function Menu({ activator, items, children }: MenuProps) {
  const {
    activator: activatorElement,
    buttonID,
    positionAttributes,
    menuID,
    wrapperClasses,
    handleParentClick,
    toggle,
    hide,
    visible,
    variation,
    menuRef,
    setPopperElement,
    popperRef,
    state,
    fullWidth,
  } = useMenu({ activator });

  return (
    <Menu.Container
      wrapperClasses={wrapperClasses}
      handleParentClick={handleParentClick}
    >
      <Menu.Activator
        popperRef={popperRef}
        activatorElement={activatorElement}
        buttonID={buttonID}
        menuID={menuID}
        visible={visible}
        toggle={toggle}
        onClick={activator?.props.onClick}
      />
      <Menu.Body
        fullWidth={fullWidth}
        visible={visible}
        toggle={toggle}
        variation={variation}
        setPopperElement={setPopperElement}
        positionAttributes={positionAttributes}
      >
        {items && items.length > 0 ? (
          <Menu.Items
            buttonID={buttonID}
            menuID={menuID}
            hide={hide}
            variation={variation}
            menuRef={menuRef}
            state={state}
            fullWidth={fullWidth}
          >
            {items.map((item, key: number) => (
              <Menu.Item key={key}>
                {item.header && <Menu.SectionHeader text={item.header} />}

                {item.actions.map(action => (
                  <Menu.Action
                    sectionLabel={item.header}
                    key={action.label}
                    {...action}
                  />
                ))}
              </Menu.Item>
            ))}
          </Menu.Items>
        ) : (
          <Menu.Items
            buttonID={buttonID}
            menuID={menuID}
            hide={hide}
            variation={variation}
            menuRef={menuRef}
            state={state}
            fullWidth={fullWidth}
          >
            {children}
          </Menu.Items>
        )}
      </Menu.Body>
    </Menu.Container>
  );
}

Menu.Item = function MenuItem({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <div className={classnames(styles.section, className)}>{children}</div>
  );
};

Menu.Items = function MenuItemWrapper({
  children,
  buttonID,
  menuID,
  hide,
  variation,
  menuRef,
  state,
  fullWidth,
}: {
  readonly children: ReactNode;
  readonly buttonID: string;
  readonly menuID: string;
  readonly hide: () => void;
  readonly variation: {
    overlayStartStop: {
      opacity: number;
    };
  };
  readonly menuRef: RefObject<HTMLDivElement>;
  readonly state: {
    placement: string | undefined;
  } | null;
  readonly fullWidth: boolean;
}) {
  return (
    <motion.div
      className={classnames(styles.menu, {
        [styles.fullWidth]: fullWidth,
      })}
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
      {children}
    </motion.div>
  );
};

Menu.Container = function MenuContainer({
  children,
  wrapperClasses,
  handleParentClick,
}: {
  readonly children: ReactNode;
  readonly wrapperClasses: string;
  readonly handleParentClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      {children}
    </div>
  );
};

Menu.Body = function MenuBody({
  children,
  visible,
  toggle,
  variation,
  setPopperElement,
  positionAttributes,
}: {
  readonly children: ReactNode;
  readonly visible: boolean;
  readonly toggle: (
    callbackPassthrough?: (event?: MouseEvent) => void,
  ) => (event: MouseEvent) => void;
  readonly variation: {
    overlayStartStop: {
      opacity: number;
    };
    startOrStop: (placement: string | undefined) => {
      opacity: number;
      y: number;
    };
    done: {
      opacity: number;
      y: number;
    };
  };
  readonly setPopperElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  readonly positionAttributes: object;
  readonly fullWidth: boolean;
}) {
  return (
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
              {children}
            </div>
          </>
        )}
      </AnimatePresence>
    </MenuPortal>
  );
};

Menu.Activator = function MenuActivator({
  popperRef,
  activatorElement,
  buttonID,
  menuID,
  visible,
  toggle,
  onClick,
}: {
  readonly popperRef: RefObject<HTMLDivElement>;
  readonly activatorElement: ReactElement;
  readonly buttonID: string;
  readonly menuID: string;
  readonly visible: boolean;
  readonly toggle: (
    callbackPassthrough?: (event?: MouseEvent) => void,
  ) => (event: MouseEvent) => void;
  readonly onClick: () => void;
}) {
  return (
    <div ref={popperRef}>
      {React.cloneElement(activatorElement, {
        onClick: toggle(onClick),
        id: buttonID,
        ariaControls: menuID,
        ariaExpanded: visible,
        ariaHaspopup: true,
      })}
    </div>
  );
};
interface SectionHeaderProps {
  readonly text: string;
}

Menu.SectionHeader = function SectionHeader({ text }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader} aria-hidden={true}>
      <Typography
        element="h6"
        size="base"
        textColor="textSecondary"
        fontWeight="regular"
        textCase="none"
      >
        {text}
      </Typography>
    </div>
  );
};

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

Menu.Action = function Action({
  label,
  sectionLabel,
  icon,
  destructive,
  onClick,
}: ActionProps) {
  const actionButtonRef = useRef() as RefObject<HTMLButtonElement>;
  const buttonClasses = classnames(styles.action, {
    [styles.destructive]: destructive,
  });

  return (
    <button
      role="menuitem"
      type="button"
      className={buttonClasses}
      key={label}
      onClick={onClick}
      ref={actionButtonRef}
    >
      {icon && (
        <div>
          <Icon color={destructive ? "destructive" : undefined} name={icon} />
        </div>
      )}
      <Typography element="span" fontWeight="semiBold" textColor="text">
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </button>
  );
};

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
}
