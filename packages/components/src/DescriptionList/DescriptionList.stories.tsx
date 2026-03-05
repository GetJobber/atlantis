import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { DescriptionList } from "@jobber/components/DescriptionList";
import { FormatDate } from "@jobber/components/FormatDate";

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
} as Meta<typeof DescriptionList>;

const BasicTemplate: StoryFn<typeof DescriptionList> = args => (
  <DescriptionList {...args} />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    data: [
      ["Issued", "2018-12-08"],
      ["Due", "2019-01-06"],
    ],
  },
};
const CustomLabelTemplate: StoryFn<typeof DescriptionList> = args => (
  <DescriptionList
    {...args}
    data={[
      ["Issued", <FormatDate date={new Date("2018-12-08")} key={1} />],
      ["Due", <FormatDate date={new Date("2019-01-06")} key={2} />],
    ]}
  />
);

export const CustomLabel = {
  render: CustomLabelTemplate,
  args: {},
};
