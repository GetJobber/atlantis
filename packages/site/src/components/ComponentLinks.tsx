import { Box, Content, Heading, Link } from "@jobber/components";
import { ContentExportLinks } from "../types/content";

export const ComponentLinks = ({
  links,
}: {
  readonly links?: ContentExportLinks[];
}) => {
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
