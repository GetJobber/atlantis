import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ContentBlock } from "@jobber/components/ContentBlock";

export default {
  title: "Components/Layouts and Structure/Cluster/Web",
  component: Cluster,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Cluster>;

const BasicTemplate: StoryFn<typeof Cluster> = args => (
  <ContentBlock maxWidth="100%">
    <Cluster {...args} />
  </ContentBlock>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    children: (
      <>
        <Button label="Save" />
        <Button label="Cancel" type="secondary" />
        <Button label="Delete" variation="destructive" type="secondary" />
      </>
    ),
  },
};
export const WithChips = {
  render: BasicTemplate,
  args: {
    children: (
      <>
        <Chip label="Active" />
        <Chip label="High Priority" />
        <Chip label="In Progress" />
        <Chip label="Needs Review" />
      </>
    ),
  },
};
export const CustomSpacing = {
  render: BasicTemplate,
  args: {
    gap: "large",
    children: (
      <>
        <Chip label="Large" />
        <Chip label="Spacing" />
        <Chip label="Between" />
        <Chip label="Items" />
      </>
    ),
  },
};
export const CustomAlignment = {
  render: BasicTemplate,
  args: {
    justify: "center",
    align: "center",
    children: (
      <>
        <Button label="Centered" />
        <Button label="Items" type="secondary" />
        <Button label="In Cluster" type="secondary" />
      </>
    ),
  },
};
