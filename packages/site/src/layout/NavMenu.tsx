import { Box, Button, Typography } from "@jobber/components";
import { Link } from "react-router-dom";
import { Fragment, PropsWithChildren, useState } from "react";
import { SearchBox } from "./SearchBox";
import AnimatedPresenceDisclosure from "./AnimatedPresenceDisclosure";
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
    <div
      style={{
        width: 220,
        height: "100dvh",
        backgroundColor: "var(--color-surface--background)",
        overflow: "auto",
      }}
    >
      <Box height={24} padding="base">
        <Link to="/">
          <JobberLogo />
        </Link>
      </Box>
      <Box padding="base">
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
                  <MenuItem key={`${routeIndex}-${menuItemIndex}`}>
                    <StyledLink to={`/components/${menuItem.handle}`}>
                      {menuItem.handle}
                    </StyledLink>
                  </MenuItem>
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
                  <MenuItem key={`${routeIndex}-${menuItemIndex}`}>
                    <StyledLink to={menuItem.path ?? "/"}>
                      {menuItem.handle}
                    </StyledLink>
                  </MenuItem>
                );
              });
            };

            if (route.children) {
              return (
                <Box key={routeIndex} padding="base">
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
  style,
}: PropsWithChildren<{ readonly to: string; readonly style?: object }>) => {
  return (
    <Link
      to={to ?? "/"}
      style={{
        outline: "transparent",
        color: "var(--color-heading)",
        fontSize: "var(--typography--fontSize-large)",
        fontWeight: 600,
        width: "100%",
        textDecoration: "none",
        userSelect: "none",
        transition: "all var(--timing-base) ease-out",
        ...style,
      }}
    >
      {children}
    </Link>
  );
};

export const StyledSubLink = ({
  to,
  children,
  style,
}: PropsWithChildren<{ readonly to: string; readonly style?: object }>) => {
  return (
    <Link
      to={to ?? "/"}
      style={{
        outline: "transparent",
        color: "var(--color-heading)",
        fontSize: "var(--typography--fontSize-base)",
        fontWeight: 700,
        width: "100%",
        textDecoration: "none",
        userSelect: "none",
        transition: "all var(--timing-base) ease-out",
        display: "block",
        padding:
          "var(--space-smaller) var(--space-smaller) var(--space-smaller) var(--space-base)",
        ...style,
      }}
    >
      {children}
    </Link>
  );
};

export const MenuList = ({ children }: PropsWithChildren) => {
  return <ul style={{ listStyleType: "none", padding: 0 }}>{children}</ul>;
};

export const MenuItem = ({ children }: PropsWithChildren) => {
  return (
    <li
      style={{
        display: "flex",
        margin: "0 var(--space-small) var(--space-smaller) var(--space-small)",
        padding: "var(--space-small)",
        borderRadius: "var(--radius-small)",
        color: "var(--color-heading)",
        alignItems: "center",
      }}
    >
      {children}
    </li>
  );
};

export const changelogTitle = (
  <Typography fontWeight="semiBold" size="large" textColor="heading">
    Changelog
  </Typography>
);

export const sectionTitle = (section: string) => (
  <Typography fontWeight="bold" size="small" textColor="textSecondary">
    {section.toUpperCase()}
  </Typography>
);
