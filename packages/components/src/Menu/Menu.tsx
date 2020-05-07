import React, {
  MouseEvent,
  ReactElement,
  createRef,
  useLayoutEffect,
  useState,
} from "react";
import uuid from "uuid";
import classnames from "classnames";
import styles from "./Menu.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon, IconNames } from "../Icon";

interface MenuProps {
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

export function Menu({ activator, items }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("below");
  const wrapperRef = createRef<HTMLDivElement>();
  const buttonID = uuid();
  const menuID = uuid();

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      const bounds = wrapperRef.current.getBoundingClientRect();
      if (bounds.top <= window.innerHeight / 2) {
        setPosition("below");
      } else {
        setPosition("above");
      }
    }
  }, [visible]);

  if (!activator) {
    activator = <Button label="More Actions" icon="more" type="secondary" />;
  }

  const menuClasses = classnames(
    styles.menu,
    position === "above" && styles.above,
    position === "below" && styles.below,
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {React.cloneElement(activator, {
        onClick: toggle(activator.props.onClick),
        id: buttonID,
        ariaControls: menuID,
        ariaExpanded: visible,
        ariaHaspopup: true,
      })}
      {visible && (
        <>
          <div className={styles.overlay} onClick={toggle()} />
          <div
            className={menuClasses}
            role="menu"
            aria-labelledby={buttonID}
            id={menuID}
            onClick={hide}
          >
            {items.map((item, key: number) => (
              <div key={key} className={styles.section}>
                {item.header && <SectionHeader text={item.header} />}

                {item.actions.map(action => (
                  <Action key={action.label} {...action} />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
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
}

interface SectionHeaderProps {
  text: string;
}

function SectionHeader({ text }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader} aria-hidden={true}>
      <Typography
        element="h6"
        size="small"
        textCase="uppercase"
        textColor="greyBlue"
        fontWeight="bold"
      >
        {text}
      </Typography>
    </div>
  );
}

interface ActionProps {
  /**
   * Action label
   */
  label: string;

  /**
   * Visual cue for the action label
   */
  icon?: IconNames;

  /**
   * Callback when an action gets clicked
   */
  onClick?(): void;
}

function Action({ label, icon, onClick }: ActionProps) {
  return (
    <button
      role="menuitem"
      className={styles.action}
      key={label}
      onClick={onClick}
    >
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
      <Typography element="span" size="base" textColor="greyBlueDark">
        {label}
      </Typography>
    </button>
  );
}
