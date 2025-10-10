import { Box, Option, Select, Typography } from "@jobber/components";
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
      <Typography size="small" textColor="textSecondary">
        Version:
      </Typography>
      <Select
        value={currentVersion}
        onChange={value => onVersionChange(value as ComponentType)}
        size="small"
      >
        {availableVersions.map(version => {
          const config = getComponentTypeConfig(version);

          return (
            <Option key={version} value={version}>
              {config.displayName}
            </Option>
          );
        })}
      </Select>
    </Box>
  );
};
