import React, { useState } from "react";
import uuid from "uuid";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon, IconNames } from "../Icon";
import styles from "./Menu.css";

interface MenuProps {
  /**
   * Collection of action items.
   */
  readonly items: SectionProps[];
}

interface SectionProps {
  /**
   * Defines the section header to further explain the group of actions.
   */
  header?: string;

  /**
   * List of actions.
   */
  actions: ActionProps[];
}

export function Menu({ items }: MenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const buttonID = uuid();
  const menuID = uuid();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        ariaControls={menuID}
        ariaExpanded={showMenu}
        ariaHaspopup={true}
        label="More"
        icon="more"
        id={buttonID}
        type="secondary"
        onClick={toggleMenu}
      />

      {showMenu && (
        <>
          <div
            className={styles.menu}
            role="menu"
            aria-labelledby={buttonID}
            id={menuID}
            data-testid="menu-popup"
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

          <div className={styles.overlay} onClick={toggleMenu} />
        </>
      )}
    </div>
  );
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
