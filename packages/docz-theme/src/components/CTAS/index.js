/** @jsx jsx */
import { jsx } from "theme-ui";
import { useConfig, useCurrentDoc } from "docz";
import t from "prop-types";
import { Github } from "gatsby-theme-docz/src/components/Icons";
import { Button } from "@jobber/components/Button";
import * as styles from "./styles";

export function CTAS() {
  const { repository, title } = useConfig();
  const { ...doc } = useCurrentDoc();
  return (
    <div sx={styles.container}>
      {repository && (
        <CTALink>
          <Button
            label={<Github size={18} />}
            type="secondary"
            url={repository}
            external={true}
            ariaLabel={`View ${title} on GitHub`}
          />
        </CTALink>
      )}
      {doc.link && (
        <CTALink>
          <Button
            icon="edit"
            ariaLabel="Edit page"
            url={doc.link}
            external={true}
          />
        </CTALink>
      )}
    </div>
  );
}

function CTALink({ children }) {
  return <div sx={styles.link}>{children}</div>;
}

CTALink.propTypes = {
  children: t.element,
};
