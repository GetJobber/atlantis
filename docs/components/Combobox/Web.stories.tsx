import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
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
    <Content>
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
      <Typography element={"h3"} fontFamily={"display"}>
        Custom Activator using Chip:
      </Typography>
      <Combobox {...args} onSelect={setSelected} selected={selected}>
        <Combobox.Activator>
          <Chip label="" heading={"Tax Rate"} variation={"subtle"}>
            <Chip.Prefix>
              <Icon name={"percent"} size={"small"} />
            </Chip.Prefix>
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
    </Content>
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
