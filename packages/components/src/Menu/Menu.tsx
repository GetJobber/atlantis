import React, { useState } from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon, IconNames } from "../Icon";
import styles from "./Menu.css";

interface MenuProps {
  readonly items: SectionProps[];
}

interface SectionProps {
  header: string;
  actions: ActionProps[];
}

export function Menu({ items }: MenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const buttonID = "buttonID"; // TODO: Make ID unique
  const menuID = "menuID"; // TODO: Make ID unique

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
  label: string;
  icon?: IconNames;
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
      <Typography element="h6" size="base" textColor="greyBlueDark">
        {label}
      </Typography>
    </button>
  );
}
