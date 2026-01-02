import {
  Box,
  Cluster,
  Content,
  Icon,
  Link,
  Typography,
} from "@jobber/components";
import { AnchorLinks } from "./AnchorLinks";
import {
  ComponentType,
  ContentExportLinks,
  PlatformType,
} from "../types/content";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";
import { getComponentTypeConfig } from "../utils/componentTypeUtils";

/**
 * Lists some links, typically in the top right corner of the ComponentView.
 * @param param0 {links: ContentExportLinks[], availablePlatforms: PlatformType[], availableVersionsForCurrentPlatform: ComponentType[], currentType: ComponentType}
 * @returns ReactNode
 */
export const ComponentLinks = ({
  links,
  goToProps,
  goToUsage,
  goToDesign,
  availablePlatforms,
  currentType,
}: {
  readonly links?: ContentExportLinks[];
  readonly goToProps: (type: ComponentType) => void;
  readonly goToUsage: (type: ComponentType) => void;
  readonly goToDesign: () => void;
  readonly availablePlatforms: PlatformType[];
  readonly availableVersionsForCurrentPlatform: ComponentType[];
  readonly currentType: ComponentType;
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
      {availablePlatforms.map(platform => {
        const config = getComponentTypeConfig(
          platform === "web" ? "web" : "mobile",
        );

        return (
          <Content key={platform}>
            <Typography
              element={"h3"}
              size="small"
              textCase="uppercase"
              textColor="textSecondary"
              fontWeight={"bold"}
            >
              {config.displayName}
            </Typography>
            <Content spacing="small">
              <Box>
                <a onClick={() => goToUsage(currentType)} href={`#`}>
                  Usage
                </a>
              </Box>
              <Box>
                <a onClick={() => goToProps(currentType)} href={`#`}>
                  Props
                </a>
              </Box>
            </Content>
          </Content>
        );
      })}
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
