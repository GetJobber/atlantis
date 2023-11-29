import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Chip, ChipDismissible, ChipSelectable } from "@jobber/components/Chip";
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

const DismissibleTemplate: ComponentStory<typeof Chip> = props => {
  return (
    <Content>
      <ChipDismissible
        {...props}
        onClick={() => alert("now you can remove me!")}
      />
    </Content>
  );
};

const SelectableTemplate: ComponentStory<typeof Chip> = props => {
  const [selected, setSelected] = useState(false);

  return (
    <Content>
      <ChipSelectable
        {...props}
        selected={selected}
        onClick={() => setSelected(previousValue => !previousValue)}
      />
    </Content>
  );
};

const TruncatingTemplate: ComponentStory<typeof Chip> = props => {
  return (
    <Content>
      <div
        style={{
          display: "flex",
          maxWidth: "500px",
        }}
      >
        <Chip
          variation="subtle"
          label="Only a label that is quite long"
          onClick={() => alert("you clicked me!")}
        />
        <ChipDismissible
          heading="A very very long heading"
          label="Short label"
          onClick={() => alert("now you can remove me!")}
        />
        <Chip {...props} invalid onClick={() => alert("you clicked me!")}>
          <Chip.Suffix>
            <Icon name="cross" size="small" />
          </Chip.Suffix>
        </Chip>
      </div>
    </Content>
  );
};

export const Base = BasicTemplate.bind({});
const defaultArgs = {
  ariaLabel: "Accessible Label",
  disabled: false,
  heading: "",
  invalid: false,
  label: "Chip Label",
  role: "button",
  tabIndex: 0,
  value: "",
  variation: "base" as const,
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

export const Dismissible = DismissibleTemplate.bind({});
Dismissible.args = {
  ...defaultArgs,
  label: "Dismissible Chip",
};

export const Selectable = SelectableTemplate.bind({});
Selectable.args = {
  ...defaultArgs,
  label: "Selectable Chip",
};

export const Truncating = TruncatingTemplate.bind({});
Truncating.args = {
  ...defaultArgs,
  heading: "Heading",
  label: "Truncating Chip",
};
