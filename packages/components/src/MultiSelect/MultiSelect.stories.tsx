/* eslint-disable import/no-deprecated */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "@jobber/components/MultiSelect";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";

const meta = {
  title: "Components/Deprecated/MultiSelect",
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: "MultiSelect docs have moved to the new site.",
      },
    },
  },
} satisfies Meta<typeof MultiSelect>;
export default meta;
type Story = StoryObj<
  Pick<
    React.ComponentProps<typeof MultiSelect>,
    "defaultLabel" | "allSelectedLabel"
  >
>;

const BasicTemplate = (args: Story["args"]) => {
  const [options, setOptions] = useState([
    { label: "Synced", checked: true },
    { label: "Errors", checked: false },
    { label: "Warnings", checked: true },
    { label: "Ignored", checked: true },
  ]);

  return (
    <MultiSelect
      defaultLabel={args?.defaultLabel ?? "Status"}
      allSelectedLabel={args?.allSelectedLabel ?? "All statuses"}
      options={options}
      onOptionsChange={setOptions}
    />
  );
};

const SizesTemplate = (args: Story["args"]) => {
  const [options, setOptions] = useState([
    { label: "Small", checked: false },
    { label: "Large", checked: false },
  ]);

  return (
    <Content>
      <MultiSelect
        defaultLabel={args?.defaultLabel ?? "Small"}
        allSelectedLabel={args?.allSelectedLabel ?? "All selected"}
        options={options}
        onOptionsChange={setOptions}
        size="small"
      />
      <Divider size="largest" />
      <MultiSelect
        defaultLabel={args?.defaultLabel ?? "Large"}
        allSelectedLabel={args?.allSelectedLabel ?? "All selected"}
        options={options}
        onOptionsChange={setOptions}
        size="large"
      />
    </Content>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    defaultLabel: "Status",
    allSelectedLabel: "All statuses",
  },
};

export const Sizes: Story = {
  render: SizesTemplate,
  args: {
    allSelectedLabel: "All selected",
  },
};
