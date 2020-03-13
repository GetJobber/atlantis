/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React, { useEffect, useRef, useState } from "react";
import { Box, jsx } from "theme-ui";
import { useConfig, useCurrentDoc, useMenus } from "docz";
import { NavSearch } from "gatsby-theme-docz/src/components/NavSearch";
import { NavLink } from "gatsby-theme-docz/src/components/NavLink";
import { NavGroup } from "gatsby-theme-docz/src/components/NavGroup";
import { Logo } from "gatsby-theme-docz/src/components/Logo";
import { Edit, Github } from "gatsby-theme-docz/src/components/Icons";
import * as styles from "./styles";

export const Sidebar = React.forwardRef((props, ref) => {
  const [query, setQuery] = useState("");
  const menus = useMenus({ query });
  const currentDoc = useCurrentDoc();
  const currentDocRef = useRef();
  const {
    repository,
    themeConfig: { showMarkdownEditButton },
  } = useConfig();
  const { edit = true, ...doc } = useCurrentDoc();

  const handleChange = ev => {
    setQuery(ev.target.value);
  };
  useEffect(() => {
    if (ref.current && currentDocRef.current) {
      ref.current.scrollTo(0, currentDocRef.current.offsetTop);
    }
  }, []);
  return (
    <>
      <Box ref={ref} sx={styles.wrapper(props)} data-testid="sidebar">
        <div sx={styles.logo}>
          <Logo />
        </div>
        <div sx={styles.search}>
          <NavSearch
            placeholder="Type to search..."
            value={query}
            onChange={handleChange}
          />
        </div>
        {menus &&
          menus.map(menu => {
            if (!menu.route) {
              return <NavGroup key={menu.id} item={menu} sidebarRef={ref} />;
            }
            if (menu.route === currentDoc.route) {
              return (
                <div sx={styles.topLevelMenuWrapper} key={menu.id}>
                  <NavLink
                    item={menu}
                    ref={currentDocRef}
                    sx={styles.topLevelMenuItem}
                  >
                    {menu.name}
                  </NavLink>
                </div>
              );
            }
            return (
              <div sx={styles.topLevelMenuWrapper} key={menu.id}>
                <NavLink item={menu} sx={styles.topLevelMenuItem}>
                  {menu.name}
                </NavLink>
              </div>
            );
          })}
        <div sx={styles.buttons}>
          {repository && (
            <a
              href={repository}
              sx={styles.button({ color: "var(--color-blue--dark)" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={15} />
            </a>
          )}

          {showMarkdownEditButton && edit && doc.link && (
            <a
              sx={styles.button}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Edit width={18} />
            </a>
          )}
        </div>
      </Box>
    </>
  );
});
