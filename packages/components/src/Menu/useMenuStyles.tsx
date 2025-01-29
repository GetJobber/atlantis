import classNames from "classnames";
import { ReactElement } from "react";
import { MenuProps } from "./types";
import styles from "./Menu.module.css";

export const useMenuStyles = ({ activator }: Pick<MenuProps, "activator">) => {
  const fullWidth =
    (activator as ReactElement<{ fullWidth: number }>)?.props?.fullWidth ||
    false;

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });
  console.log("FULL WIDTH?", fullWidth);

  return {
    wrapperClasses,
    shadowRefStyle: styles.shadowRef,
    overlay: styles.overlay,
    popperContainer: styles.popperContainer,
    section: styles.section,
    sectionHeader: styles.sectionHeader,
    menu: styles.menu,
  };
};
