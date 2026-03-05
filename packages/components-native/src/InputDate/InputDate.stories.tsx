import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { InputDate } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/InputDate/Mobile",
  component: InputDate,
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
} satisfies Meta<typeof InputDate>;

const BasicTemplate: StoryFn<typeof InputDate> = args => {
  const [date, setDate] = useState(new Date("11/11/2011"));
  const {
    placeholder,
    emptyValueLabel,
    invalid,
    disabled,
    showMiniLabel,
    clearable,
  } = args;

  return (
    <InputDate
      value={date}
      placeholder={placeholder}
      emptyValueLabel={emptyValueLabel}
      invalid={invalid}
      disabled={disabled}
      showMiniLabel={showMiniLabel}
      clearable={clearable}
      onChange={newDate => {
        if (newDate) setDate(newDate);
      }}
    />
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {},
};
export const EmptyValueLabel = {
  render: BasicTemplate,
  args: {
    placeholder: "Start date",
    emptyValueLabel: "Unscheduled",
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    placeholder: "Start date",
    invalid: "Start Date is required",
  },
};
