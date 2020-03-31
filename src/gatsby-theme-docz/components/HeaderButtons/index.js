/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useConfig, useCurrentDoc } from "docz";
import { Github } from "gatsby-theme-docz/src/components/Icons";
import t from "prop-types";
import { Button } from "@jobber/components/Button";
import { Tooltip } from "@jobber/components/Tooltip";
import { Icon } from "@jobber/components/Icon";
import * as styles from "./styles";
import { DeferRender } from "../DeferRender";

export const HeaderButtons = ({ open, openMenu, closeMenu }) => {
  const { repository } = useConfig();
  const { ...doc } = useCurrentDoc();

  return (
    <DeferRender>
      <Box sx={styles.buttons}>
        <Box sx={styles.menu}>
          <Button
            label={<Icon color="white" name={open ? "remove" : "menu"} />}
            type="primary"
            onClick={() => (open ? closeMenu() : openMenu())}
          />
        </Box>
        <Tooltip message="View 🔱Atlantis on Github">
          <Button
            label={<Github size={18} />}
            type="secondary"
            url={repository}
          />
        </Tooltip>
        <Button icon="edit" color="white" label="Edit page" url={doc.link} />
      </Box>
    </DeferRender>
  );
};

HeaderButtons.propTypes = {
  open: t.bool,
  openMenu: t.func,
  closeMenu: t.func,
};
