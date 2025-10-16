import { Box, Chip, Menu } from "@jobber/components";
import { ComponentType } from "../types/content";

interface VersionSelectorProps {
  readonly availableVersions: ComponentType[];
  readonly currentVersion: ComponentType;
  readonly onVersionChange: (version: ComponentType) => void;
}

const versionLabelMap: Record<ComponentType, string> = {
  web: "Legacy",
  webSupported: "Supported",
  mobile: "Mobile",
};

export const VersionSelector = ({
  availableVersions,
  currentVersion,
  onVersionChange,
}: VersionSelectorProps) => {
  // Don't show the selector if there's only one version
  if (availableVersions.length <= 1) {
    return null;
  }

  return (
    <Box direction="row" gap="small" alignItems="center">
      <Menu>
        <Menu.Trigger>
          <Chip heading="Version" label={versionLabelMap[currentVersion]} />
        </Menu.Trigger>
        <Menu.Content>
          {availableVersions.map(version => {
            return (
              <Menu.Item
                key={version}
                textValue={versionLabelMap[version]}
                onClick={() => onVersionChange(version)}
              >
                <Menu.ItemLabel>{versionLabelMap[version]}</Menu.ItemLabel>
              </Menu.Item>
            );
          })}
        </Menu.Content>
      </Menu>
    </Box>
  );
};
