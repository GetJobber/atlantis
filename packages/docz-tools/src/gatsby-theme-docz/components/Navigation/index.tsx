/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link, MenuItem, useCurrentDoc, useMenus } from "docz";
import * as styles from "./styles";

export function Navigation() {
  const menus = useMenus();
  const doc = useCurrentDoc();
  console.log({ menus, doc });

  return (
    <Box sx={styles.navigation}>
      {menus &&
        menus.map(menu => {
          return (
            <Box key={menu.id}>
              {menu.menu ? "Group!" : <LevelOneLink item={menu} />}
            </Box>
          );
        })}
    </Box>
  );
}

interface LevelOneLinkProps {
  readonly item: MenuItem;
}
function LevelOneLink({ item }: LevelOneLinkProps) {
  if (item.route) {
    return (
      <Link sx={styles.levelOneLink} to={item.route as string}>
        {item.name}
      </Link>
    );
  }

  return <Box>Foo</Box>;
}
