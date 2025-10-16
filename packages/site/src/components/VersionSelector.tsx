import { Box, Chip, Menu } from "@jobber/components";
import { ComponentType } from "../types/content";
import { getComponentTypeConfig } from "../utils/componentTypeUtils";

interface VersionSelectorProps {
  readonly availableVersions: ComponentType[];
  readonly currentVersion: ComponentType;
  readonly onVersionChange: (version: ComponentType) => void;
}

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
          <Chip
            label={
              currentVersion.charAt(0).toUpperCase() + currentVersion.slice(1)
            }
          />
        </Menu.Trigger>
        <Menu.Content>
          {availableVersions.map(version => {
            const config = getComponentTypeConfig(version);

            return (
              <Menu.Item
                key={version}
                textValue={config.displayName}
                onClick={() => onVersionChange(version)}
              >
                <Menu.ItemLabel>{config.displayName}</Menu.ItemLabel>
              </Menu.Item>
            );
          })}
        </Menu.Content>
      </Menu>
    </Box>
  );
};
