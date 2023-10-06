import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Chip } from "@jobber/components/Chip";
import { Content } from "@jobber/components/Content";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Selections/Chip/Web",
  component: Chip,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Chip": ["Chip"],
        },
      },
    },
  },
} as ComponentMeta<typeof Chip>;

const BasicTemplate: ComponentStory<typeof Chip> = props => {
  return (
    <Content>
      <Chip {...props} onClick={() => alert("you clicked me!")} />
    </Content>
  );
};

const SuffixTemplate: ComponentStory<typeof Chip> = props => {
  return (
    <Content>
      <Chip {...props} onClick={() => alert("you clicked me!")}>
        <Chip.Suffix>
          <Icon name="cross" size="small" />
        </Chip.Suffix>
      </Chip>
    </Content>
  );
};

const PrefixTemplate: ComponentStory<typeof Chip> = props => {
  return (
    <Content>
      <Chip {...props} onClick={() => alert("you clicked me!")}>
        <Chip.Prefix>
          <Icon name="cross" size="small" />
        </Chip.Prefix>
      </Chip>
    </Content>
  );
};

export const Base = BasicTemplate.bind({});
const defaultArgs = {
  heading: "",
  label: "Chip Label",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "base" as const,
  disabled: false,
  invalid: false,
};
Base.args = {
  ...defaultArgs,
  label: "Chip Label",
};

export const BaseDisabled = BasicTemplate.bind({});
BaseDisabled.args = {
  ...defaultArgs,
  label: "Disabled Chip",
  disabled: true,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  ...defaultArgs,
  label: "Invalid Chip",
  invalid: true,
};

export const Subtle = BasicTemplate.bind({});
Subtle.args = {
  ...defaultArgs,
  label: "Subtle Chip",
  variation: "subtle",
};

export const SubtleDisabled = BasicTemplate.bind({});
SubtleDisabled.args = {
  ...defaultArgs,
  label: "Subtle Disabled Chip",
  disabled: true,
};

export const SubtleInvalid = BasicTemplate.bind({});
SubtleInvalid.args = {
  ...defaultArgs,
  label: "Subtle Invalid Chip",
  variation: "subtle",
  invalid: true,
};

export const WithHeading = BasicTemplate.bind({});
WithHeading.args = {
  ...defaultArgs,
  heading: "Heading",
};

export const WithHeadingInvalid = BasicTemplate.bind({});
WithHeadingInvalid.args = {
  ...defaultArgs,
  heading: "Heading",
  invalid: true,
};

export const WithHeadingDisabled = BasicTemplate.bind({});
WithHeadingDisabled.args = {
  ...defaultArgs,
  heading: "Heading",
  disabled: true,
};

export const Suffix = SuffixTemplate.bind({});
Suffix.args = {
  ...defaultArgs,
  label: "Chip With Suffix",
};

export const Prefix = PrefixTemplate.bind({});
Prefix.args = {
  ...defaultArgs,
  label: "Chip With Prefix",
};
