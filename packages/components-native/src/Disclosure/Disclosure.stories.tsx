import React, { useState } from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import type { DisclosureProps } from "./Disclosure";
import { Disclosure } from "./Disclosure";

const meta = {
  title: "Components/Layouts and Structure/Disclosure/Mobile",
  component: Disclosure,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Disclosure>;

export default meta;

export const Basic = {
  render: (args: DisclosureProps) => {
    const [open, setOpen] = useState(false);

    return <Disclosure {...args} open={open} onToggle={() => setOpen(!open)} />;
  },
  args: {
    header: "Advanced Instructions",
    content: "For every 2 team members you add, your profits will triple.",
    isEmpty: false,
  },
};
