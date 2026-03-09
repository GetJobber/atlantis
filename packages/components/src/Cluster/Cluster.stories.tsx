import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ContentBlock } from "@jobber/components/ContentBlock";

const meta = {
  title: "Components/Layouts and Structure/Cluster",
  component: Cluster,
} satisfies Meta<typeof Cluster>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => (
  <ContentBlock maxWidth="100%">
    <Cluster {...args} />
  </ContentBlock>
);

export const Basic: Story = {
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

export const WithChips: Story = {
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

export const CustomSpacing: Story = {
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

export const CustomAlignment: Story = {
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
