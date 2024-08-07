import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputTime } from "@jobber/components/InputTime";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Flex } from "@jobber/components/Flex";

export default {
  title: "Components/Forms and Inputs/InputTime/Web",
  component: InputTime,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
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

const ControlledTemplate: ComponentStory<typeof InputTime> = args => {
  const [time, setTime] = useState<CivilTime>();

  const handleChange = (newTime: CivilTime) => {
    setTime(newTime);
  };

  return (
    <Content>
      <Flex template={["grow", "shrink"]}>
        <InputTime {...args} value={time} onChange={handleChange} />
        <Button label="Reset" size="large" onClick={() => setTime(false)} />
      </Flex>
      <pre>{time && time.toString()}</pre>
    </Content>
  );
};

export const Uncontrolled = BasicTemplate.bind({});
Uncontrolled.args = {
  defaultValue: new CivilTime(2, 35),
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: "Start time",
  clearable: "always",
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
