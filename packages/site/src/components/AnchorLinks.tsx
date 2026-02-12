import { Box, Content, Typography } from "@jobber/components";
import { MouseEvent } from "react";
import type { TocItem } from "../types/content";

interface AnchorLinksProps {
  /**
   * An additional action to perform along with scrolling to the selected anchor
   */
  readonly header: string;

  /**
   * A unique identifier for the component
   */
  readonly id: string;

  /**
   * An additional action to perform along with scrolling to the selected anchor
   */
  readonly additionalOnClickAction?: () => void;

  /**
   * Pre-extracted TOC (e.g. from virtual:content-toc). When provided, used for
   * sidebar links instead of querying the DOM.
   */
  readonly toc?: TocItem[];
}

export function AnchorLinks({
  header,
  additionalOnClickAction,
  toc: tocProp,
}: AnchorLinksProps) {
  const click = (e: MouseEvent) => {
    e.preventDefault();
    const anchorId = e.currentTarget?.getAttribute("href")?.replace("#", "");

    if (anchorId) {
      additionalOnClickAction?.();
      setTimeout(() => {
        const element = document.getElementById(anchorId);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const links = tocProp ?? [];

  return (
    <>
      {links.length > 0 && (
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
            {links.map((link, index) => (
              <Box key={link.id ?? index}>
                <a onClick={click} href={`#${link.id}`}>
                  {link.label}
                </a>
              </Box>
            ))}
          </Content>
        </Content>
      )}
    </>
  );
}
