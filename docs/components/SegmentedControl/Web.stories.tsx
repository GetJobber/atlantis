import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";
import { Icon } from "@jobber/components/Icon";

const meta: Meta = {
  title: "Components/Selections/SegmentedControl/Web",
  component: SegmentedControl,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
};
export default meta;

type Story = StoryFn<typeof SegmentedControl>;
const options = [
  { value: "pizza", label: "Pizza" },
  { value: "tacos", label: "Tacos" },
  { value: "sushi", label: "Sushi" },
  { value: "burgers", label: "Burgers" },
] as const;

type BasicSegment = (typeof options)[number]["value"];

export const Basic: Story = () => {
  return (
    <SegmentedControl<BasicSegment> defaultValue="tacos">
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};

type WithIconsType =
  | "calendar"
  | "phone"
  | "presentation"
  | "availability"
  | "chat";

export const WithIcons: Story = () => {
  return (
    <SegmentedControl<WithIconsType> defaultValue="phone">
      <SegmentedControl.Option<WithIconsType>
        value="calendar"
        ariaLabel="Calendar"
      >
        <Icon name="calendar" />
      </SegmentedControl.Option>
      <SegmentedControl.Option<WithIconsType> value="phone" ariaLabel="Phone">
        <Icon name="phone" />
      </SegmentedControl.Option>
      <SegmentedControl.Option<WithIconsType>
        value="presentation"
        ariaLabel="Presentation"
      >
        <Icon name="presentation" />
      </SegmentedControl.Option>
      <SegmentedControl.Option<WithIconsType>
        value="availability"
        ariaLabel="Availability"
      >
        <Icon name="availability" />
      </SegmentedControl.Option>
      <SegmentedControl.Option<WithIconsType> value="chat" ariaLabel="Chat">
        <Icon name="chat" />
      </SegmentedControl.Option>
    </SegmentedControl>
  );
};

type UncontrolledOptions = "pizza" | "pizza2" | "pizza3" | "pizza4";

export const AsUncontrolled: Story = () => {
  const [activeOption, setActiveOption] =
    useState<UncontrolledOptions>("pizza");

  return (
    <SegmentedControl<UncontrolledOptions>
      value={activeOption}
      onValueChange={setActiveOption}
    >
      <SegmentedControl.Option<UncontrolledOptions> value="pizza">
        Pizza
      </SegmentedControl.Option>
      <SegmentedControl.Option<UncontrolledOptions> value="pizza2">
        Ultra Pizza
      </SegmentedControl.Option>
      <SegmentedControl.Option<UncontrolledOptions> value="pizza3">
        Mega Pizza
      </SegmentedControl.Option>
      <SegmentedControl.Option<UncontrolledOptions> value="pizza4">
        Everything Pizza
      </SegmentedControl.Option>
    </SegmentedControl>
  );
};
