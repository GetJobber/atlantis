import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "@jobber/components/DescriptionList";
import { FormatDate } from "@jobber/components/FormatDate";

const meta = {
  title: "Components/Lists and Tables/DescriptionList",
  component: DescriptionList,
} satisfies Meta<typeof DescriptionList>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof DescriptionList>>>;

const BasicTemplate = (args: Story["args"]) => (
  <DescriptionList
    {...(args as React.ComponentProps<typeof DescriptionList>)}
  />
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    data: [
      ["Issued", "2018-12-08"],
      ["Due", "2019-01-06"],
    ],
  },
};

const CustomLabelTemplate = (args: Story["args"]) => {
  const data: React.ComponentProps<typeof DescriptionList>["data"] = [
    ["Issued", <FormatDate date={new Date("2018-12-08")} key={1} />],
    ["Due", <FormatDate date={new Date("2019-01-06")} key={2} />],
  ];

  return <DescriptionList {...args} data={data} />;
};

export const CustomLabel: Story = {
  render: CustomLabelTemplate,
};
