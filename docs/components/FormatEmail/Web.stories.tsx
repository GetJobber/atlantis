import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormatEmail } from "@jobber/components/FormatEmail";

export default {
  title: "Components/Utilities/FormatEmail/Web",
  component: FormatEmail,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof FormatEmail>;

const BasicTemplate: ComponentStory<typeof FormatEmail> = args => (
  <FormatEmail {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  email: "myemail@address.me",
};
