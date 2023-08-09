import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
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
} as ComponentMeta<typeof Switch>;

const BasicTemplate: ComponentStory<typeof Switch> = args => {
  return <Switch {...args} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  label: "Toggle example",
};

const ControlledTemplate: ComponentStory<typeof Switch> = args => {
  const [value, setValue] = useState(false);
  return (
    <Content>
      <Button onPress={() => setValue(!value)} label="Toggle Switch" />
      <Switch {...args} value={value} onValueChange={setValue} />
    </Content>
  );
};

export const Controlled = ControlledTemplate.bind({});

Controlled.args = {
  label: "Controlled Toggle example",
};
