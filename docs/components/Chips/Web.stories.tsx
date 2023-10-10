import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Chips } from "@jobber/components/Chips";
import { Chip } from "@jobber/components/Chip";
import { Icon, IconNames } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import { Avatar } from "@jobber/components/Avatar";
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

const BasicTemplate: ComponentStory<typeof Chips> = args => {
  const [selected, setSelected] = useState<string>();
  const chips = [
    { label: "Amazing", initials: "AZ" },
    { label: "Wonderful", icon: "video" },
    { label: "Brilliant", icon: "starFill" },
    { label: "Magnificent" },
  ];
  return (
    <Content>
      <Text>
        You are <u>{selected ? selected : "_______"}</u>
      </Text>
      <Chips {...args} selected={selected} onChange={setSelected}>
        {chips.map((c, index) => {
          return (
            <Chip label={c.label} key={index} onClick={setSelected}>
              <Chip.Prefix>
                {c.icon ? (
                  <Icon name={c.icon as IconNames} size="small" />
                ) : (
                  <></>
                )}
                {c.initials ? (
                  <Avatar initials={c.initials} size="small" />
                ) : (
                  <></>
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
Basic.args = {};

const MultiSelectTemplate: ComponentStory<typeof Chips> = args => {
  const [selected, setSelected] = useState<string[]>([]);
  const multiSelectItems = value => {
    if (selected.includes(value)) {
      setSelected(selected.filter(d => d !== value));
    } else {
      setSelected(d => [...d, value]);
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

const SelectionTemplate: ComponentStory<typeof Chips> = args => {
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
  type: "dismissible",
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
