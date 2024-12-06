import { Box, Button, Disclosure, Typography } from "@jobber/components";
import { Link } from "react-router-dom";
import { Fragment, PropsWithChildren, useState } from "react";
import { SearchBox } from "./SearchBox";
import AnimatedPresenceDisclosure from "./AnimatedPresenceDisclosure";
import { routes } from "../routes";
import { JobberLogo } from "../assets/JobberLogo.svg";

/**
 * Left side navigation menu for the application.
 * @returns ReactNode
 */
export const NavMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: 220,
        minHeight: "100dvh",
        backgroundColor: "var(--color-surface--background)",
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

            const iterateSubMenu = (menuItems, parentIndex) => {
              return menuItems.map((menuItem, menuItemIndex) => {
                if (menuItem.children) {
                  return (
                    <Fragment key={`${parentIndex}-${menuItemIndex}`}>
                      {sectionTitle(menuItem.handle)}
                      {iterateSubMenu(
                        menuItem.children,
                        `${parentIndex}-${menuItemIndex}`,
                      )}
                    </Fragment>
                  );
                }

                return (
                  <MenuItem key={`${parentIndex}-${menuItemIndex}`}>
                    <StyledLink to={`/components/${menuItem.handle}` ?? "/"}>
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
                    to={`/components/${route.handle}` || "/"}
                    title={route.handle}
                  >
                    {iterateSubMenu(route.children, routeIndex)}
                  </AnimatedPresenceDisclosure>
                </Box>
              );
            }

            return (
              <MenuItem key={routeIndex}>
                <StyledLink to={"/components" ?? "/"}>
                  {route.handle}
                </StyledLink>
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

export const sectionTitle = section => (
  <div key={section} style={{ padding: "var(--space-smaller)" }}>
    <Typography fontWeight="bold" size="small" textColor="textSecondary">
      {section.toUpperCase()}
    </Typography>
  </div>
);
