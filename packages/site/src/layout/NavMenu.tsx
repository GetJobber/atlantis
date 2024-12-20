import { Box, Button, Content, Icon, Typography } from "@jobber/components";
import { Link, useLocation } from "react-router-dom";
import { Fragment, PropsWithChildren, useRef, useState } from "react";
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
                      selected={pathname.startsWith(route.path ?? "/")}
                    >
                      {iterateSubMenu(route.children, routeIndex)}
                    </AnimatedPresenceDisclosure>
                  </Box>
                );
              }

              return (
                <MenuItem key={routeIndex}>
                  <StyledLink
                    to={getRoutePath(route.path) ?? "/"}
                    selectedRef={selectedRef}
                  >
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
  const isSelected = pathname === to || (pathname === "/" && to === "/?new");
  const className = getLinkClassName(
    `${styles.navMenuItem} ${styles.navMenuLink}`,
    isSelected,
    styles.selected,
  );

  return (
    <Link
      to={to ?? "/"}
      className={className}
      ref={isSelected ? selectedRef : null}
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

  return (
    <Link
      to={to ?? "/"}
      className={className}
      ref={isSelected ? selectedRef : null}
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
