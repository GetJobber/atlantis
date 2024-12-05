import { Box, Content, Heading, Link } from "@jobber/components";
import { ContentExportLinks } from "../types/content";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

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
  const { isMinimal } = useAtlantisSite();
  if (isMinimal) return null;

  return (
    <Content>
      <Box padding="base" direction="column">
        <Heading level={2}>Links</Heading>
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
