import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { StatusLabel } from "@jobber/components-native";

export default {
  title: "Components/Status and Feedback/StatusLabel/Mobile",
  component: StatusLabel,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof StatusLabel>;

const BasicTemplate: ComponentStory<typeof StatusLabel> = args => {
  return <StatusLabel {...args} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  text: "Success",
  alignment: "start",
};
