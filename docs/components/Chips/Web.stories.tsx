import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof Chips>;

const BasicTemplate: ComponentStory<typeof Chips> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {};

const MultiSelectTemplate: ComponentStory<typeof Chips> = args => {
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

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {};

const SelectionTemplate: ComponentStory<typeof Chips> = args => {
  const [selected, setSelected] = useState<string[]>(["Mando"]);
  const [options, setOptions] = useState<string[]>([
    "Mando",
    "Luke",
    "Leia",
    "Han",
    "Chewie",
    "R2D2",
    "C3PO",
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleCustomAdd = (value: string) => {
    setOptions([...options, value]);
  };

  const handleSearch = (value: string) => {
    options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase()),
    );
  };

  return (
    <Chips
      {...args}
      type="dismissible"
      selected={selected}
      onChange={setSelected}
      onCustomAdd={handleCustomAdd}
      isLoadingMore={loading}
      onSearch={handleSearch}
      onLoadMore={() => console.log("load more")}
      onlyShowMenuOnSearch={true}
      submitInputOnFocusShift={true}
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
      hidden: true,
      extraImports: {
        "./useFakeOptionQuery": ["useFakeOptionQuery"],
      },
      files: {
        "/useFakeOptionQuery.ts": require("./utils/storyUtils").default,
      },
    },
  },
};
