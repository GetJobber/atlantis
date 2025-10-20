import {
  Button,
  Cluster,
  Heading,
  MultiSelect,
  Switch,
  Text,
} from "@jobber/components";

interface MultiSelectOption {
  label: string;
  checked: boolean;
}

interface ChangelogFiltersProps {
  readonly packageMultiSelect: {
    options: MultiSelectOption[];
    setOptions: (
      newOptionsOrUpdater:
        | MultiSelectOption[]
        | ((prev: MultiSelectOption[]) => MultiSelectOption[]),
    ) => void;
  };
  readonly changeTypeMultiSelect: {
    options: MultiSelectOption[];
    setOptions: (
      newOptionsOrUpdater:
        | MultiSelectOption[]
        | ((prev: MultiSelectOption[]) => MultiSelectOption[]),
    ) => void;
  };
  readonly excludeBumpOnly: boolean;
  readonly onExcludeBumpOnlyChange: (checked: boolean) => void;
  readonly onClearAllFilters: () => void;
}

export const ChangelogFilters = ({
  packageMultiSelect,
  changeTypeMultiSelect,
  excludeBumpOnly,
  onExcludeBumpOnlyChange,
  onClearAllFilters,
}: ChangelogFiltersProps) => {
  return (
    <>
      <Heading level={3}>Filters</Heading>
      <Cluster>
        <Text variation="subdued">Packages</Text>
        <MultiSelect
          defaultLabel="Select packages"
          allSelectedLabel="All packages"
          options={packageMultiSelect.options}
          onOptionsChange={packageMultiSelect.setOptions}
        />
        <Text variation="subdued">Change types</Text>
        <MultiSelect
          defaultLabel="Select change types"
          allSelectedLabel="All change types"
          options={changeTypeMultiSelect.options}
          onOptionsChange={changeTypeMultiSelect.setOptions}
        />

        <Text size="small">Exclude version bumps</Text>
        <Switch
          ariaLabel="Exclude version bumps only"
          value={excludeBumpOnly}
          onChange={onExcludeBumpOnlyChange}
        />

        <Button
          type="secondary"
          label="Clear all filters"
          onClick={onClearAllFilters}
        />
      </Cluster>
    </>
  );
};
