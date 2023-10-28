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
    <Combobox {...args}>
      <Combobox.TriggerButton
        label="Select Teammate"
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
  );
};

const ComboboxChip: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox {...args}>
      <Combobox.TriggerChip label="Teammates" />
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
    <Combobox
      multiSelect
      onSelect={selection => {
        setSelected(selection);
      }}
      selectionTiming="onClose"
      selected={selected}
    >
      <Combobox.Option id="1" label="Jason Vorhees" />
      <Combobox.Option id="2" label="Michael Myers" />
      <Combobox.Option id="3" label="Freddy Krueger" />
      <Combobox.Option id="4" label="Chucky" />
      <Combobox.Option id="5" label="Leatherface" />
      <Combobox.Option id="6" label="Pinhead" />
      <Combobox.Option id="7" label="Pennywise" />
      <Combobox.Option id="8" label="Jigsaw" />
      <Combobox.Option id="9" label="Ghostface" />
      <Combobox.Option id="10" label="Norman Bates" />
      <Combobox.Option id="11" label="Candyman" />
      <Combobox.Option id="12" label="The Creeper" />
      <Combobox.Option id="13" label="Jack Torrance" />
      <Combobox.Option id="14" label="Damien Thorn" />
      <Combobox.Option id="15" label="Regan MacNeil" />
      <Combobox.Option id="16" label="Carrie White" />
      <Combobox.Option id="17" label="Hannibal Lecter" />
      <Combobox.Option id="18" label="Annie Wilkes" />
      <Combobox.Option id="19" label="Dracula" />
      <Combobox.Option id="20" label="Frankenstein's Monster" />
      <Combobox.Option id="21" label="The Mummy" />
      <Combobox.Option id="22" label="The Wolfman" />

      <Combobox.TriggerButton
        label="Select a teammate"
        variation="subtle"
        type="primary"
        icon="arrowDown"
        iconOnRight={true}
      />
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
