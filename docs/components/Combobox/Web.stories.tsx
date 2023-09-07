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
          "Bilbo Baggins",
          "Frodo Baggins",
          "Pippin Took",
          "Merry Brandybuck",
          "Sam Gamgee",
          "Bilbo Baggins2",
          "Frodo Baggins2",
          "Pippin Took2",
          "Merry Brandybuck2",
          "Sam Gamgee2",
          "Bilbo Baggins3",
          "Frodo Baggins3",
          "Pippin Took3",
          "Merry Brandybuck3",
          "Sam Gamgee3",
        ]}
        onSelection={selection => {
          console.log(selection);
        }}
      >
        <Combobox.Action
          label="Add a teammate"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
        <Combobox.Action
          label="Manage teammates"
          onClick={() => {
            alert("Managed teammates 👍");
          }}
        />
      </Combobox.Content>
    </Combobox>
  );
};

const ComboboxChip: ComponentStory<typeof Combobox> = args => {
  return (
    <Combobox {...args}>
      <Combobox.TriggerChip label="Tags" />
      <Combobox.Content
        options={[
          "Bilbo Baggins",
          "Frodo Baggins",
          "Pippin Took",
          "Merry Brandybuck",
          "Sam Gamgee",
        ]}
        onSelection={selection => {
          console.log(selection);
        }}
      >
        <Combobox.Action
          label="Add a teammate"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
        <Combobox.Action
          label="Manage teammates"
          onClick={() => {
            alert("Managed teammates 👍");
          }}
        />
      </Combobox.Content>
    </Combobox>
  );
};

export const Button = ComboboxButton.bind({});
Button.args = {};

export const Chip = ComboboxChip.bind({});
Chip.args = {};
