import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { StatusLabel } from "./StatusLabel";

export default {
  title: "Components/Status and Feedback/StatusLabel/Mobile",
  component: StatusLabel,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof StatusLabel>;

const BasicTemplate = (args: unknown) => {
  const statusLabelArgs = (
    typeof args === "object" && args ? args : {}
  ) as Parameters<typeof StatusLabel>[0];

  return <StatusLabel {...statusLabelArgs} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    text: "Success",
    alignment: "start",
  },
};
