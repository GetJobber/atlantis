import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Button, InputText } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputText",
  component: InputText,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputText>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputText>>>;

const BasicTemplate = (args: Story["args"]) => {
  return <InputText {...args} />;
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    name: "age",
    placeholder: "Age in words",
  },
};

export const Invalid: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "What is your favorite fruit?",
    defaultValue: "Tomato",
    invalid: "That's not a fruit",
  },
};

export const Toolbar: Story = {
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
