import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CivilTime } from "@std-proposal/temporal";
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
        extraImports: {
          "@std-proposal/temporal": ["CivilTime"],
        },
      },
    },
  },
} as ComponentMeta<typeof InputGroup>;

const BasicTemplate: ComponentStory<typeof InputGroup> = args => {
  return (
    <InputGroup {...args}>
      <InputTime defaultValue={new CivilTime(8, 0)} />
      <InputTime defaultValue={new CivilTime(17, 0)} />
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
