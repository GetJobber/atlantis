/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useMenus } from "docz";
import t from "prop-types";
import { NavLink } from "gatsby-theme-docz/src/components/NavLink";
import { NavGroup } from "gatsby-theme-docz/src/components/NavGroup";
import * as styles from "./styles";

export function Navigation({ query, sidebarRef }) {
  const menus = useMenus({ query });

  return (
    <Box sx={styles.wrapper}>
      {menus &&
        menus.map(menu => {
          if (!menu.route) {
            return (
              <NavGroup key={menu.id} item={menu} sidebarRef={sidebarRef} />
            );
          }

          return (
            <Box sx={styles.menu} key={menu.id}>
              <NavLink sx={styles.levelOne} item={menu} sidebarRef={sidebarRef}>
                {menu.name}
              </NavLink>
            </Box>
          );
        })}
    </Box>
  );
}

Navigation.propTypes = {
  query: t.string,
  sidebarRef: t.any,
};
