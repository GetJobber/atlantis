import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
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
          "@jobber/components/Chip": [
            "Chip",
            "ChipDismissible",
            "ChipSelectable",
          ],
        },
      },
    },
  },
} as Meta<typeof Chip>;

const BasicTemplate: StoryFn<typeof Chip> = args => {
  return (
    <Content>
      <Chip {...args} onClick={() => alert("you clicked me!")} />
    </Content>
  );
};

const SuffixTemplate: StoryFn<typeof Chip> = args => {
  return (
    <Content>
      <Chip {...args} onClick={() => alert("you clicked the Chip!")}>
        <Chip.Suffix>
          <Icon name="add" size="small" />
        </Chip.Suffix>
      </Chip>
    </Content>
  );
};

const ClickableSuffixTemplate: StoryFn<typeof Chip> = args => {
  return (
    <Content>
      <Chip {...args} onClick={() => alert("you clicked the Chip!")}>
        <Chip.Suffix
          onClick={() => alert("you clicked the suffix!")}
          ariaLabel="dismiss"
        >
          <Icon name="cross" size="small" />
        </Chip.Suffix>
      </Chip>
    </Content>
  );
};

const PrefixTemplate: StoryFn<typeof Chip> = args => {
  return (
    <Content>
      <Chip {...args} onClick={() => alert("you clicked me!")}>
        <Chip.Prefix>
          <Icon name="home" size="small" />
        </Chip.Prefix>
      </Chip>
    </Content>
  );
};

const DismissibleTemplate: StoryFn<typeof Chip> = args => {
  return (
    <Content>
      <ChipDismissible
        {...args}
        onClick={() => alert("now you can remove me!")}
      />
    </Content>
  );
};

const SelectableTemplate: StoryFn<typeof Chip> = args => {
  const [selected, setSelected] = useState(false);

  return (
    <Content>
      <ChipSelectable
        {...args}
        selected={selected}
        onClick={() => setSelected(previousValue => !previousValue)}
      />
    </Content>
  );
};

const TruncatingTemplate: StoryFn<typeof Chip> = args => {
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
        <Chip {...args} invalid onClick={() => alert("you clicked me!")}>
          <Chip.Suffix>
            <Icon name="cross" size="small" />
          </Chip.Suffix>
        </Chip>
      </div>
    </Content>
  );
};

export const Base = {
  render: BasicTemplate,

  args: {
    ...defaultArgs,
    label: "Chip Label",
  },
};
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

export const BaseDisabled = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Disabled Chip",
    disabled: true,
  },
};
export const Invalid = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Invalid Chip",
    invalid: true,
  },
};
export const Subtle = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Subtle Chip",
    variation: "subtle",
  },
};
export const SubtleDisabled = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Subtle Disabled Chip",
    disabled: true,
  },
};
export const SubtleInvalid = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Subtle Invalid Chip",
    variation: "subtle",
    invalid: true,
  },
};
export const WithHeading = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
  },
};
export const WithHeadingInvalid = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
    invalid: true,
  },
};
export const WithHeadingDisabled = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
    disabled: true,
  },
};
export const Suffix = {
  render: SuffixTemplate,
  args: {
    ...defaultArgs,
    label: "Chip With Suffix",
  },
};
export const ClickableSuffix = {
  render: ClickableSuffixTemplate,
  args: {
    ...defaultArgs,
    label: "Clickable Chip With Suffix",
  },
};
export const Prefix = {
  render: PrefixTemplate,
  args: {
    ...defaultArgs,
    label: "Chip With Prefix",
  },
};
export const Dismissible = {
  render: DismissibleTemplate,
  args: {
    ...defaultArgs,
    label: "Dismissible Chip",
  },
};
export const Selectable = {
  render: SelectableTemplate,
  args: {
    ...defaultArgs,
    label: "Selectable Chip",
  },
};
export const Truncating = {
  render: TruncatingTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
    label: "Truncating Chip",
  },
};
