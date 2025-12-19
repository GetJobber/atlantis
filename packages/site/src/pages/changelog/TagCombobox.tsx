import React, { useEffect, useMemo, useState } from "react";
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
  canAddNew = false,
  destructive = false,
  filterPredicate,
  options,
  onChange,
  value: initialTags = [],
}: TagComboboxProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  const selectedOptions: ComboboxOption[] = useMemo(
    () =>
      selectedTags.map((tag: string) => ({
        id: tag,
        label: tag,
      })),
    [selectedTags],
  );

  const handleSelect = (selectedOpts: ComboboxOption[]) => {
    setSelectedTags(selectedOpts.map(opt => opt.label));
  };

  const handleAddNewTag = (newTag: string) => {
    if (!selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag: string) => tag !== tagToRemove));
  };

  useEffect(() => {
    const effectiveTags =
      selectedTags.length === 0 ? options.map(o => o.label) : selectedTags;
    onChange(effectiveTags);
  }, [selectedTags, onChange, options]);

  const filteredOptions = filterPredicate
    ? options.filter(filterPredicate)
    : options;

  return (
    <Cluster gap="small">
      <Combobox
        multiSelect={true}
        onSearch={setSearchTerm}
        onSelect={handleSelect}
        selected={selectedOptions}
        subjectNoun="tags"
      >
        {filteredOptions.map(({ id, label }) => (
          <Combobox.Option id={label} key={id} label={label} />
        ))}

        <Combobox.Action
          keepOpenOnClick
          label={`Add ${searchTerm} as a new tag`}
          onClick={(_, { searchValue }) => {
            if (searchValue) {
              handleAddNewTag(searchValue);
            }
          }}
          visible={({ searchValue }) =>
            canAddNew && !!searchValue && !selectedTags.includes(searchValue)
          }
        />

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
