import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Button as ClearButton } from "@jobber/components/Button";

export default {
  title: "Components/Selections/Combobox/Web",
  component: Combobox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Combobox>;

const ComboboxButton: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      onSelect={selection => {
        setSelected(selection);
      }}
      selected={selected}
      subjectNoun="teammates"
    >
      <Combobox.TriggerButton
        label="Select Teammate"
        variation="subtle"
        type="primary"
        icon="arrowDown"
        iconOnRight={true}
      />

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
  );
};

const ComboboxChip: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      onSelect={selection => {
        setSelected(selection);
      }}
      selected={selected}
      subjectNoun="teammates"
    >
      <Combobox.TriggerChip label="Teammates" />

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

const ComboboxEmptyState: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args}>
      <Combobox.TriggerButton
        label="Select Teammate"
        variation="subtle"
        type="primary"
        icon="arrowDown"
        iconOnRight={true}
      />
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
    <>
      <ClearButton
        label="Clear Selection"
        type="primary"
        onClick={() => setSelected([])}
      />
      <Combobox {...args}>
        <Combobox.TriggerButton
          label="Select a teammate"
          variation="subtle"
          type="primary"
          icon="arrowDown"
          iconOnRight={true}
        />
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
    </>
  );
};

const ComboboxMultiSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args} multiSelect>
      <Combobox.TriggerButton
        label="Select a teammate"
        variation="subtle"
        type="primary"
        icon="arrowDown"
        iconOnRight={true}
      />
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
