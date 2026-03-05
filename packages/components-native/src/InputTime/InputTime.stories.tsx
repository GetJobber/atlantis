import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Content, Form, InputTime } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputTime/Mobile",
  component: InputTime,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputTime>;

const BasicTemplate: StoryFn<typeof InputTime> = args => {
  const [time, setTime] = useState(new Date("2023-07-21T16:36:34.873Z"));
  const {
    placeholder,
    emptyValueLabel,
    invalid,
    disabled,
    showMiniLabel,
    clearable,
    type,
    showIcon,
  } = args;

  return (
    <InputTime
      value={time}
      placeholder={placeholder}
      emptyValueLabel={emptyValueLabel}
      invalid={invalid}
      disabled={disabled}
      showMiniLabel={showMiniLabel}
      clearable={clearable}
      type={type}
      showIcon={showIcon}
      onChange={newTime => {
        if (newTime) setTime(newTime);
      }}
    />
  );
};

const EmptyValueTemplate: StoryFn<typeof InputTime> = args => {
  const {
    placeholder,
    emptyValueLabel,
    invalid,
    disabled,
    showMiniLabel,
    clearable,
    type,
    showIcon,
  } = args;

  return (
    <InputTime
      value={undefined}
      onChange={() => undefined}
      placeholder={placeholder}
      emptyValueLabel={emptyValueLabel}
      invalid={invalid}
      disabled={disabled}
      showMiniLabel={showMiniLabel}
      clearable={clearable}
      type={type}
      showIcon={showIcon}
    />
  );
};

const FormControlledTemplate: StoryFn<typeof InputTime> = args => (
  <Form
    initialValues={{ startTime: new Date("2023-07-21T16:36:34.873Z") }}
    onSubmit={() => Promise.resolve()}
    onSubmitError={() => undefined}
    onSubmitSuccess={() => undefined}
  >
    <Content>
      <InputTime
        name={args.name ?? "startTime"}
        validations={args.validations}
        placeholder={args.placeholder}
        emptyValueLabel={args.emptyValueLabel}
        invalid={args.invalid}
        disabled={args.disabled}
        showMiniLabel={args.showMiniLabel}
        clearable={args.clearable}
        type={args.type}
        showIcon={args.showIcon}
      />
    </Content>
  </Form>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    placeholder: "Start time",
  },
};
export const Disabled = {
  render: BasicTemplate,
  args: {
    placeholder: "Start time",
    disabled: true,
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    placeholder: "Start time",
    invalid: "Start time is required",
  },
};
export const FormControlled = {
  render: FormControlledTemplate,
  args: {
    name: "startTime",
    placeholder: "Created time",
  },
};
export const EmptyValue = {
  render: EmptyValueTemplate,
  args: {
    placeholder: "Start time",
    emptyValueLabel: "Unscheduled",
  },
};
