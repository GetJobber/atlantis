import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputEmail } from "@jobber/components/InputEmail";

export default {
  title: "Components/Forms and Inputs/InputEmail/Web",
  component: InputEmail,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputEmail>;

const BasicTemplate: ComponentStory<typeof InputEmail> = args => (
  <InputEmail {...args} />
);

const PureTemplate: ComponentStory<typeof InputEmail> = args => {
  const [value, setValue] = React.useState(args.defaultValue || "");

  return (
    <InputEmail
      {...args}
      value={value}
      onChange={(e: string) => setValue(e as string)}
    />
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Enter your email",
};

export const Pure = PureTemplate.bind({});
Pure.args = {
  placeholder: "Enter your email",
  pure: true,
};
