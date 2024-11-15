import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputTime } from "@jobber/components/InputTime";
import { InputText } from "@jobber/components/InputText";

export default {
  title: "Components/Forms and Inputs/InputGroup/Web",
  component: InputGroup,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof InputGroup>;

const BasicTemplate: ComponentStory<typeof InputGroup> = args => {
  const startTime = new Date();
  startTime.setHours(8, 35, 0, 0);

  const endTime = new Date();
  endTime.setHours(22, 55, 0, 0);

  return (
    <InputGroup {...args}>
      <InputTime defaultValue={startTime} />
      <InputTime defaultValue={endTime} />
    </InputGroup>
  );
};

const NestedTemplate: ComponentStory<typeof InputGroup> = args => {
  return (
    <InputGroup {...args}>
      <InputText placeholder="Street 1" />
      <InputText placeholder="Street 2" />
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="City" />
        <InputText placeholder="Province" />
      </InputGroup>
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="Postal Code" />
        <InputText placeholder="Country" />
      </InputGroup>
    </InputGroup>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  flowDirection: "vertical",
};

export const Nested = NestedTemplate.bind({});
Nested.args = {
  flowDirection: "vertical",
};
