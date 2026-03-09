import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { InputSearch } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputSearch",
  component: InputSearch,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputSearch>;
export default meta;

type Story = StoryObj<
  Pick<React.ComponentProps<typeof InputSearch>, "placeholder" | "prefix">
>;

const BasicTemplate = (args: Story["args"]) => {
  const [value, setValue] = useState("");

  return (
    <InputSearch
      placeholder={args?.placeholder}
      prefix={args?.prefix}
      value={value}
      onChange={newValue => setValue(newValue)}
      onDebouncedChange={() => alert(value)}
    />
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Search",
    prefix: {
      icon: "search",
    },
  },
};
