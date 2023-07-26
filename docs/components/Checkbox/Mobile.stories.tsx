import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "@jobber/components-native";

export default {
  title: "Components/Selections/Checkbox/Mobile",
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Checkbox>;

const BasicTemplate: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "Check me out",
  name: "storyCheckbox",
};

const ControlledTemplate: ComponentStory<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  label: "Check me out",
};

export const Indeterminate = BasicTemplate.bind({});
Indeterminate.args = {
  label: "Label",
  name: "storyCheckbox",
  indeterminate: true,
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  label: "Label",
  name: "storyCheckbox",
  disabled: true,
};

const CheckboxGroupTemplate: ComponentStory<typeof CheckboxGroup> = args => (
  <CheckboxGroup {...args}>
    <Checkbox name="checkbox1" label="Mustard" />
    <Checkbox name="checkbox2" label="Relish" />
    <Checkbox name="checkbox3" label="Ketchup" />
  </CheckboxGroup>
);

export const CheckboxGroupExample = CheckboxGroupTemplate.bind({});
CheckboxGroupExample.args = {
  name: "testgroup",
};

export const LabelledCheckboxGroup = CheckboxGroupTemplate.bind({});
LabelledCheckboxGroup.args = {
  name: "testgroup",
  label: "Select all",
};

const ControlledCheckboxGroupTemplate: ComponentStory<
  typeof CheckboxGroup
> = args => {
  const [checkboxGroupState, setCheckboxGroupState] = useState({
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
      onChange={(state: any) => setCheckboxGroupState(state)}
    >
      <Checkbox name="mustard" label="Mustard" />
      <Checkbox name="relish" label="Relish" />
      <Checkbox name="ketchup" label="Ketchup" />
    </CheckboxGroup>
  );
};

export const ControlledCheckboxGroup = ControlledCheckboxGroupTemplate.bind({});
ControlledCheckboxGroup.args = {
  name: "testgroup",
  label: "All",
};

export const DisabledCheckboxGroup = CheckboxGroupTemplate.bind({});
DisabledCheckboxGroup.args = {
  name: "testgroup",
  label: "Label",
  disabled: true,
};
