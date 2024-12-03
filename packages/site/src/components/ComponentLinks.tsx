import { Box, Content, Heading, Link } from "@jobber/components";
import { MouseEvent, useEffect, useState } from "react";
import { ContentExportLinks } from "../types/content";

/**
 * Lists some links, typically in the top right corner of the ComponentView.
 * @param param0 {links: ContentExportLinks[]}
 * @returns ReactNode
 */
export const ComponentLinks = ({
  links,
  goToProps,
  goToUsage,
}: {
  readonly links?: ContentExportLinks[];
  readonly goToProps: () => void;
  readonly goToUsage: () => void;
}) => {
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
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Content>
      <Box padding="base" direction="column">
        <Box margin={{ bottom: "base" }}>
          <Heading level={3}>Design</Heading>
          {hlinks?.map((link, index) => (
            <Box key={index}>
              <a onClick={click} href={`#${link.id}`}>
                {link.textContent}
              </a>
            </Box>
          ))}
        </Box>
        <Box margin={{ bottom: "base" }}>
          <Heading level={3}>Implementation</Heading>
          <Box>
            <a onClick={goToUsage} href={`#`}>
              Usage
            </a>
            <a onClick={goToProps} href={`#`}>
              Props
            </a>
          </Box>
        </Box>
        <Heading level={3}>Links</Heading>
        <Box>
          {links?.map((link, index) => (
            <Box key={index}>
              <Link key={index} url={link.url}>
                {link.label}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Content>
  );
};
