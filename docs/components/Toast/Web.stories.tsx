import React, { JSXElementConstructor } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { showToast } from "@jobber/components/Toast";
import { Button } from "@jobber/components/Button";

type Toast = JSXElementConstructor<Parameters<typeof showToast>[0]>;

export default {
  title: "Components/Status and Feedback/Toast/Web",
  component: showToast as Toast,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Toast": ["showToast"],
        },
      },
    },
  },
} as ComponentMeta<Toast>;

const Template: ComponentStory<Toast> = args => (
  <Button label="Show toast" onClick={() => showToast(args)} />
);

export const Basic = Template.bind({});
Basic.args = {
  message: "Toast showed",
};
