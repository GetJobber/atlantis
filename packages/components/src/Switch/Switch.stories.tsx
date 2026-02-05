import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "@jobber/components/Switch";
import { Button } from "@jobber/components/Button";
import { Stack } from "@jobber/components/Stack";

const meta = {
  title: "Components/Selections/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => {
  const [value, setValue] = useState(false);

  return (
    <Stack>
      <Button onClick={() => setValue(!value)} label="Controlled Example" />
      <Switch {...args} value={value} onChange={setValue} />
    </Stack>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
};
