import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";

export default {
  title: "Components/Layouts and Structure/Cluster/Web",
  component: Cluster,
  parameters: {
    layout: "centered",
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Cluster>;

const BasicTemplate: ComponentStory<typeof Cluster> = args => (
  <Cluster {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  children: (
    <>
      <Button label="Save" />
      <Button label="Cancel" type="secondary" />
      <Button label="Delete" variation="destructive" type="secondary" />
    </>
  ),
};

export const WithChips = BasicTemplate.bind({});
WithChips.args = {
  children: (
    <>
      <Chip label="Active" />
      <Chip label="High Priority" />
      <Chip label="In Progress" />
      <Chip label="Needs Review" />
    </>
  ),
};

export const CustomSpacing = BasicTemplate.bind({});
CustomSpacing.args = {
  space: "large",
  children: (
    <>
      <Chip label="Large" />
      <Chip label="Spacing" />
      <Chip label="Between" />
      <Chip label="Items" />
    </>
  ),
};

export const CustomAlignment = BasicTemplate.bind({});
CustomAlignment.args = {
  justify: "center",
  align: "center",
  children: (
    <>
      <Button label="Centered" />
      <Button label="Items" type="secondary" />
      <Button label="In Cluster" type="secondary" />
    </>
  ),
};
