import { Chip, ChipDismissible } from "@jobber/components/Chip";
import { Cluster } from "@jobber/components/Cluster";
import type { ComboboxOption } from "@jobber/components/Combobox";
import { Combobox } from "@jobber/components/Combobox";
import { Icon } from "@jobber/components/Icon";

interface TagComboboxProps {
  readonly activatorIcon: "add" | "remove";
  readonly activatorLabel: string;
  readonly canAddNew?: boolean;
  readonly destructive?: boolean;
  readonly filterPredicate?: (
    tag: { id: string; label: string },
    index: number,
    array: { id: string; label: string }[],
  ) => boolean;
  readonly onChange: (tags: string[]) => void;
  readonly value: string[];
  readonly options: { id: string; label: string }[];
}

export function TagCombobox({
  activatorIcon,
  activatorLabel,
  destructive = false,
  filterPredicate,
  options,
  onChange,
  value: selectedTags = [],
}: TagComboboxProps) {
  const handleSelect = (selectedOpts: ComboboxOption[]) => {
    onChange(selectedOpts.map(opt => String(opt.id)));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter((tag: string) => tag !== tagToRemove));
  };

  const filteredOptions = filterPredicate
    ? options.filter(filterPredicate)
    : options;

  const selectedOptions = selectedTags.map(tag => ({ id: tag, label: tag }));

  return (
    <Cluster gap="small">
      <Combobox
        multiSelect={true}
        onSelect={handleSelect}
        selected={selectedOptions}
        subjectNoun="tags"
      >
        {filteredOptions.map(({ id, label }) => (
          <Combobox.Option id={id} key={id} label={label} />
        ))}

        <Combobox.Activator>
          <Chip label={activatorLabel} variation="subtle">
            <Chip.Suffix>
              <Icon
                color="interactiveSubtle"
                name={activatorIcon}
                size="small"
              />
            </Chip.Suffix>
          </Chip>
        </Combobox.Activator>
      </Combobox>

      {selectedTags.map((tag: string) => (
        <ChipDismissible
          invalid={destructive}
          key={tag}
          label={tag}
          onClick={() => handleRemoveTag(tag)}
        />
      ))}
    </Cluster>
  );
}
