import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Checkbox, CheckboxGroup } from "@jobber/components-native";

const meta = {
  title: "Components/Selections/Checkbox",
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
type CheckboxGroupStory = StoryObj<React.ComponentProps<typeof CheckboxGroup>>;

const BasicTemplate = (args: Story["args"]) => <Checkbox {...args} />;

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    label: "Check me out",
    name: "storyCheckbox",
  },
};

const ControlledTemplate = (args: Story["args"]) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Controlled: Story = {
  render: ControlledTemplate,
  args: {
    label: "Check me out",
  },
};

export const Indeterminate: Story = {
  render: BasicTemplate,
  args: {
    label: "Label",
    name: "storyCheckbox",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  render: BasicTemplate,
  args: {
    label: "Label",
    name: "storyCheckbox",
    disabled: true,
  },
};

const CheckboxGroupTemplate = (args: CheckboxGroupStory["args"]) => (
  <CheckboxGroup {...args}>
    <Checkbox name="checkbox1" label="Mustard" />
    <Checkbox name="checkbox2" label="Relish" />
    <Checkbox name="checkbox3" label="Ketchup" />
  </CheckboxGroup>
);

export const CheckboxGroupExample: CheckboxGroupStory = {
  render: CheckboxGroupTemplate,
  args: {
    name: "testgroup",
  },
};

export const LabelledCheckboxGroup: CheckboxGroupStory = {
  render: CheckboxGroupTemplate,
  args: {
    name: "testgroup",
    label: "Select all",
  },
};

const ControlledCheckboxGroupTemplate = (args: CheckboxGroupStory["args"]) => {
  const [checkboxGroupState, setCheckboxGroupState] = useState<
    NonNullable<React.ComponentProps<typeof CheckboxGroup>["state"]>
  >({
    parentChecked: false,
    childrenChecked: {
      relish: true,
      ketchup: true,
      mustard: false,
    },
  });

  return (
    <CheckboxGroup
      {...args}
      state={checkboxGroupState}
      onChange={state => setCheckboxGroupState(state)}
    >
      <Checkbox name="mustard" label="Mustard" />
      <Checkbox name="relish" label="Relish" />
      <Checkbox name="ketchup" label="Ketchup" />
    </CheckboxGroup>
  );
};

export const ControlledCheckboxGroup: CheckboxGroupStory = {
  render: ControlledCheckboxGroupTemplate,
  args: {
    name: "testgroup",
    label: "All",
  },
};

export const DisabledCheckboxGroup: CheckboxGroupStory = {
  render: CheckboxGroupTemplate,
  args: {
    name: "testgroup",
    label: "Label",
    disabled: true,
  },
};
