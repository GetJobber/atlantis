import { Box, Button, Typography } from "@jobber/components";
import { Link, useLocation } from "react-router-dom";
import { Fragment, PropsWithChildren, useRef } from "react";
import AnimatedPresenceDisclosure from "./AnimatedPresenceDisclosure";
import styles from "./NavMenu.module.css";
import { LeftDrawer } from "./LeftDrawer";
import { routes } from "../routes";
import { JobberLogo } from "../assets/JobberLogo.svg";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";
import { VisibleWhenFocused } from "../components/VisibleWhenFocused";

export interface NavMenuProps {
  readonly mainContentRef: React.RefObject<HTMLDivElement>;
}

/**
 * Left side navigation menu for the application.
 * @returns ReactNode
 */
export const NavMenu = ({ mainContentRef }: NavMenuProps) => {
  const { isMinimal, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useAtlantisSite();
  const { pathname } = useLocation();
  const selectedRef = useRef<HTMLAnchorElement | null>(null);

  if (isMinimal) return null;

  interface MenuItem {
    handle: string;
    children?: MenuItem[];
    path?: string;
  }

  const iterateSubSubMenu = (menuItems: MenuItem[], routeIndex: number) => {
    return menuItems.map((menuItem, menuItemIndex) => {
      return (
        <MenuSubItem key={`${routeIndex}-${menuItemIndex}`}>
          <StyledSubLink
            to={`/components/${menuItem.handle}`}
            selectedRef={selectedRef}
          >
            {menuItem.handle}
          </StyledSubLink>
        </MenuSubItem>
      );
    });
  };

  const iterateSubMenu = (menuItems: MenuItem[], routeIndex: number) => {
    return menuItems.map((menuItem, menuItemIndex) => {
      if (menuItem.children) {
        return (
          <Fragment key={`${routeIndex}-${menuItemIndex}`}>
            {sectionTitle(menuItem.handle)}
            {iterateSubSubMenu(menuItem.children, routeIndex)}
          </Fragment>
        );
      }

      return (
        <MenuSubItem key={`${routeIndex}-${menuItemIndex}`}>
          <StyledSubLink to={menuItem.path ?? "/"} selectedRef={selectedRef}>
            {menuItem.handle}
          </StyledSubLink>
        </MenuSubItem>
      );
    });
  };

  const skipToContent = () => {
    mainContentRef.current?.focus();
    closeMobileMenu();
  };

  const menuContent = (
    <nav className={styles.navMenuContainer}>
      <div className={styles.navMenuHeader}>
        <VisibleWhenFocused>
          <Button label="Skip to Content" onClick={skipToContent} />
        </VisibleWhenFocused>
        <div className={styles.navMenuHeaderLogo}>
          <Link to="/" onClick={closeMobileMenu}>
            <JobberLogo />
          </Link>
        </div>
      </div>
      <div className={styles.navMenu}>
        <MenuList>
          {routes?.map((route, routeIndex) => {
            if (route.inNav === false) return null;

            if (route.children) {
              return (
                <Box key={routeIndex}>
                  <AnimatedPresenceDisclosure
                    to={route.path ?? "/"}
                    title={route.handle}
                    selected={pathname.startsWith(route.path ?? "/")}
                  >
                    {iterateSubMenu(route.children, routeIndex)}
                  </AnimatedPresenceDisclosure>
                </Box>
              );
            }

            return (
              <MenuItem key={routeIndex}>
                <StyledLink to={route.path ?? "/"} selectedRef={selectedRef}>
                  {route.handle}
                </StyledLink>
              </MenuItem>
            );
          })}
        </MenuList>
      </div>
      <a
        href="https://atlantis.getjobber.com/storybook/?path=/docs/introduction--docs"
        className={styles.navFooterLink}
      >
        View in Storybook
      </a>
    </nav>
  );

  return (
    <>
      <div className={styles.desktopNavContainer}>{menuContent}</div>
      <div className={styles.mobileNavContainer}>
        <LeftDrawer
          open={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          header={
            <Box padding={{ top: "smaller" }}>
              <Link to="/" onClick={closeMobileMenu}>
                <JobberLogo />
              </Link>
            </Box>
          }
        >
          {menuContent}
        </LeftDrawer>
      </div>
    </>
  );
};

const getLinkClassName = (
  baseClasses: string,
  isSelected: boolean,
  selectedClass: string,
): string => {
  return `${baseClasses} ${isSelected ? selectedClass : ""}`.trim();
};

export const StyledLink = ({
  to,
  children,
  selectedRef,
}: PropsWithChildren<{
  readonly to: string;
  readonly selectedRef: React.RefObject<HTMLAnchorElement>;
}>) => {
  const { pathname } = useLocation();
  const isSelected = pathname === to;
  const className = getLinkClassName(
    `${styles.navMenuItem} ${styles.navMenuLink}`,
    isSelected,
    styles.selected,
  );
  const { closeMobileMenu } = useAtlantisSite();

  return (
    <Link
      to={to ?? "/"}
      className={className}
      ref={isSelected ? selectedRef : null}
      onClick={closeMobileMenu}
    >
      {children}
    </Link>
  );
};

export const StyledSubLink = ({
  to,
  children,
  selectedRef,
}: PropsWithChildren<{
  readonly to: string;
  readonly selectedRef: React.RefObject<HTMLAnchorElement>;
}>) => {
  const { pathname } = useLocation();
  const isSelected = pathname === to;
  const className = getLinkClassName(
    `${styles.navMenuItem} ${styles.navMenuSubItem} ${styles.navMenuLink}`,
    isSelected,
    styles.selected,
  );
  const { closeMobileMenu } = useAtlantisSite();

  return (
    <Link
      to={to ?? "/"}
      className={className}
      ref={isSelected ? selectedRef : null}
      onClick={closeMobileMenu}
    >
      {children}
    </Link>
  );
};

export const MenuList = ({ children }: PropsWithChildren) => {
  return <ul style={{ listStyle: "none", padding: 0 }}>{children}</ul>;
};

export const MenuItem = ({ children }: PropsWithChildren) => {
  return (
    <li style={{ listStyle: "none" }} className="stickySectionHeader">
      <Typography fontWeight="semiBold" size={"large"} textColor="heading">
        {children}
      </Typography>
    </li>
  );
};

export const MenuSubItem = ({ children }: PropsWithChildren) => {
  return (
    <li style={{ listStyle: "none" }}>
      <Typography textColor="heading">{children}</Typography>
    </li>
  );
};

export const sectionTitle = (section: string) => (
  <div className={`${styles.navMenuItem} ${styles.navMenuSubTitle}`}>
    <Typography fontWeight="bold" size="small" textColor="textSecondary">
      {section.toUpperCase()}
    </Typography>
  </div>
);
