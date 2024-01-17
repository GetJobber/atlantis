import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Button } from "@jobber/components/Button";
import { Typography } from "@jobber/components/Typography";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Selections/Combobox/Web",
  component: Combobox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
  decorators: [
    // Workaround Storybook's wrapping flex parent that make everything full width
    story => <div>{story()}</div>,
  ],
} as ComponentMeta<typeof Combobox>;

const ComboboxClearSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([
    {
      id: "1",
      label: "Bilbo Baggins",
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Button
        label="Clear Selection"
        type="primary"
        onClick={() => setSelected([])}
      />
      <Combobox
        {...args}
        label="Teammates"
        selected={selected}
        onSelect={setSelected}
      >
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
        <Combobox.Option id="3" label="Pippin Took" />
        <Combobox.Option id="4" label="Merry Brandybuck" />
        <Combobox.Option id="5" label="Sam Gamgee" />
        <Combobox.Option id="6" label="Aragorn" />
        <Combobox.Option id="7" label="Galadriel" />
        <Combobox.Option id="8" label="Arwen" />
        <Combobox.Option id="9" label="Gandalf" />
        <Combobox.Option id="10" label="Legolas" />
        <Combobox.Option id="11" label="Gimli" />
        <Combobox.Option id="12" label="Samwise Gamgee" />
        <Combobox.Option id="14" label="Faramir" />

        <Combobox.Action
          label="Add Teammate"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
        <Combobox.Action
          label="Manage Teammates"
          onClick={() => {
            alert("Managed teammates 👍");
          }}
        />
      </Combobox>
    </div>
  );
};

const ComboboxCustomActivator: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography element={"h3"} fontFamily={"display"}>
          Custom Activators using Button:
        </Typography>{" "}
        <Combobox {...args} onSelect={setSelected} selected={selected}>
          <Combobox.Activator>
            <Button label={"Tax Rate"} icon={"dropdown"} iconOnRight={true} />
          </Combobox.Activator>
          <Combobox.Option id="1" label="13%" />
          <Combobox.Option id="2" label="15%" />
          <Combobox.Option id="3" label="20%" />

          <Combobox.Action
            label="Add Tax Rate"
            onClick={() => {
              alert("Added a new tax rate ✅");
            }}
          />
        </Combobox>
        <br />
        <Combobox {...args} onSelect={setSelected} selected={selected}>
          <Combobox.Activator>
            <Button
              label={"Tax Rate"}
              icon={"plus"}
              type={"primary"}
              variation={"subtle"}
            />
          </Combobox.Activator>
          <Combobox.Option id="1" label="13%" />
          <Combobox.Option id="2" label="15%" />
          <Combobox.Option id="3" label="20%" />

          <Combobox.Action
            label="Add Tax Rate"
            onClick={() => {
              alert("Added a new tax rate ✅");
            }}
          />
        </Combobox>
        <br />
        <Combobox {...args} onSelect={setSelected} selected={selected}>
          <Combobox.Activator>
            <Button
              label={""}
              icon={"percent"}
              size={"large"}
              type={"secondary"}
            />
          </Combobox.Activator>
          <Combobox.Option id="1" label="13%" />
          <Combobox.Option id="2" label="15%" />
          <Combobox.Option id="3" label="20%" />

          <Combobox.Action
            label="Add Tax Rate"
            onClick={() => {
              alert("Added a new tax rate ✅");
            }}
          />
        </Combobox>
      </div>
      <br />
      <Typography element={"h3"} fontFamily={"display"}>
        Custom Activator using Chip:
      </Typography>
      <Combobox {...args} onSelect={setSelected} selected={selected}>
        <Combobox.Activator>
          <Chip label="" heading={"Tax Rate"} variation={"subtle"}>
            <Chip.Prefix>
              <Icon name={"percent"} size={"small"} />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name={"arrowDown"} size={"large"} />
            </Chip.Suffix>
          </Chip>
        </Combobox.Activator>
        <Combobox.Option id="1" label="13%" />
        <Combobox.Option id="2" label="15%" />
        <Combobox.Option id="3" label="20%" />

        <Combobox.Action
          label="Add Tax Rate"
          onClick={() => {
            alert("Added a new tax rate ✅");
          }}
        />
      </Combobox>
    </>
  );
};

const ComboboxEmptyState: ComponentStory<typeof Combobox> = args => {
  return (
    <Combobox {...args} label="Teammates" subjectNoun="teammates" selected={[]}>
      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
    </Combobox>
  );
};

const ComboboxMultiSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      multiSelect
      label="Teammates"
      onSelect={selection => {
        setSelected(selection);
      }}
      selected={selected}
    >
      <Combobox.Option id="1" label="Bilbo Baggins" />
      <Combobox.Option id="2" label="Frodo Baggins" />
      <Combobox.Option id="3" label="Pippin Took" />
      <Combobox.Option id="4" label="Merry Brandybuck" />
      <Combobox.Option id="5" label="Sam Gamgee" />
      <Combobox.Option id="6" label="Aragorn" />
      <Combobox.Option id="7" label="Gimli" />
      <Combobox.Option id="8" label="Legolas" />
      <Combobox.Option id="9" label="Gandalf" />
      <Combobox.Option id="10" label="Gollum" />
      <Combobox.Option id="11" label="Sauron" />
      <Combobox.Option id="12" label="Saruman" />
      <Combobox.Option id="13" label="Elrond" />
      <Combobox.Option id="14" label="Galadriel" />

      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
      <Combobox.Action
        label="Manage Teammates"
        onClick={() => {
          alert("Managed teammates 👍");
        }}
      />
    </Combobox>
  );
};

const ComboboxSingleSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      onSelect={setSelected}
      selected={selected}
      label="Teammates"
    >
      <Combobox.Option id="1" label="Bilbo Baggins" />
      <Combobox.Option id="2" label="Frodo Baggins" />
      <Combobox.Option id="3" label="Pippin Took" />
      <Combobox.Option id="4" label="Merry Brandybuck" />
      <Combobox.Option id="5" label="Sam Gamgee" />

      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
      <Combobox.Action
        label="Manage Teammates"
        onClick={() => {
          alert("Managed teammates 👍");
        }}
      />
    </Combobox>
  );
};

const DynamicButton: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      onSelect={setSelected}
      selected={selected}
      label="Teammates"
    >
      <Combobox.Option id="1" label="Search" />
      <Combobox.Option id="2" label="Something" />
      <Combobox.Option id="3" label="That's not" />
      <Combobox.Option id="4" label="There" />

      <Combobox.Action
        visible={({ searchValue }) => Boolean(searchValue)}
        label={({ searchValue }) => `Add ${searchValue} as teammate`}
        onClick={(_, { searchValue }) => {
          alert(`Added ${searchValue} as teammate`);
        }}
      />
    </Combobox>
  );
};

const ComboboxCustomSearch: ComponentStory<typeof Combobox> = args => {
  const initialOptions: ComboboxOption[] = [
    { id: "1", label: "David" },
    { id: "2", label: "Johnny" },
    { id: "3", label: "Moira" },
    { id: "4", label: "Alexis" },
  ];
  const [selected, setSelected] = useState<ComboboxOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayOptions, setDisplayOptions] =
    useState<ComboboxOption[]>(initialOptions);

  const mockQuery = (query: string) => {
    return new Promise<ComboboxOption[]>(resolve => {
      setTimeout(() => {
        if (query === "no") {
          resolve([]);
        } else {
          resolve([
            { id: "5", label: `Patrick ${query}` },
            { id: "6", label: `Roland ${query}` },
            { id: "7", label: `Twyla ${query}` },
            { id: "8", label: `Stevie ${query}` },
          ]);
        }
      }, 500);
    });
  };

  return (
    <Combobox
      {...args}
      onSelect={setSelected}
      selected={selected}
      label="Teammates"
      multiSelect
      hadInitalOptions={initialOptions.length > 0}
      onSearchChange={async (term: string) => {
        setLoading(true);

        if (term == "") {
          setDisplayOptions(initialOptions);
        } else {
          const results = await mockQuery(term);

          setDisplayOptions(results);
        }

        setLoading(false);
      }}
      loading={loading}
    >
      {displayOptions.map(option => {
        return (
          <Combobox.Option
            key={option.id}
            id={option.id}
            label={option.label}
          />
        );
      })}
    </Combobox>
  );
};

export const ClearSelection = ComboboxClearSelection.bind({});
ClearSelection.args = {};

export const CustomActivator = ComboboxCustomActivator.bind({});
CustomActivator.args = {};

export const EmptyState = ComboboxEmptyState.bind({});
EmptyState.args = {};

export const MultiSelect = ComboboxMultiSelection.bind({});
MultiSelect.args = {};

export const SingleSelect = ComboboxSingleSelection.bind({});
SingleSelect.args = {};

export const DynamicAction = DynamicButton.bind({});
DynamicAction.args = {};

export const CustomSearch = ComboboxCustomSearch.bind({});
CustomSearch.args = {};
