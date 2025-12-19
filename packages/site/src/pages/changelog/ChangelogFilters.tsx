import { Button, Cluster, Heading, Switch, Text } from "@jobber/components";
import { TagCombobox } from "./TagCombobox";

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
        <TagCombobox
          activatorIcon="add"
          activatorLabel="Add package"
          value={packageMultiSelect.options.map(option => option.label)}
          onChange={newSelected =>
            packageMultiSelect.setOptions(
              newSelected.map(label => ({ label, checked: true })),
            )
          }
          options={packageMultiSelect.options.map(option => ({
            id: option.label,
            label: option.label,
          }))}
        />
        <Text variation="subdued">Change types</Text>
        <TagCombobox
          activatorIcon="add"
          activatorLabel="Add change type"
          value={changeTypeMultiSelect.options.map(option => option.label)}
          onChange={newSelected => {
            changeTypeMultiSelect.setOptions(
              newSelected.map(label => ({ label, checked: true })),
            );
          }}
          options={changeTypeMultiSelect.options.map(option => ({
            id: option.label,
            label: option.label,
          }))}
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
