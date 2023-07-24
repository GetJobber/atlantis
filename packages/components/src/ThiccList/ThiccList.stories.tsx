import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThiccList } from "./ThiccList";

export default {
  title: "Components/ThiccList",
  parameters: {
    viewMode: "story",
  },
  component: ThiccList,
} as ComponentMeta<typeof ThiccList>;

export const Primary = {
  render: () => <ThiccList />,
};
