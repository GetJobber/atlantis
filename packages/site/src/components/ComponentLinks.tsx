import {
  Box,
  Cluster,
  Content,
  Icon,
  Link,
  Stack,
  Typography,
} from "@jobber/components";
import { AnchorLinks } from "./AnchorLinks";
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
  const { isMinimal } = useAtlantisSite();
  if (isMinimal) return null;

  return (
    <Content spacing={"larger"}>
      <AnchorLinks
        id="design"
        header="Design"
        additionalOnClickAction={goToDesign}
      />
      {webEnabled && (
        <Content>
          <Typography
            element={"h3"}
            size="small"
            textCase="uppercase"
            textColor="textSecondary"
            fontWeight={"bold"}
          >
            Web
          </Typography>
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
          <Typography
            element={"h3"}
            size="small"
            textCase="uppercase"
            textColor="textSecondary"
            fontWeight={"bold"}
          >
            Mobile
          </Typography>
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
        <Typography
          element={"h3"}
          size="small"
          textCase="uppercase"
          textColor="textSecondary"
          fontWeight={"bold"}
        >
          Links
        </Typography>
        <Content spacing="small">
          {links?.map((link, index) => (
            <Cluster key={link.url} gap="small">
              <Icon size="small" color="interactive" name="link" />
              <Link key={index} url={link.url} external>
                {link.label}
              </Link>
            </Cluster>
          ))}
        </Content>
      </Content>
    </Content>
  );
};
