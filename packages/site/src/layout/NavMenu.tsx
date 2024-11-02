import { Box, InputText } from "@jobber/components";
import { Link } from "react-router-dom";
import { PropsWithChildren, useState } from "react";
import { SearchBox } from "./SearchBox";
import { routes } from "../routes";
import { JobberLogo } from "../assets/JobberLogo.svg";

/**
 * Left side navigation menu for the application.
 * @returns ReactNode
 */
export const NavMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      width={200}
      background="surface--background"
      border={{ right: "base" }}
    >
      <Box
        width="100%"
        background="surface--background"
        margin={{ bottom: "large" }}
        height={60}
      >
        <Box padding={"base"}>
          <Link to="/">
            <JobberLogo />
          </Link>
        </Box>
      </Box>
      <Box padding="base">
        <InputText
          size="small"
          prefix={{ icon: "search" }}
          placeholder="Search"
          onFocus={() => setOpen(true)}
        />
      </Box>
      <SearchBox open={open} setOpen={setOpen} />
      <MenuList>
        <Box>
          {routes?.map((route, index) => {
            return route.children ? (
              route.children.map((subroute, subindex) => {
                if (subroute.inNav === false) return;

                return (
                  <MenuItem key={index}>
                    <StyledLink to={subroute.path || "/"} key={subindex}>
                      {subroute.handle}
                    </StyledLink>
                  </MenuItem>
                );
              })
            ) : route.inNav === false ? null : (
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
    </Box>
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
        margin: 0,
        marginBottom: "var(--space-base)",
        padding: "var(--space-small) var(--space-small)",
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
        margin: "0 var(--space-small) var(--space-smaller) var(--space-base)",
        paddingLeft: 6,
        borderRadius: "var(--radius-base)",
        color: "var(--color-heading)",
        alignItems: "center",
      }}
    >
      {children}
    </li>
  );
};
