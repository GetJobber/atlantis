/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import React from "react";
import { useCurrentDoc } from "docz";
import { NavLink } from "gatsby-theme-docz/src/components/NavLink";
import t from "prop-types";
import { Icon } from "@jobber/components/Icon";
import * as styles from "./styles";
// import { ChevronDown } from '../Icons'

export function NavGroup({ item: { name, menu }, sidebarRef }) {
  const currentDoc = useCurrentDoc();
  const [subheadingsVisible, setShowsubheadings] = React.useState(
    currentDoc.menu === name,
  );
  const toggleSubheadings = () => setShowsubheadings(!subheadingsVisible);

  return (
    <Box sx={styles.wrapper} data-testid="nav-group">
      <Box sx={styles.title} onClick={toggleSubheadings}>
        {name}
        <Icon
          name={subheadingsVisible ? "arrowUp" : "arrowDown"}
          color="grey"
        />
      </Box>
      <Box sx={styles.sublinkWrapper} data-testid="nav-group-links">
        {menu &&
          subheadingsVisible &&
          menu.map(menuItem => (
            <Box sx={styles.sublink} key={menuItem.id}>
              <NavLink sx={styles.link} item={menuItem} sidebarRef={sidebarRef}>
                {menuItem.name}
              </NavLink>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

NavGroup.propTypes = {
  item: t.shape({
    name: t.string,
    menu: t.array,
  }),
  sidebarRef: t.shape({ current: t.instanceOf(Element) }),
};
