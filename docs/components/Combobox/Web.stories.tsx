import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Button } from "@jobber/components/Button";

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

const SingleSelectCombobox: ComponentStory<typeof Combobox> = args => {
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

const ComboboxEmptyState: ComponentStory<typeof Combobox> = args => {
  return (
    <Combobox {...args} label="Teammates" subjectNoun="teammates">
      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
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

const ComboboxMultiSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      multiSelect
      label="Teammates"
      onSelect={setSelected}
      selected={selected}
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
  );
};

export const SingleSelect = SingleSelectCombobox.bind({});
SingleSelect.args = {};

export const ClearSelection = ComboboxClearSelection.bind({});
ClearSelection.args = {};

export const EmptyState = ComboboxEmptyState.bind({});
EmptyState.args = {};

export const MultiSelect = ComboboxMultiSelection.bind({});
MultiSelect.args = {};
