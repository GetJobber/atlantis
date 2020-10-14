/** @jsx jsx */
import { jsx } from "theme-ui";
import { useConfig, useCurrentDoc } from "docz";
import t from "prop-types";
import { Github } from "gatsby-theme-docz/src/components/Icons";
import { Button } from "@jobber/components/Button";
import { Tooltip } from "@jobber/components/Tooltip";
import * as styles from "./styles";

export function Header({ open, onClick }) {
  const { repository, title } = useConfig();
  const { ...doc } = useCurrentDoc();
  return (
    <div sx={styles.wrapper}>
      <HeaderButton icon="menu" onClick={onClick} open={open} />
      {repository && (
        <Tooltip message={`View ${title} on GitHub`}>
          <HeaderButton
            label={<Github size={18} />}
            type="secondary"
            url={repository}
            external={true}
            ariaLabel={`View ${title} on GitHub`}
          />
        </Tooltip>
      )}
      {doc.link && (
        <HeaderButton
          icon="edit"
          label="Edit page"
          url={doc.link}
          external={true}
        />
      )}
    </div>
  );
}

Header.propTypes = {
  open: t.bool,
  onClick: t.func,
};

function HeaderButton(props) {
  return (
    <div sx={styles.link(props.open)}>
      <Button {...props} />
    </div>
  );
}

HeaderButton.propTypes = {
  open: t.bool,
};
