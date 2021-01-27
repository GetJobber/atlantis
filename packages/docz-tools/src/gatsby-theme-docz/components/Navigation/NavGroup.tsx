/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Fragment, RefObject, useState } from "react";
import { MenuItem, useCurrentDoc } from "docz";
// eslint-disable-next-line import/no-internal-modules
import { Heading } from "docz/dist/state";
import { LevelOneLink } from "./LevelOneLink";
import { LevelTwoLink } from "./LevelTwoLink";
import { LevelThreeLink } from "./LevelThreeLink";

interface LinkGroupProps {
  readonly item: MenuItem;
  readonly sidebarRef: RefObject<HTMLDivElement>;
}

export function NavGroup({ item, sidebarRef }: LinkGroupProps) {
  const doc = useCurrentDoc();
  const [open, setOpen] = useState(item.name === doc.menu);

  return (
    <Fragment>
      <LevelOneLink title={item.name} onClick={handleClick} open={open} />
      {open && (
        <Box sx={{ marginBottom: "larger" }}>
          {item.menu &&
            item.menu.map((menu: MenuItem) => {
              const isActive = doc.route === menu.route;

              return (
                <Box sx={{ marginY: "base" }} key={menu.id}>
                  <LevelTwoLink
                    sidebarRef={sidebarRef}
                    title={menu.name}
                    url={menu.route}
                    active={isActive}
                  />
                  {isActive && (
                    <Box sx={{ marginY: "base" }}>
                      {menu.headings &&
                        menu.headings
                          .filter(({ depth }: Heading) => depth === 2)
                          .map(({ value, slug }: Heading) => {
                            return (
                              <Box
                                sx={{ marginY: "small", pl: "small" }}
                                key={slug}
                              >
                                <LevelThreeLink title={value} slug={slug} />
                              </Box>
                            );
                          })}
                    </Box>
                  )}
                </Box>
              );
            })}
        </Box>
      )}
    </Fragment>
  );

  function handleClick() {
    setOpen(!open);
  }
}
