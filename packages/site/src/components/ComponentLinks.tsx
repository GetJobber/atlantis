import { Box, Content, Heading, Icon, Link } from "@jobber/components";
import { AnchorLinks } from "./AnchorLinks";
import { ContentExportLinks } from "../types/content";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

/**
 * Lists some links, typically in the top right corner of the ComponentView.
 * @param param0 {links: ContentExportLinks[]}
 * @returns ReactNode
 */
export const ComponentLinks = ({
  key,
  links,
  goToProps,
  goToUsage,
  goToDesign,
  webEnabled,
  mobileEnabled,
}: {
  readonly key: string;
  readonly links?: ContentExportLinks[];
  readonly goToProps: (type: string) => void;
  readonly goToUsage: (type: string) => void;
  readonly goToDesign: () => void;
  readonly webEnabled: boolean;
  readonly mobileEnabled: boolean;
}) => {
  const { isMinimal } = useAtlantisSite();
  if (isMinimal) return null;

  return (
    <Content spacing={"larger"}>
      <AnchorLinks
        key={key}
        header="Design"
        additionalOnClickAction={goToDesign}
      />
      {webEnabled && (
        <Content>
          <Heading level={6} element="h3">
            Web
          </Heading>
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
          <Heading level={6} element="h3">
            Mobile
          </Heading>
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
        <Heading level={6} element="h3">
          Links
        </Heading>
        <Content spacing="smaller">
          <Box direction="row" gap="smaller" alignItems="center">
            <Icon size="small" color="interactive" name="link" />
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
  );
};
