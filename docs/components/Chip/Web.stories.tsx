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
Base.args = {
  label: "Chip Label",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "base",
  disabled: false,
  invalid: false,
};

export const BaseDisabled = BasicTemplate.bind({});
BaseDisabled.args = {
  label: "Disabled Chip",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "base",
  disabled: true,
  invalid: false,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  label: "Invalid Chip",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "base",
  disabled: false,
  invalid: true,
};

export const Subtle = BasicTemplate.bind({});
Subtle.args = {
  label: "Subtle Chip",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: false,
  invalid: false,
};

export const SubtleDisabled = BasicTemplate.bind({});
SubtleDisabled.args = {
  label: "Subtle Chip",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: true,
  invalid: false,
};

export const SubtleInvalid = BasicTemplate.bind({});
SubtleInvalid.args = {
  label: "Subtle Invalid Chip",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: false,
  invalid: true,
};

export const WithHeading = BasicTemplate.bind({});
WithHeading.args = {
  label: "Chip Label",
  heading: "Heading",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: false,
  invalid: false,
};

export const WithHeadingInvalid = BasicTemplate.bind({});
WithHeadingInvalid.args = {
  label: "Chip Label",
  heading: "Heading",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: false,
  invalid: true,
};

export const WithHeadingDisabled = BasicTemplate.bind({});
WithHeadingDisabled.args = {
  label: "Chip Label",
  heading: "Heading",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: true,
  invalid: false,
};

export const Suffix = SuffixTemplate.bind({});
Suffix.args = {
  label: "Chip With Suffix",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: true,
  invalid: false,
};

export const Prefix = PrefixTemplate.bind({});
Prefix.args = {
  label: "Chip With Prefix",
  heading: "",
  ariaLabel: "Accessible Label",
  role: "button",
  tabIndex: 0,
  variation: "subtle",
  disabled: true,
  invalid: false,
};
