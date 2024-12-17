import { Box, Content, Heading } from "@jobber/components";
import { MouseEvent, useEffect, useState } from "react";

interface AnchorLinksProps {
  /**
   * An additional action to perform along with scrolling to the selected anchor
   */
  readonly header: string;

  /**
   * An additional action to perform along with scrolling to the selected anchor
   */
  readonly additionalOnClickAction?: () => void;
}

export function AnchorLinks({
  header,
  additionalOnClickAction,
}: AnchorLinksProps) {
  const [hlinks, setHlinks] = useState<Element[] | null>(null);

  useEffect(() => {
    const hdd = document.querySelectorAll("[data-heading-link]");

    if (hdd.length > 0) {
      setHlinks(Array.from(hdd));
    }
  }, []);

  const click = (e: MouseEvent) => {
    e.preventDefault();
    const id = e.currentTarget?.getAttribute("href")?.replace("#", "");

    if (id) {
      additionalOnClickAction?.();
      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <Content>
      <Heading level={6} element="h3">
        {header}
      </Heading>
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
  );
}
