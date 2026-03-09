import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Disclosure } from "@jobber/components-native";

const meta = {
  title: "Components/Layouts and Structure/Disclosure",
  component: Disclosure,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Disclosure>;
export default meta;
type DisclosureStoryArgs = Pick<
  React.ComponentProps<typeof Disclosure>,
  "header" | "content" | "isEmpty"
>;
type Story = StoryObj<DisclosureStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure
      header={args?.header ?? "Advanced Instructions"}
      content={
        args?.content ??
        "For every 2 team members you add, your profits will triple."
      }
      isEmpty={args?.isEmpty ?? false}
      open={open}
      onToggle={() => setOpen(!open)}
    />
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    header: "Advanced Instructions",
    content: "For every 2 team members you add, your profits will triple.",
    isEmpty: false,
  },
};
