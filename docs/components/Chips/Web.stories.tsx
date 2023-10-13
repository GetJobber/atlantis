import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import {
  Chips,
  InternalChipDismissible,
  InternalChipMultiSelect,
  InternalChipSingleSelect,
} from "@jobber/components/Chips";
import { Chip } from "@jobber/components/Chip";
import { Icon, IconNames } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import { Avatar, AvatarSize } from "@jobber/components/Avatar/";
import { useFakeOptionQuery } from "./utils/storyUtils";

export default {
  title: "Components/Selections/Chips/Web",
  component: Chips,
  subcomponents: { Chip },
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Chips": ["Chips", "Chip"],
        },
      },
    },
  },
} as ComponentMeta<typeof Chips>;

const BasicTemplate: ComponentStory<typeof InternalChipSingleSelect> = args => {
  const [selected, setSelected] = useState("");
  const chips = [
    { label: "Amazing", initials: "AZ", size: "small" },
    { label: "Wonderful", icon: "video", size: "small" },
    { label: "Brilliant", icon: "starFill", size: "small" },
    { label: "Magnificent" },
  ];

  return (
    <Content>
      <Text>
        You are <u>{selected ? selected : "_______"}</u>
      </Text>
      <Chips
        type="singleselect"
        {...args}
        selected={selected}
        onChange={allSelections => setSelected(allSelections as string)}
      >
        {chips.map((c, index) => {
          return (
            <Chip
              label={c.label}
              key={index}
              onClick={val => setSelected(val as string)}
            >
              <Chip.Prefix>
                {c.icon && (
                  <Icon
                    name={c.icon as IconNames}
                    size={c.size as AvatarSize}
                  />
                )}
                {c.initials && (
                  <Avatar initials={c.initials} size={c.size as AvatarSize} />
                )}
              </Chip.Prefix>
            </Chip>
          );
        })}
      </Chips>
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  type: "singleselect" as const,
  selected: "",
};

const MultiSelectTemplate: ComponentStory<
  typeof InternalChipMultiSelect
> = args => {
  const [selected, setSelected] = useState<string[]>([]);

  const multiSelectItems = (value?: string | number) => {
    if (value && selected.includes(String(value))) {
      setSelected(selected.filter(d => d !== value));
    } else {
      setSelected(d => [...d, value as string]);
    }
  };

  return (
    <Content>
      <Text>
        You are <u>{selected.length ? selected.join(" ") : "_______"}</u>
      </Text>
      <Chips
        {...args}
        type="multiselect"
        selected={selected}
        onChange={setSelected}
      >
        <Chip label="Amazing" onClick={multiSelectItems} />
        <Chip label="Wonderful" value="Wonderful" onClick={multiSelectItems} />
        <Chip label="Brilliant" value="Brilliant" onClick={multiSelectItems} />
        <Chip
          label="Magnificent"
          value="Magnificent"
          onClick={multiSelectItems}
        />
      </Chips>
    </Content>
  );
};

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {};

const SelectionTemplate: ComponentStory<
  typeof InternalChipDismissible
> = args => {
  const {
    selected,
    options,
    loading,
    handleLoadMore,
    handleSearch,
    handleSelect,
    handleCustomAdd,
  } = useFakeOptionQuery();

  return (
    <Chips
      {...args}
      selected={selected}
      onChange={handleSelect}
      onCustomAdd={handleCustomAdd}
      isLoadingMore={loading}
      onSearch={handleSearch}
      onLoadMore={handleLoadMore}
    >
      {options.map(name => (
        <Chip key={name} label={name} value={name} />
      ))}
    </Chips>
  );
};

export const Selection = SelectionTemplate.bind({});
Selection.args = {
  type: "dismissible" as const,
};

Selection.parameters = {
  previewTabs: {
    code: {
      hidden: false,
      extraImports: {
        "./useFakeOptionQuery": ["useFakeOptionQuery"],
      },
      files: {
        "/useFakeOptionQuery.ts": require("!raw-loader!./utils/storyUtils")
          .default,
      },
    },
  },
};
