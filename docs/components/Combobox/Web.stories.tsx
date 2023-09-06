import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox } from "@jobber/components/Combobox";

export default {
  title: "Components/Combobox/Combobox/Web",
  component: Combobox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Combobox>;

const ComboboxButton: ComponentStory<typeof Combobox> = args => {
  return (
    <div>
      <Combobox {...args}>
        <Combobox.TriggerButton triggerLabel="Select a teammate" />
        <Combobox.Content
          onSelection={selection => {
            console.log(selection);
          }}
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
            { id: "3", label: "Pippin Took" },
            { id: "4", label: "Merry Brandybuck" },
            { id: "5", label: "Sam Gamgee" },
            { id: "6", label: "Bilbo Baggins2" },
            { id: "7", label: "Frodo Baggins2" },
            { id: "8", label: "Pippin Took2" },
            { id: "9", label: "Merry Brandybuck2" },
            { id: "10", label: "Sam Gamgee2" },
            { id: "11", label: "Bilbo Baggins3" },
            { id: "12", label: "Frodo Baggins3" },
            { id: "13", label: "Pippin Took3" },
            { id: "14", label: "Merry Brandybuck3" },
            { id: "15", label: "Sam Gamgee3" },
          ]}
        >
          <Combobox.Action
            label="Add a teammate"
            onClick={() => {
              console.log("Action");
            }}
          />
          <Combobox.Action
            label="Manage teammates"
            onClick={() => {
              console.log("Action");
            }}
          />
        </Combobox.Content>
      </Combobox>
    </div>
  );
};

const ComboboxChip: ComponentStory<typeof Combobox> = args => {
  return (
    <div>
      <Combobox {...args}>
        <Combobox.TriggerChip triggerLabel="Select a tag" />
        <Combobox.Content
          onSelection={selection => {
            console.log(selection);
          }}
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
            { id: "3", label: "Pippin Took" },
            { id: "4", label: "Merry Brandybuck" },
            { id: "5", label: "Sam Gamgee" },
          ]}
        >
          <Combobox.Action
            label="Add a teammate"
            onClick={() => {
              console.log("Action");
            }}
          />
          <Combobox.Action
            label="Manage teammates"
            onClick={() => {
              console.log("Action");
            }}
          />
        </Combobox.Content>
      </Combobox>
    </div>
  );
};

export const Button = ComboboxButton.bind({});
Button.args = {};

export const Chip = ComboboxChip.bind({});
Chip.args = {};
