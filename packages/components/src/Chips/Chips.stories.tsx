import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import uniq from "lodash/uniq";
import { Content } from "@jobber/components/Content";
import { Chip, Chips } from "@jobber/components/Chips";
import { Banner } from "@jobber/components/Banner";
import { Text } from "@jobber/components/Text";

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
    <Content>
      <Banner type="warning" dismissible={false}>
        This component is deprecated. Please use Autocomplete with the
        &quot;multiple&quot; prop instead.
      </Banner>
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
    </Content>
  );
};

export const Selection: Story = {
  render: SelectionTemplate,
  args: {
    type: "dismissible",
  },
};

function useFakeOptionQuery() {
  const [options, setOptions] = useState<string[]>([]);
  const initialDataGetUrl = "https://swapi.dev/api/people/?format=json";
  const [nextGet, setNextGet] = useState(initialDataGetUrl);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(["Mando", "Din Djarin"]);

  const actions = {
    handleLoadMore: () => {
      if (loading || !nextGet) return;

      setLoading(true);
      fetchData(nextGet).then(result => {
        const newOptions = uniq([...selected, ...options, ...result.options]);
        setOptions(newOptions);
        setNextGet(result.next);
        setLoading(false);
      });
    },
    handleSearch: (searchValue: string) => {
      setNextGet(initialDataGetUrl + `&search=${searchValue}`);
      setOptions(selected);
    },
    handleSelect: (value: string[]) => {
      setSelected(value);
    },
    handleCustomAdd: (value: string) => {
      setSelected(uniq([...selected, value]));
    },
  };

  useEffect(() => actions.handleLoadMore(), []); // load once on mount
  useEffect(() => actions.handleLoadMore(), [nextGet]);

  return { selected, options, loading, ...actions };
}

async function fetchData(url: string) {
  const response = await fetch(url);
  const { results, next } = await response.json();
  const options: string[] = results.map((data: { name: string }) => data.name);

  return { options, next };
}
