import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Chip, Chips } from "@jobber/components/Chips";
import { Text } from "@jobber/components/Text";

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

const SelectionTemplate: ComponentStory<typeof Chips> = () => {
  const [selected, setSelected] = useState<string[]>(["Mando", "Darth Vader"]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([
    "Mando",
    "Darth Vader",
    "Yoda",
    "Obi-Wan Kenobi",
    "Anakin Skywalker",
    "Padme Amidala",
    "Mace Windu",
  ]);
  const [externalSearchValue, setExternalSearchValue] = useState("");

  const handleSelect = (value: string[]) => {
    setSelected(value);
  };

  const handleCustomAdd = (value: string) => {
    setOptions(prev => [...prev, value]);
    setSelected(prev => [...prev, value]);
  };

  const handleSearch = (value: string) => {
    setExternalSearchValue(value);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Text>{externalSearchValue}</Text>
      <Chips
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
    </>
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

const ControlledSelectionTemplate: ComponentStory<typeof Chips> = () => {
  const [selected, setSelected] = useState<string[]>([
    "Luke Skywalker",
    "Leia Organa",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedOptions, setDisplayedOptions] = useState([
    "Luke Skywalker",
    "Leia Organa",
    "Han Solo",
    "Chewbacca",
    "R2-D2",
    "C-3PO",
    "Darth Vader",
  ]);

  // Full list of all available options
  const allOptions = [
    "Luke Skywalker",
    "Leia Organa",
    "Han Solo",
    "Chewbacca",
    "R2-D2",
    "C-3PO",
    "Darth Vader",
    "Obi-Wan Kenobi",
    "Yoda",
    "Emperor Palpatine",
    "Boba Fett",
    "Lando Calrissian",
    "Jabba the Hutt",
    "Admiral Ackbar",
    "Wedge Antilles",
  ];

  const handleSelect = (value: string[]) => {
    setSelected(value);
  };

  // Handle search in controlled mode
  // Here we manually filter our options based on search term
  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (value === "") {
      setDisplayedOptions(allOptions.slice(0, 7)); // Reset to initial set
    } else {
      // Filter options based on search term
      // Note: We don't need to include selected options in the filtered list
      // The component will ensure selected chips remain visible
      const filteredOptions = allOptions.filter(option =>
        option.toLowerCase().includes(value.toLowerCase()),
      );
      setDisplayedOptions(filteredOptions);
    }
  };

  // Handle custom add in controlled mode
  const handleCustomAdd = (value: string) => {
    // Add to both our main options list and selected items
    if (!allOptions.includes(value)) {
      setDisplayedOptions([...displayedOptions, value]);
    }
    setSelected(prev => [...prev, value]);
  };

  return (
    <>
      <Text>
        Controlled mode with search term: &ldquo;{searchTerm}&rdquo;
        <br />
        Selected: {selected.join(", ")}
        <br />
        <small style={{ color: "var(--color-text--subdued)" }}>
          Try searching for &ldquo;Solo&rdquo; - notice how the selected chips
          remain visible even when they don&apos;t match the search.
        </small>
      </Text>
      <Chips
        controlled={true}
        type="dismissible"
        selected={selected}
        onChange={handleSelect}
        onCustomAdd={handleCustomAdd}
        onSearch={handleSearch}
      >
        {displayedOptions.map(name => (
          <Chip key={name} label={name} value={name} />
        ))}
      </Chips>
    </>
  );
};

export const ControlledSelection = ControlledSelectionTemplate.bind({});
ControlledSelection.args = {
  type: "dismissible",
};

ControlledSelection.parameters = {
  docs: {
    description: {
      story: `
        This example demonstrates the controlled mode for dismissible chips.
        
        ## Controlled Mode Benefits
        
        When \`controlled={true}\` is set on dismissible chips:
        
        - **No internal filtering**: The component doesn't filter options based on search value
        - **No debouncing**: Search events are immediately passed to the parent component
        - **Consumer-driven filtering**: The parent component is responsible for filtering based on search
        - **Better performance**: Avoid duplicate filtering logic and state
        - **More flexibility**: Implement complex filtering logic (e.g., API requests, fuzzy search)
        
        ## Implementation Notes
        
        In controlled mode, you should:
        
        1. Maintain state for the options to display in your parent component
        2. Handle filtering in your \`onSearch\` callback
        3. Pass the filtered options as children to the Chips component
      `,
    },
  },
};
