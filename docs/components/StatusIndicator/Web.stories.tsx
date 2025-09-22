import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StatusIndicator } from "@jobber/components/StatusIndicator";

export default {
  title: "Components/Status and Feedback/StatusIndicator/Web",
  component: StatusIndicator,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof StatusIndicator>;

const BasicTemplate: ComponentStory<typeof StatusIndicator> = args => {
  return <StatusIndicator {...args} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  status: "success",
};
