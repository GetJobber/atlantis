import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Content } from "@jobber/components/Content";
import { Chip, Chips } from "@jobber/components/Chips";
import { Text } from "@jobber/components/Text";
import { useFakeOptionQuery } from "./utils/storyUtils";

const meta = {
  title: "Components/Selections/Chips",
  component: Chips,
  subcomponents: { Chip },
} satisfies Meta<typeof Chips>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Chips>>>;

const BasicTemplate = (args: Story["args"]) => {
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

export const Basic: Story = {
  render: BasicTemplate,
  args: {},
};

const MultiSelectTemplate = (args: Story["args"]) => {
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

export const MultiSelect: Story = {
  render: MultiSelectTemplate,
  args: {},
};

const SelectionTemplate = (args: Story["args"]) => {
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

export const Selection: Story = {
  render: SelectionTemplate,
  args: {
    type: "dismissible",
  },
};
