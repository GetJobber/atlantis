import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataDump } from "@jobber/components/DataDump";

export default {
  title: "Components/Utilities/DataDump/Web",
  component: DataDump,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof DataDump>;

const BasicTemplate: ComponentStory<typeof DataDump> = args => (
  <DataDump {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  data: {
    name: "Bob",
  },
};
