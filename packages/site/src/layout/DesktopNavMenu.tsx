import { NavMenu, NavMenuProps } from "./NavMenu";
import styles from "./DesktopNavMenu.module.css";

export const DesktopNavMenu = ({ mainContentRef }: NavMenuProps) => {
  return (
    <div className={styles.desktopNavMenu}>
      <NavMenu mainContentRef={mainContentRef} />
    </div>
  );
};
