import { Box, Content, Typography } from "@jobber/components";
import { MouseEvent, useEffect, useState } from "react";

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
}

export function AnchorLinks({
  header,
  id,
  additionalOnClickAction,
}: AnchorLinksProps) {
  const [hlinks, setHlinks] = useState<Element[] | null>(null);

  useEffect(() => {
    const hdd = document.querySelectorAll("[data-heading-link]");

    if (hdd.length > 0) {
      setHlinks(Array.from(hdd));
    }
  }, [id]);

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

  return (
    <>
      {hlinks && hlinks.length > 0 && (
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
            {hlinks?.map((link, index) => (
              <Box key={index}>
                <a onClick={click} href={`#${link.id}`}>
                  {link.textContent}
                </a>
              </Box>
            ))}
          </Content>
        </Content>
      )}
    </>
  );
}
