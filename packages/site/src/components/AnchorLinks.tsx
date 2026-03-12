import { Box, Content, Typography } from "@jobber/components";
import { Link, useMatches, useParams } from "@tanstack/react-router";
import type { TocItem } from "../types/content";

interface AnchorLinksProps {
  /**
   * An additional action to perform along with scrolling to the selected anchor
   */
  readonly header: string;

  /**
   * Pre-extracted TOC (e.g. from virtual:content-toc). When provided, used for
   * sidebar links instead of querying the DOM.
   */
  readonly toc?: TocItem[];
}

export function AnchorLinks({ header, toc: tocProp }: AnchorLinksProps) {
  const matches = useMatches();
  const params = useParams({ strict: false });
  const currentRoute = matches[matches.length - 1];
  // Fix for typescript issues. Want to clean this up when we use file based routing.
  if (!currentRoute || currentRoute.routeId === "__root__") return null;

  const newParams = { ...params };
  delete newParams.tab;
  // Remove the tab because the table of contents is not on a tab in the components route
  const newPath = currentRoute.routeId.replace("/$tab", "");

  return (
    <>
      {tocProp && tocProp.length > 0 && (
        <Content>
          <Typography
            element={"h3"}
            size="small"
            textCase="uppercase"
            textColor="textSecondary"
            fontWeight={"bold"}
          >
            {header}
          </Typography>
          <Content spacing="small">
            {tocProp.map((link, index) => (
              <Box key={link.id ?? index}>
                <Link
                  params={newParams}
                  to={newPath}
                  hash={`${link.id}`}
                  hashScrollIntoView={{ behavior: "smooth" }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Content>
        </Content>
      )}
    </>
  );
}
