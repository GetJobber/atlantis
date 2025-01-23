import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "../Autocomplete.module.css";
import { UseRepositionMenu } from "../useRepositionMenu";

export interface MenuPoppperProps {
  readonly setMenuRef: UseRepositionMenu["setMenuRef"];
  readonly popperStyles: UseRepositionMenu["styles"];
  readonly attributes: UseRepositionMenu["attributes"];
  readonly targetWidth: UseRepositionMenu["targetWidth"];
  readonly visible?: boolean;
}

export function MenuPopper({
  setMenuRef,
  popperStyles,
  attributes,
  targetWidth,
  visible,
  children,
}: PropsWithChildren<MenuPoppperProps>) {
  return (
    <div
      className={classNames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...popperStyles.popper, width: targetWidth }}
      data-elevation={"elevated"}
      {...attributes.popper}
    >
      {children}
    </div>
  );
}
