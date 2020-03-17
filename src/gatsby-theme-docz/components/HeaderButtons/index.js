/** @jsx jsx */
import { jsx } from "theme-ui";
import { useConfig, useCurrentDoc } from "docz";
import { Edit, Github } from "gatsby-theme-docz/src/components/Icons";
import * as styles from "./styles";

export const HeaderButtons = () => {
  const {
    repository,
    themeConfig: { showMarkdownEditButton },
  } = useConfig();
  const { edit = true, ...doc } = useCurrentDoc();

  return (
    <div>
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
          <Edit width={15} />
        </a>
      )}
    </div>
  );
};
