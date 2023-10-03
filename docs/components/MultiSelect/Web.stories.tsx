import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MultiSelect } from "@jobber/components/MultiSelect";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";

export default {
  title: "Components/Selections/MultiSelect/Web",
  component: MultiSelect,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof MultiSelect>;

const BasicTemplate: ComponentStory<typeof MultiSelect> = args => {
  const [options, setOptions] = useState([
    { label: "Synced", checked: true },
    { label: "Errors", checked: false },
    { label: "Warnings", checked: true },
    { label: "Ignored", checked: true },
  ]);
  return (
    <MultiSelect {...args} options={options} onOptionsChange={setOptions} />
  );
};

const SizesTemplate: ComponentStory<typeof MultiSelect> = args => {
  const [options, setOptions] = useState([
    { label: "Small", checked: false },
    { label: "Large", checked: false },
  ]);
  return (
    <Content>
      <MultiSelect
        {...args}
        defaultLabel="Small"
        options={options}
        onOptionsChange={setOptions}
        size="small"
      />
      <Divider size="largest" />
      <MultiSelect
        {...args}
        defaultLabel="Large"
        options={options}
        onOptionsChange={setOptions}
        size="large"
      />
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  defaultLabel: "Status",
  allSelectedLabel: "All statuses",
};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  allSelectedLabel: "All selected",
};
