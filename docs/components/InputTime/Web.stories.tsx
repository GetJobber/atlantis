import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputTime } from "@jobber/components/InputTime";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Forms and Inputs/InputTime/Web",
  component: InputTime,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        extraImports: {
          "@std-proposal/temporal": ["CivilTime"],
        },
      },
    },
  },
} as ComponentMeta<typeof InputTime>;

const BasicTemplate: ComponentStory<typeof InputTime> = args => (
  <InputTime {...args} />
);

const EventTemplate: ComponentStory<typeof InputTime> = args => {
  const [time, setTime] = useState(new CivilTime(3, 52));
  const resetTime = () => {
    setTime(new CivilTime(3, 52));
  };
  const handleChange = (newTime: CivilTime) => {
    setTime(newTime);
  };
  return (
    <Content>
      <InputTime {...args} value={time} onChange={handleChange} />
      <pre>{time && time.toString()}</pre>
      <Button label="Reset" onClick={resetTime} />
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  defaultValue: new CivilTime(2, 35),
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  defaultValue: new CivilTime(3, 52),
  disabled: true,
};

export const ReadOnly = BasicTemplate.bind({});
ReadOnly.args = {
  defaultValue: new CivilTime(5, 23),
  readonly: true,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  defaultValue: new CivilTime(2, 35),
  invalid: true,
};

export const Event = EventTemplate.bind({});
Event.args = {};
