import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Combobox } from "@jobber/components/Combobox";

export default {
  title: "Components/Category/Combobox/Web",
  component: Combobox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Combobox>;

const BasicTemplate: ComponentStory<typeof Combobox> = args => (
  <div>
    <Combobox
      {...args}
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
      action={{
        label: "Add a Teammate",
        onClick: () => {
          console.log("Action");
        },
      }}
    />
  </div>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
