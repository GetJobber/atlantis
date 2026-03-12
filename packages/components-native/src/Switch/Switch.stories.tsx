import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Button, Content, Switch } from "@jobber/components-native";

type SwitchStoryArgs = Pick<React.ComponentProps<typeof Switch>, "label">;

const meta = {
  title: "Components/Selections/Switch",
  component: Switch,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<SwitchStoryArgs>;

export const Basic: Story = {
  render: args => <Switch label={args?.label ?? "Toggle example"} />,
  args: {
    label: "Toggle example",
  },
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState(false);

    return (
      <Content>
        <Button onPress={() => setValue(!value)} label="Toggle Switch" />
        <Switch
          label={args?.label ?? "Controlled Toggle example"}
          value={value}
          onValueChange={setValue}
        />
      </Content>
    );
  },
  args: {
    label: "Controlled Toggle example",
  },
};
