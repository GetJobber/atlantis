import { ComponentMeta } from "@storybook/react";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layout and Structure/Box/Web",
  component: Box,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Box>;
