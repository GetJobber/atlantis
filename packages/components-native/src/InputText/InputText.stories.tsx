import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { Button } from "@jobber/components-native";
import { InputText } from "./InputText";

const meta: Meta = {
  title: "Components/Forms and Inputs/InputText/Mobile",
  component: InputText,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
};

export default meta;

interface InputTextStoryArgs {
  readonly name?: string;
  readonly placeholder?: string;
  readonly defaultValue?: string;
  readonly invalid?: string | boolean;
  readonly toolbar?: React.ReactNode;
}

const BasicTemplate = (args: InputTextStoryArgs) => {
  return <InputText {...args} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    name: "age",
    placeholder: "Age in words",
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    placeholder: "What is your favorite fruit?",
    defaultValue: "Tomato",
    invalid: "That's not a fruit",
  },
};
export const Toolbar = {
  render: BasicTemplate,
  args: {
    placeholder: "Write your message",
    toolbar: (
      <>
        <Button
          label="Rewrite"
          size="small"
          icon="sparkles"
          variation="cancel"
          fullWidth={false}
        />
        <Button
          accessibilityLabel="Undo"
          size="small"
          icon="redo"
          type="tertiary"
          variation="cancel"
          fullWidth={false}
        />
      </>
    ),
  },
};
