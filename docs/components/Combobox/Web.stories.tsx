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
<<<<<<< HEAD
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
=======
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
>>>>>>> 4fec09b3 (Revert "Refactor to use a ref")
        ]}
        onSelection={selection => {
          console.log(selection);
        }}
        setSelection="Bilbo Baggins"
      >
        <Combobox.Action
          label="Add a teammate"
          onClick={() => {
<<<<<<< HEAD
            alert("Added a new teammate ✅");
=======
            console.log("Action");
>>>>>>> 4fec09b3 (Revert "Refactor to use a ref")
          }}
        />
        <Combobox.Action
          label="Manage teammates"
          onClick={() => {
<<<<<<< HEAD
            alert("Managed teammates 👍");
=======
            console.log("Action");
>>>>>>> 4fec09b3 (Revert "Refactor to use a ref")
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
          { id: "1", label: "Bilbo Baggins" },
          { id: "2", label: "Frodo Baggins" },
          { id: "3", label: "Pippin Took" },
          { id: "4", label: "Merry Brandybuck" },
          { id: "5", label: "Sam Gamgee" },
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
