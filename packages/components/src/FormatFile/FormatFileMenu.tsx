import { IconNames } from "@jobber/design";
import React from "react";
import styles from "./FormatFile.css";
import { Button } from "../Button";
import { Menu, SectionProps } from "../Menu";

export interface Action {
  readonly icon?: IconNames;
  readonly label: string;
  onClick(): void;
}

interface FormatFileMenuProps {
  readonly actions: Action[];
}

export function FormatFileMenu({ actions }: FormatFileMenuProps) {
  const items: SectionProps[] = [
    {
      actions: actions.map(action => ({
        label: action.label,
        icon: action.icon,
        onClick: action.onClick,
      })),
    },
  ];

  return (
    <div className={styles.menu}>
      <Menu
        activator={
          <Button
            icon="more"
            type="secondary"
            variation="subtle"
            ariaLabel="Actions Menu"
          />
        }
        items={items}
      />
    </div>
  );
}
