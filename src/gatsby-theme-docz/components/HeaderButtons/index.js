/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { useConfig, useCurrentDoc } from "docz";
import { Github } from "gatsby-theme-docz/src/components/Icons";
import { Button } from "@jobber/components/Button";

export const HeaderButtons = () => {
  const {
    repository,
    themeConfig: { showMarkdownEditButton },
  } = useConfig();
  const { edit = true, ...doc } = useCurrentDoc();

  return (
    <div>
      {repository && (
        <React.Fragment>
          <Button
            label={<Github size={18} />}
            type="secondary"
            url={repository}
          />{" "}
        </React.Fragment>
      )}
      {showMarkdownEditButton && edit && doc.link && (
        <Button icon="edit" color="white" label="Edit page" url={doc.link} />
      )}
    </div>
  );
};
