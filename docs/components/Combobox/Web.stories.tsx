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
      onSelection={selection => {
        console.log(selection);
      }}
    />
  </div>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
