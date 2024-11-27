import { Box, Content, Heading, Icon, Link } from "@jobber/components";
import { ContentExportLinks } from "../types/content";

/**
 * Lists some links, typically in the top right corner of the ComponentView.
 * @param param0 {links: ContentExportLinks[]}
 * @returns ReactNode
 */
export const ComponentLinks = ({
  links,
}: {
  readonly links?: ContentExportLinks[];
}) => {
  return (
    <Box padding={"base"} gap={"larger"}>
      <Content>
        <Heading level={6} element="h2">
          Links
        </Heading>
        <Content spacing="smaller">
          {links?.map((link, index) => (
            <Link key={index} url={link.url} external>
              <Icon name="link" size="small" color="interactive" />
              {link.label}
            </Link>
          ))}
        </Content>
      </Content>
    </Box>
  );
};
