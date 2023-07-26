import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from "@storybook/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThiccList as List } from "./ThiccList";
import { Layout } from "./Layout";

export default {
  title: "ListExploration",
  parameters: {
    viewMode: "story",
  },
  component: List,
} as ComponentMeta<typeof List>;

export const ListExploration = {
  render: () => (
    <Layout>
      <List />
    </Layout>
  ),
};
