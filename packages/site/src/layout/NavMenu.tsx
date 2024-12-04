import { Box, Button, Disclosure, Typography } from "@jobber/components";
import { Link } from "react-router-dom";
import { PropsWithChildren, useState } from "react";
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
          {routes?.map((route, index) => {
            if (route.children) {
              return (
                <Box key={index} padding="base">
                  <AnimatedPresenceDisclosure
                    to={route.path || "/"}
                    title={route.handle}
                  >
                    {route.children.map((subroute, subindex) => {
                      if (subroute.inNav === false) return null;

                      return (
                        <StyledSubLink key={subindex} to={subroute.path || "/"}>
                          {subroute.handle}
                        </StyledSubLink>
                      );
                    })}
                  </AnimatedPresenceDisclosure>
                </Box>
              );
            }
            if (route.inNav === false) return null;

            return (
              <MenuItem key={index}>
                <StyledLink
                  key={index}
                  to={route.path ?? "/"}
                  style={{ marginBottom: "var(--space-base)" }}
                >
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
        padding: "var(--space-base) 0",
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
