import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Checkbox, CheckboxGroup } from "@jobber/components-native";
import type { CheckboxGroupState } from "./types";

export default {
  title: "Components/Selections/Checkbox/Mobile",
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Checkbox>;

const BasicTemplate: StoryFn<typeof Checkbox> = args => <Checkbox {...args} />;

export const Basic = {
  render: BasicTemplate,
  args: {
    label: "Check me out",
    name: "storyCheckbox",
  },
};

const ControlledTemplate: StoryFn<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    label: "Check me out",
  },
};
export const Indeterminate = {
  render: BasicTemplate,
  args: {
    label: "Label",
    name: "storyCheckbox",
    indeterminate: true,
  },
};
export const Disabled = {
  render: BasicTemplate,
  args: {
    label: "Label",
    name: "storyCheckbox",
    disabled: true,
  },
};
const CheckboxGroupTemplate: StoryFn<typeof CheckboxGroup> = args => (
  <CheckboxGroup {...args}>
    <Checkbox name="checkbox1" label="Mustard" />
    <Checkbox name="checkbox2" label="Relish" />
    <Checkbox name="checkbox3" label="Ketchup" />
  </CheckboxGroup>
);

export const CheckboxGroupExample = {
  render: CheckboxGroupTemplate,
  args: {
    name: "testgroup",
  },
};
export const LabelledCheckboxGroup = {
  render: CheckboxGroupTemplate,
  args: {
    name: "testgroup",
    label: "Select all",
  },
};

const ControlledCheckboxGroupTemplate: StoryFn<typeof CheckboxGroup> = args => {
  const [checkboxGroupState, setCheckboxGroupState] =
    useState<CheckboxGroupState>({
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
      onChange={(state: unknown) =>
        setCheckboxGroupState(state as CheckboxGroupState)
      }
    >
      <Checkbox name="mustard" label="Mustard" />
      <Checkbox name="relish" label="Relish" />
      <Checkbox name="ketchup" label="Ketchup" />
    </CheckboxGroup>
  );
};

export const ControlledCheckboxGroup = {
  render: ControlledCheckboxGroupTemplate,
  args: {
    name: "testgroup",
    label: "All",
  },
};
export const DisabledCheckboxGroup = {
  render: CheckboxGroupTemplate,
  args: {
    name: "testgroup",
    label: "Label",
    disabled: true,
  },
};
