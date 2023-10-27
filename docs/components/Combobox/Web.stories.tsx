import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Button, Button as ClearButton } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";

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

const BasicCombobox: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args} heading="Teammates">
      <Combobox.Content
        options={[
          { id: "1", label: "Bilbo Baggins" },
          { id: "2", label: "Frodo Baggins" },
          { id: "3", label: "Pippin Took" },
          { id: "4", label: "Merry Brandybuck" },
          { id: "5", label: "Sam Gamgee" },
        ]}
        onSelect={selection => {
          setSelected(selection);
        }}
        selected={selected}
      >
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
      </Combobox.Content>
    </Combobox>
  );
};

const ComboboxButton: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args}>
      <Combobox.Activator>
        <Button
          label="Select Teammate"
          variation="subtle"
          type="primary"
          icon="arrowDown"
          iconOnRight={true}
        />
      </Combobox.Activator>
      <Combobox.Content
        options={[
          { id: "1", label: "Bilbo Baggins" },
          { id: "2", label: "Frodo Baggins" },
          { id: "3", label: "Pippin Took" },
          { id: "4", label: "Merry Brandybuck" },
          { id: "5", label: "Sam Gamgee" },
          { id: "6", label: "Aragorn" },
          { id: "7", label: "Galadriel" },
          { id: "8", label: "Arwen" },
          { id: "9", label: "Gandalf" },
          { id: "10", label: "Legolas" },
          { id: "11", label: "Gimli" },
          { id: "12", label: "Samwise Gamgee" },
          { id: "14", label: "Faramir" },
        ]}
        onClose={selection => {
          setSelected(selection);
        }}
        selected={selected}
        subjectNoun="teammates"
      >
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
      </Combobox.Content>
    </Combobox>
  );
};

const ComboboxChip: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args}>
      <Combobox.Activator>
        <Chip variation="subtle" label="Teammates" />
      </Combobox.Activator>
      <Combobox.Content
        options={[
          { id: "1", label: "Bilbo Baggins" },
          { id: "2", label: "Frodo Baggins" },
          { id: "3", label: "Pippin Took" },
          { id: "4", label: "Merry Brandybuck" },
          { id: "5", label: "Sam Gamgee" },
        ]}
        onClose={selection => {
          setSelected(selection);
        }}
        selected={selected}
        subjectNoun="teammates"
      >
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
      </Combobox.Content>
    </Combobox>
  );
};

const ComboboxEmptyState: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args} heading="Teammates">
      <Combobox.Content
        options={[]}
        onSelect={selection => {
          setSelected(selection);
        }}
        selected={selected}
        subjectNoun="teammates"
      >
        <Combobox.Action
          label="Add Teammate"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
      </Combobox.Content>
    </Combobox>
  );
};

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
      <ClearButton
        label="Clear Selection"
        type="primary"
        onClick={() => setSelected([])}
      />
      <Combobox {...args} heading="Teammates">
        <Combobox.Content
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
            { id: "3", label: "Pippin Took" },
            { id: "4", label: "Merry Brandybuck" },
            { id: "5", label: "Sam Gamgee" },
            { id: "6", label: "Aragorn" },
            { id: "7", label: "Galadriel" },
            { id: "8", label: "Arwen" },
            { id: "9", label: "Gandalf" },
            { id: "10", label: "Legolas" },
            { id: "11", label: "Gimli" },
            { id: "12", label: "Samwise Gamgee" },
            { id: "14", label: "Faramir" },
          ]}
          onSelect={selection => {
            setSelected(selection);
          }}
          selected={selected}
          subjectNoun="teammates"
        >
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
        </Combobox.Content>
      </Combobox>
    </div>
  );
};

const ComboboxMultiSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args} multiSelect heading="Teammates">
      <Combobox.Content
        options={[
          { id: "1", label: "Bilbo Baggins" },
          { id: "2", label: "Frodo Baggins" },
          { id: "3", label: "Pippin Took" },
          { id: "4", label: "Merry Brandybuck" },
          { id: "5", label: "Sam Gamgee" },
          { id: "6", label: "Aragorn" },
          { id: "7", label: "Galadriel" },
          { id: "8", label: "Arwen" },
          { id: "9", label: "Gandalf" },
          { id: "10", label: "Legolas" },
          { id: "11", label: "Gimli" },
          { id: "12", label: "Samwise Gamgee" },
          { id: "14", label: "Faramir" },
        ]}
        onSelect={selection => {
          setSelected(selection);
        }}
        selected={selected}
      >
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
      </Combobox.Content>
    </Combobox>
  );
};

export const Basic = BasicCombobox.bind({});
Basic.args = {};

export const TriggerButton = ComboboxButton.bind({});
TriggerButton.args = {};

export const TriggerChip = ComboboxChip.bind({});
TriggerChip.args = {};

export const ClearSelection = ComboboxClearSelection.bind({});
ClearSelection.args = {};

export const EmptyState = ComboboxEmptyState.bind({});
EmptyState.args = {};

export const MultiSelect = ComboboxMultiSelection.bind({});
MultiSelect.args = {};
