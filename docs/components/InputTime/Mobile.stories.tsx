import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputTime } from "@jobber/components-native";

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
  },
} as ComponentMeta<typeof InputTime>;
