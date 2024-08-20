import { IconNames } from "@jobber/design";
import React, { useEffect, useRef } from "react";
import styles from "./FormatFile.css";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export interface Action {
  readonly icon?: IconNames;
  readonly label: string;
  onClick(): void;
}

interface FormatFileMenuProps {
  readonly actions: Action[];
}

export function FormatFileMenu({ actions }: FormatFileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={styles.menu}>
      <Button
        onClick={toggleMenu}
        icon="more"
        type="secondary"
        variation="subtle"
        ariaLabel="Actions Menu"
      />
      {isOpen && (
        <ul className={styles.menuList}>
          {actions.map((action, index) => (
            <li
              key={index}
              className={styles.menuItem}
              onClick={action.onClick}
            >
              <Typography textColor="heading">{action.label}</Typography>
              {action.icon && <Icon name={action.icon} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
