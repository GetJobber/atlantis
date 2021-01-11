/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment } from "react";
import { MenuItem, useCurrentDoc } from "docz";
// eslint-disable-next-line import/no-internal-modules
import { Heading } from "docz/dist/state";
import { LevelOneLink } from "./LevelOneLink";
import { LevelThreeLink } from "./LevelThreeLink";

interface NavLinkProps {
  readonly item: MenuItem;
}

export function NavLink({ item }: NavLinkProps) {
  const { route } = useCurrentDoc();
  const isActive = item.route === route;

  return (
    <Fragment>
      <LevelOneLink title={item.name} url={item.route} active={isActive} />
      {isActive && (
        <Box sx={{ mb: "larger", ml: "-8px" }}>
          {item.headings &&
            item.headings
              .filter(({ depth }: Heading) => depth === 2)
              .map(({ value, slug }: Heading) => {
                return (
                  <Box sx={{ my: "base" }} key={slug}>
                    <LevelThreeLink title={value} slug={slug} />
                  </Box>
                );
              })}
        </Box>
      )}
    </Fragment>
  );
}
