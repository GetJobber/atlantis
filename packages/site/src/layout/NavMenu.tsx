import { Box, Button, Content, Icon, Typography } from "@jobber/components";
import { Link, useLocation } from "react-router-dom";
import { Fragment, PropsWithChildren, useState } from "react";
import { SearchBox } from "./SearchBox";
import AnimatedPresenceDisclosure from "./AnimatedPresenceDisclosure";
import styles from "./NavMenu.module.css";
import { routes } from "../routes";
import { JobberLogo } from "../assets/JobberLogo.svg";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";
import { VisibleWhenFocused } from "../components/VisibleWhenFocused";

interface NavMenuProps {
  readonly mainContentRef: React.RefObject<HTMLDivElement>;
}

/**
 * Left side navigation menu for the application.
 * @returns ReactNode
 */
export const NavMenu = ({ mainContentRef }: NavMenuProps) => {
  const [open, setOpen] = useState(false);
  const { isMinimal } = useAtlantisSite();
  const location = useLocation();

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
          <StyledSubLink to={`/components/${menuItem.handle}`}>
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
          <StyledSubLink to={menuItem.path ?? "/"}>
            {menuItem.handle}
          </StyledSubLink>
        </MenuSubItem>
      );
    });
  };

  const skipToContent = () => {
    mainContentRef.current?.focus();
  };

  return (
    <nav className={styles.navMenuContainer}>
      <div className={styles.navMenuHeader}>
        <VisibleWhenFocused>
          <Button label="Skip to Content" onClick={skipToContent} />
        </VisibleWhenFocused>
        <Box>
          {/* TODO: remove ?new when we roll out the new docs site to everyone */}
          <Link to="/?new">
            <JobberLogo />
          </Link>
        </Box>
        <Box>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={styles.searchButton}
            aria-label="Search"
          >
            <Icon name="search" />
            <span className={styles.searchButtonText}>
              <Typography
                size={"base"}
                textColor={"text"}
                fontWeight={"semiBold"}
              >
                Search
              </Typography>
            </span>
            <div className={styles.searchKeyIndicator}>/</div>
          </button>
        </Box>
        <SearchBox open={open} setOpen={setOpen} />
      </div>
      <div className={styles.navMenu}>
        <MenuList>
          <Content spacing="smaller">
            {routes?.map((route, routeIndex) => {
              if (route.inNav === false) return null;

              if (route.children) {
                return (
                  <Box key={routeIndex}>
                    <AnimatedPresenceDisclosure
                      to={route.path ?? "/"}
                      title={route.handle}
                      selected={location.pathname.startsWith(route.path ?? "/")}
                    >
                      {iterateSubMenu(route.children, routeIndex)}
                    </AnimatedPresenceDisclosure>
                  </Box>
                );
              }

              return (
                <MenuItem key={routeIndex}>
                  <StyledLink to={getRoutePath(route.path) ?? "/"}>
                    {route.handle}
                  </StyledLink>
                </MenuItem>
              );
            })}
          </Content>
        </MenuList>
      </div>
    </nav>
  );
};

export const StyledLink = ({
  to,
  children,
}: PropsWithChildren<{ readonly to: string }>) => {
  // const location = useLocation();
  const isSelected =
    location.pathname === to || (location.pathname === "/" && to === "/?new");

  return (
    <Link
      to={to ?? "/"}
      className={`${styles.navMenuItem} ${styles.navMenuLink} ${
        isSelected ? styles.selected : ""
      }`}
    >
      {children}
    </Link>
  );
};

export const StyledSubLink = ({
  to,
  children,
}: PropsWithChildren<{ readonly to: string }>) => {
  // const location = useLocation();
  const isSelected = location.pathname === to;

  return (
    <Link
      to={to ?? "/"}
      className={`${styles.navMenuItem} ${styles.navMenuSubItem} ${
        styles.navMenuLink
      } ${isSelected ? styles.selected : ""}`}
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
    <li style={{ listStyle: "none" }}>
      <Typography fontWeight="bold" size="large" textColor="text">
        {children}
      </Typography>
    </li>
  );
};

export const MenuSubItem = ({ children }: PropsWithChildren) => {
  return (
    <li style={{ listStyle: "none" }}>
      <Typography fontWeight="semiBold" size="base" textColor="text">
        {children}
      </Typography>
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

// TODO: delete this once we roll out the new docs site to everyone
function getRoutePath(path?: string) {
  if (path === "/") {
    return "/?new";
  }

  return path;
}
