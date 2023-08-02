import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import { Switch } from "@jobber/components/Switch";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Selections/Switch/Web",
  component: Switch,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof Switch>;

const BasicTemplate: ComponentStory<typeof Switch> = args => {
  return <Switch {...args} />;
};

export const Basic = BasicTemplate.bind({});

const ControlledTemplate: ComponentStory<typeof Switch> = args => {
  const [value, setValue] = useState(false);
  return (
    <>
      <Button onClick={() => setValue(!value)} label="Controlled Example" />
      <br />
      <Switch {...args} value={value} onChange={setValue} />
    </>
  );
};

export const Controlled = ControlledTemplate.bind({});
