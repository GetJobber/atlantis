import { NavMenu, NavMenuProps } from "./NavMenu";
import styles from "./MobileNavMenu.module.css";

export const MobileNavMenu = ({ mainContentRef }: NavMenuProps) => {
  return (
    <div className={styles.mobileNavMenu}>
      <NavMenu mainContentRef={mainContentRef} />
    </div>
  );
};
