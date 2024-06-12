import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Option, Select } from "@jobber/components/Select";
import { Divider } from "@jobber/components/Divider";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";

export default {
  title: "Components/Selections/Select/Web",
  component: Select,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Select": ["Select", "Option"],
        },
      },
    },
  },
} as ComponentMeta<typeof Select>;

const BasicTemplate: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Option value="tony">Tony</Option>
    <Option value="quincy">Quincy</Option>
    <Option value="peppa">Peppa Pig</Option>
  </Select>
);

const InlineTemplate: ComponentStory<typeof Select> = args => (
  <Flex template={["shrink", "shrink"]}>
    <p>My best Friend: </p>
    <Select {...args}>
      <Option value="tony">Tony</Option>
      <Option value="quincy">Quincy</Option>
      <Option value="peppa">Peppa Pig</Option>
    </Select>
  </Flex>
);

const SizesTemplate: ComponentStory<typeof Select> = args => {
  return (
    <Content>
      <Select size="small">
        <Option value="">Small</Option>
        <Option value="tony" disabled>
          Tony
        </Option>
        <Option value="steve">Steve</Option>
        <Option value="natasha">Natasha</Option>
      </Select>
      <Divider size="largest" />
      <Select {...args}>
        <Option value="">Default</Option>
        <Option value="tony" disabled>
          Tony
        </Option>
        <Option value="steve">Steve</Option>
        <Option value="natasha">Natasha</Option>
      </Select>
      <Divider size="largest" />
      <Select {...args} size="large">
        <Option value="">Large</Option>
        <Option value="tony" disabled>
          Tony
        </Option>
        <Option value="steve">Steve</Option>
        <Option value="natasha">Natasha</Option>
      </Select>
    </Content>
  );
};

const InitialValueTemplate: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Option value="tony">Tony</Option>
    <Option value="steve">Steve</Option>
    <Option value="natasha">Natasha</Option>
    <Option value="bob">Bob</Option>
  </Select>
);

const OnFocusAndBlurTemplate: ComponentStory<typeof Select> = args => (
  <Select
    {...args}
    onFocus={() => {
      console.log("I have been focused!");
    }}
    onBlur={() => console.log("I have been blurred!")}
  >
    <Option value="tony">Tony</Option>
    <Option value="steve">Steve</Option>
    <Option value="natasha">Natasha</Option>
    <Option value="bob">Bob</Option>
  </Select>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "My best friend",
};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  placeholder: "Pick a friend",
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  inline: true,
  size: "small",
};

export const InitialValue = InitialValueTemplate.bind({});
InitialValue.args = {
  placeholder: "Pick a friend",
  defaultValue: "bob",
};

export const Events = InitialValueTemplate.bind({});
Events.args = {
  onChange: (newValue: string) => {
    alert("You picked: " + newValue);
  },
};

export const OnFocusAndBlur = OnFocusAndBlurTemplate.bind({});
OnFocusAndBlur.args = {
  placeholder: "Pick a friend",
  defaultValue: "bob",
};
