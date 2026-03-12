import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import type { IconNames } from "@jobber/design";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Host } from "react-native-portalize";
import { Menu } from "@jobber/components-native";

const meta = {
  title: "Components/Navigation/Menu",
  component: Menu,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Menu>>>;

const BasicTemplate = (args: Story["args"]) => {
  const [selected, setSelected] = useState(0);

  const menuOptions = [
    {
      label: "Option one",
      icon: selected === 1 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(1),
    },
    {
      label: "Option two",
      icon: selected === 2 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(2),
    },
    {
      label: "Option three",
      icon: selected === 3 ? ("checkmark" as IconNames) : undefined,
      onPress: () => setSelected(3),
    },
  ];

  return (
    <SafeAreaProvider>
      <Host>
        <Menu {...args} menuOptions={menuOptions} />
      </Host>
    </SafeAreaProvider>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {},
};
