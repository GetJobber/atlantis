/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useMenus } from "docz";
import { NavLink } from "./NavLink";
import { NavGroup } from "./NavGroup";
import * as styles from "./styles";

interface NavigationProps {
  readonly query?: string;
}

export function Navigation({ query }: NavigationProps) {
  const menus = useMenus({ query });

  return (
    <Box sx={styles.navigation}>
      {menus &&
        menus.map(menu => {
          const isNavGroup = menu.menu && typeof menu.menu !== "string";

          return (
            <Box key={menu.id} sx={styles.item}>
              {isNavGroup ? <NavGroup item={menu} /> : <NavLink item={menu} />}
            </Box>
          );
        })}
    </Box>
  );
}
