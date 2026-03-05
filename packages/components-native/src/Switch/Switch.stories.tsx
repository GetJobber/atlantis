import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Button, Content, Switch } from "@jobber/components-native";

export default {
  title: "Components/Selections/Switch/Mobile",
  component: Switch,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Switch>;

const BasicTemplate: StoryFn<typeof Switch> = args => {
  return <Switch {...args} />;
};

export const Basic = {
  render: BasicTemplate,
  args: {
    label: "Toggle example",
  },
};

const ControlledTemplate: StoryFn<typeof Switch> = args => {
  const [value, setValue] = useState(false);

  return (
    <Content>
      <Button onPress={() => setValue(!value)} label="Toggle Switch" />
      <Switch {...args} value={value} onValueChange={setValue} />
    </Content>
  );
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    label: "Controlled Toggle example",
  },
};
