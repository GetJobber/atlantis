import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormatRelativeDateTime } from "@jobber/components/FormatRelativeDateTime";

export default {
  title: "Components/Utilities/FormatRelativeDateTime/Web",
  component: FormatRelativeDateTime,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof FormatRelativeDateTime>;

const BasicTemplate: ComponentStory<typeof FormatRelativeDateTime> = args => (
  <FormatRelativeDateTime {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  date: new Date(new Date().setMinutes(new Date().getMinutes() - 5)),
};
