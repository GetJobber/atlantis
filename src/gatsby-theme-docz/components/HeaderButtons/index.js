/** @jsx jsx */
import { jsx } from "theme-ui";
import { useConfig, useCurrentDoc } from "docz";
import { Github } from "gatsby-theme-docz/src/components/Icons";
import { Button } from "@jobber/components/Button";
import { Tooltip } from "@jobber/components/Tooltip";
import * as styles from "./styles";
import { DeferRender } from "../DeferRender";

export const HeaderButtons = () => {
  const {
    repository,
    themeConfig: { showMarkdownEditButton },
  } = useConfig();
  const { edit = true, ...doc } = useCurrentDoc();

  return (
    <DeferRender>
      <div sx={styles.buttons}>
        {repository && (
          <Tooltip message="View 🔱Atlantis on Github">
            <Button
              label={<Github size={18} />}
              type="secondary"
              url={repository}
            />
          </Tooltip>
        )}
        {showMarkdownEditButton && edit && doc.link && (
          <Button icon="edit" color="white" label="Edit page" url={doc.link} />
        )}
      </div>
    </DeferRender>
  );
};
