import { Box, Button, Typography } from "@jobber/components";
import { Link } from "react-router-dom";
import { Fragment, PropsWithChildren, useState } from "react";
import { SearchBox } from "./SearchBox";
import AnimatedPresenceDisclosure from "./AnimatedPresenceDisclosure";
import styles from "./NavMenu.module.css";
import { routes } from "../routes";
import { JobberLogo } from "../assets/JobberLogo.svg";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

/**
 * Left side navigation menu for the application.
 * @returns ReactNode
 */
export const NavMenu = () => {
  const [open, setOpen] = useState(false);
  const { isMinimal } = useAtlantisSite();

  if (isMinimal) return null;

  return (
    <div className={styles.navMenu}>
      <Box>
        <Link to="/">
          <JobberLogo />
        </Link>
      </Box>
      <Box>
        <Button
          onClick={() => setOpen(true)}
          label="Search"
          icon="search"
          variation="subtle"
        />
      </Box>
      <SearchBox open={open} setOpen={setOpen} />
      <MenuList>
        <Box>
          {routes?.map((route, routeIndex) => {
            if (route.inNav === false) return null;

            interface MenuItem {
              handle: string;
              children?: MenuItem[];
              path?: string;
            }

            const iterateSubSubMenu = (menuItems: MenuItem[]) => {
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

            const iterateSubMenu = (menuItems: MenuItem[]) => {
              return menuItems.map((menuItem, menuItemIndex) => {
                if (menuItem.children) {
                  return (
                    <Fragment key={`${routeIndex}-${menuItemIndex}`}>
                      {sectionTitle(menuItem.handle)}
                      {iterateSubSubMenu(menuItem.children)}
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

            if (route.children) {
              return (
                <Box key={routeIndex}>
                  <AnimatedPresenceDisclosure
                    to={route.path ?? "/"}
                    title={route.handle}
                  >
                    {iterateSubMenu(route.children)}
                  </AnimatedPresenceDisclosure>
                </Box>
              );
            }

            return (
              <MenuItem key={routeIndex}>
                <StyledLink to={route.path ?? "/"}>{route.handle}</StyledLink>
              </MenuItem>
            );
          })}
        </Box>
      </MenuList>
    </div>
  );
};

export const StyledLink = ({
  to,
  children,
}: PropsWithChildren<{ readonly to: string }>) => {
  return (
    <Link
      to={to ?? "/"}
      className={`${styles.navMenuItem} ${styles.navMenuLink}`}
    >
      {children}
    </Link>
  );
};

export const StyledSubLink = ({
  to,
  children,
}: PropsWithChildren<{ readonly to: string }>) => {
  return (
    <Link
      to={to ?? "/"}
      className={`${styles.navMenuItem} ${styles.navMenuSubItem} ${styles.navMenuLink}`}
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
      <Typography fontWeight="bold" size="base" textColor="text">
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
