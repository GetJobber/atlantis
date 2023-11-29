import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { StatusLabel } from "@jobber/components/StatusLabel";

export default {
  title: "Components/Status and Feedback/StatusLabel/Web",
  component: StatusLabel,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof StatusLabel>;

const BasicTemplate: ComponentStory<typeof StatusLabel> = args => {
  return <StatusLabel {...args} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  label: "Success",
  alignment: "start",
  status: "success",
};
