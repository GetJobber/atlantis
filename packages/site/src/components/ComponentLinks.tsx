import { Box, Content, Heading, Icon, Link } from "@jobber/components";
import { MouseEvent, useEffect, useState } from "react";
import { ContentExportLinks } from "../types/content";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

/**
 * Lists some links, typically in the top right corner of the ComponentView.
 * @param param0 {links: ContentExportLinks[]}
 * @returns ReactNode
 */
export const ComponentLinks = ({
  links,
  goToProps,
  goToUsage,
  goToDesign,
  webEnabled,
  mobileEnabled,
}: {
  readonly links?: ContentExportLinks[];
  readonly goToProps: (type: string) => void;
  readonly goToUsage: (type: string) => void;
  readonly goToDesign: () => void;
  readonly webEnabled: boolean;
  readonly mobileEnabled: boolean;
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
      goToDesign();
      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };
  const { isMinimal } = useAtlantisSite();
  if (isMinimal) return null;

  return (
    <Content>
      <Box padding="base" direction="column">
        <Content spacing={"larger"}>
          <Content>
            <Heading level={3}>Design</Heading>
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
          {webEnabled && (
            <Content>
              <Heading level={3}>Web</Heading>
              <Content spacing="small">
                <Box>
                  <a onClick={() => goToUsage("web")} href={`#`}>
                    Usage
                  </a>
                </Box>
                <Box>
                  <a onClick={() => goToProps("web")} href={`#`}>
                    Props
                  </a>
                </Box>
              </Content>
            </Content>
          )}
          {mobileEnabled && (
            <Content>
              <Heading level={3}>Mobile</Heading>
              <Content spacing="small">
                <Box>
                  <a onClick={() => goToUsage("mobile")} href={`#`}>
                    Usage
                  </a>
                </Box>
                <Box>
                  <a onClick={() => goToProps("mobile")} href={`#`}>
                    Props
                  </a>
                </Box>
              </Content>
            </Content>
          )}
          <Content>
            <Heading level={3}>Links</Heading>
            <Content spacing="smaller">
              <Box direction="row" gap="small">
                <Icon name="link" />
                {links?.map((link, index) => (
                  <div key={index} data-storybook-link>
                    <Link key={index} url={link.url} external>
                      {link.label}
                    </Link>
                  </div>
                ))}
              </Box>
            </Content>
          </Content>
        </Content>
      </Box>
    </Content>
  );
};
