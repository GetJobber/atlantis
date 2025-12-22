import { Box, Heading } from "@jobber/components";
import { Stack } from "@jobber/components/Stack";
import { TagCombobox } from "./TagCombobox";

interface ChangelogFiltersProps {
  readonly availablePackages: string[];
  readonly selectedPackages: string[];
  readonly onPackagesChange: (packages: string[]) => void;
  readonly availableChangeTypes: string[];
  readonly selectedChangeTypes: string[];
  readonly onChangeTypesChange: (changeTypes: string[]) => void;
}

export const ChangelogFilters = ({
  availablePackages,
  selectedPackages,
  onPackagesChange,
  availableChangeTypes,
  selectedChangeTypes,
  onChangeTypesChange,
}: ChangelogFiltersProps) => {
  const packageOptions = availablePackages.map(pkg => ({
    id: pkg,
    label: pkg,
  }));
  const changeTypeOptions = availableChangeTypes.map(type => ({
    id: type,
    label: type,
  }));

  return (
    <Stack gap="large">
      <Box>
        <Heading level={4}>Package Filters</Heading>
        <TagCombobox
          activatorIcon="add"
          activatorLabel="Add package"
          value={selectedPackages}
          onChange={onPackagesChange}
          options={packageOptions}
        />
      </Box>

      <Box>
        <Heading level={4}>Change Type Filters</Heading>
        <TagCombobox
          activatorIcon="add"
          activatorLabel="Add change type"
          value={selectedChangeTypes}
          onChange={onChangeTypesChange}
          options={changeTypeOptions}
        />
      </Box>
    </Stack>
  );
};
