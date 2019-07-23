import React from "react";
import classnames from "classnames";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon, IconNames } from "../Icon";
import styles from "./Menu.css";

interface MenuProps {
  readonly actions: ActionProps[];
}

export function Menu({ actions }: MenuProps) {
  const wrapperClassNames = classnames(styles.wrapper);

  return (
    <div className={wrapperClassNames}>
      <Button
        label="More"
        icon="more"
        id={"fakeID" /* unique ID */}
        type="secondary"
      />

      <div
        className={styles.menu}
        role="menu"
        aria-labelledby={"fakeID" /* ID of button */}
        id={"menufakeID" /* Unique ID */}
      >
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Typography
              size="small"
              textCase="uppercase"
              textColor="greyBlue"
              fontWeight="bold"
            >
              Mark as...
            </Typography>
          </div>
          {actions.map(props => (
            <Action key={props.label} {...props} />
          ))}
        </div>
      </div>
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
      <Typography element="span" size="base" textColor="greyBlueDark">
        {label}
      </Typography>
    </button>
  );
}
