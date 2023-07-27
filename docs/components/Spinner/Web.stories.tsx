import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Spinner } from "@jobber/components/Spinner";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Status and Feedback/Spinner/Web",
  component: Spinner,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Spinner>;

const BasicTemplate: ComponentStory<typeof Spinner> = args => (
  <Spinner {...args} />
);

const InlineTemplate: ComponentStory<typeof Spinner> = args => (
  <Text>
    Uploading... <Spinner {...args} />
  </Text>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  size: "base",
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  size: "small",
  inline: true,
};
