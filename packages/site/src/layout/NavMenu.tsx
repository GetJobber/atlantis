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
                <Box key={`box-${index}-${Math.random(10000000)}`} padding="base">
                  <AnimatedPresenceDisclosure
                    key={`disclosre-${route.handle}-${index}-${Math.random(10000000)}`}
                    to={route.path || "/"}
                    title={route.handle}
                  >
                    {route.children.map((subroute, subindex) => {
                      if (subroute.inNav === false) return null;

                      if (subroute.children) {
                        return (
                          <>
                            {sectionTitle(subroute.handle)}
                            {subroute.children.map(
                              (subsubroute, subsubindex) => {
                                return (
                                  <StyledSubLink
                                    key={`${subsubroute.handle}-${subsubindex}-${Math.random(10000000)}`}
                                    to={subsubroute.path || "/"}
                                  >
                                    {subsubroute.handle}
                                  </StyledSubLink>
                                );
                              },
                            )}
                          </>
                        );
                      } else {
                        return (
                          <StyledSubLink
                            key={`${subroute.handle}-${subindex}-${Math.random(10000000)}`}
                            to={subroute.path || "/"}
                          >
                            {subroute.handle}
                          </StyledSubLink>
                        );
                      }
                    })}
                  </AnimatedPresenceDisclosure>
                </Box>
              );
            }

            if (route.inNav === false) return null;

            return (
              <MenuItem key={`menuitem-${index}-${Math.random(10000000)}`}>
                <StyledLink key={`${route.handle}-${index}-${Math.random(10000000)}`} to={route.path ?? "/"}>
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
  <div style={{ padding: "var(--space-smaller)" }}>
    <Typography fontWeight="bold" size="small" textColor="textSecondary">
      {section.toUpperCase()}
    </Typography>
  </div>
);
