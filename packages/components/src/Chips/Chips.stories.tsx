import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Content } from "@jobber/components/Content";
import { Chip, Chips } from "@jobber/components/Chips";
import { Text } from "@jobber/components/Text";
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
} as Meta<typeof Chips>;

const BasicTemplate: StoryFn<typeof Chips> = args => {
  const [selected, setSelected] = useState<string>();

  return (
    <Content>
      <Text>
        You are <u>{selected ? selected : "_______"}</u>
      </Text>
      <Chips
        {...args}
        selected={selected}
        onChange={setSelected}
        type="singleselect"
      >
        <Chip label="Amazing" value="Amazing" />
        <Chip label="Wonderful" value="Wonderful" />
        <Chip label="Brilliant" value="Brilliant" />
        <Chip label="Magnificent" value="Magnificent" />
      </Chips>
    </Content>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
};

const MultiSelectTemplate: StoryFn<typeof Chips> = args => {
  const [selected, setSelected] = useState<string[]>([]);

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
        <Chip label="Amazing" value="Amazing" />
        <Chip label="Wonderful" value="Wonderful" />
        <Chip label="Brilliant" value="Brilliant" />
        <Chip label="Magnificent" value="Magnificent" />
      </Chips>
    </Content>
  );
};

export const MultiSelect = {
  render: MultiSelectTemplate,
  args: {},
};

const SelectionTemplate: StoryFn<typeof Chips> = args => {
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
      type="dismissible"
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

export const Selection = {
  render: SelectionTemplate,
  args: {
    type: "dismissible",
  },
  parameters: {
    previewTabs: {
      code: {
        hidden: true,
        extraImports: {
          "./useFakeOptionQuery": ["useFakeOptionQuery"],
        },
        files: {
          "/useFakeOptionQuery.ts": require("./utils/storyUtils").default,
        },
      },
    },
  },
};
