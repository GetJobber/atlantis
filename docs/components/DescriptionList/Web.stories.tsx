import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DescriptionList } from "@jobber/components/DescriptionList";

export default {
  title: "Components/Lists and Tables/DescriptionList/Web",
  component: DescriptionList,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof DescriptionList>;

const BasicTemplate: ComponentStory<typeof DescriptionList> = args => (
  <DescriptionList {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  data: [
    ["Issued", "2018-12-08"],
    ["Due", "2019-01-06"],
  ],
};
