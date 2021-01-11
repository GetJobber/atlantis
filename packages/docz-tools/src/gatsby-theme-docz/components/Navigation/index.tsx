/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useMenus } from "docz";
import { NavLink } from "./NavLink";
import { NavGroup } from "./NavGroup";
import * as styles from "./styles";

export function Navigation() {
  const menus = useMenus();

  return (
    <Box sx={styles.navigation}>
      {menus &&
        menus.map(menu => {
          return (
            <Box key={menu.id} sx={styles.item}>
              {menu.menu ? <NavGroup item={menu} /> : <NavLink item={menu} />}
            </Box>
          );
        })}
    </Box>
  );
}
