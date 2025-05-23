import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormatDate } from "@jobber/components/FormatDate";

export default {
  title: "Components/Utilities/FormatDate/Web",
  component: FormatDate,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof FormatDate>;

const BasicTemplate: ComponentStory<typeof FormatDate> = args => (
  <FormatDate {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  date: new Date(),
};
