// TODO: Move this to docs folder once we write the docs
import React from "react";
// Temporary fix for initial build of DataList
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataList } from "./DataList";

export default {
  title: "Components/Lists and Tables/DataList/Web",
  component: DataList,
  parameters: {
    viewMode: "story",
  },
  // Comment this out to make it show up in storybook
  decorators: [
    // Detach from Storybook's layout
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof DataList>;

const Template: ComponentStory<typeof DataList> = args => (
  <DataList {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  title: "All Clients",
  loading: false,
  showCount: true,
  totalCount: 50,
};
