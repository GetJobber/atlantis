import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip, ChipDismissible, ChipSelectable } from "@jobber/components/Chip";
import { Content } from "@jobber/components/Content";
import { Icon } from "@jobber/components/Icon";

const meta = {
  title: "Components/Selections/Chip",
  component: Chip,
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => {
  return (
    <Content>
      <Chip {...args} onClick={() => alert("you clicked me!")} />
    </Content>
  );
};

const SuffixTemplate = (args: Story["args"]) => {
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

const ClickableSuffixTemplate = (args: Story["args"]) => {
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

const PrefixTemplate = (args: Story["args"]) => {
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

const DismissibleTemplate = (args: Story["args"]) => {
  return (
    <Content>
      <ChipDismissible
        {...args}
        onClick={() => alert("now you can remove me!")}
      />
    </Content>
  );
};

const SelectableTemplate = (args: Story["args"]) => {
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

const TruncatingTemplate = (args: Story["args"]) => {
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

export const Base: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Chip Label",
  },
};

export const BaseDisabled: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Disabled Chip",
    disabled: true,
  },
};

export const Invalid: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Invalid Chip",
    invalid: true,
  },
};

export const Subtle: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Subtle Chip",
    variation: "subtle",
  },
};

export const SubtleDisabled: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Subtle Disabled Chip",
    disabled: true,
  },
};

export const SubtleInvalid: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    label: "Subtle Invalid Chip",
    variation: "subtle",
    invalid: true,
  },
};

export const WithHeading: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
  },
};

export const WithHeadingInvalid: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
    invalid: true,
  },
};

export const WithHeadingDisabled: Story = {
  render: BasicTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
    disabled: true,
  },
};

export const Suffix: Story = {
  render: SuffixTemplate,
  args: {
    ...defaultArgs,
    label: "Chip With Suffix",
  },
};

export const ClickableSuffix: Story = {
  render: ClickableSuffixTemplate,
  args: {
    ...defaultArgs,
    label: "Clickable Chip With Suffix",
  },
};

export const Prefix: Story = {
  render: PrefixTemplate,
  args: {
    ...defaultArgs,
    label: "Chip With Prefix",
  },
};

export const Dismissible: Story = {
  render: DismissibleTemplate,
  args: {
    ...defaultArgs,
    label: "Dismissible Chip",
  },
};

export const Selectable: Story = {
  render: SelectableTemplate,
  args: {
    ...defaultArgs,
    label: "Selectable Chip",
  },
};

export const Truncating: Story = {
  render: TruncatingTemplate,
  args: {
    ...defaultArgs,
    heading: "Heading",
    label: "Truncating Chip",
  },
};
