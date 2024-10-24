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
type BasicSegment = "pizza" | "tacos" | "sushi" | "burgers";
const options = [
  { value: "pizza", label: "Pizza" },
  { value: "tacos", label: "Tacos" },
  { value: "sushi", label: "Sushi" },
  { value: "burgers", label: "Burgers" },
];

const emojiMap: Record<BasicSegment, string> = {
  pizza: "🍕",
  tacos: "🌮",
  sushi: "🍣",
  burgers: "🍔",
};

export const Basic: Story = () => {
  const [activeOption, setActiveOption] = useState<BasicSegment>("pizza");

  return (
    <div style={{ textAlign: "center" }}>
      <SegmentedControl
        defaultOption={"pizza"}
        selectedOption={activeOption}
        onSelectOption={d => {
          setActiveOption(d as BasicSegment);
        }}
      >
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
      <div
        style={{
          marginTop: "var(--space-base)",
          fontSize: "var(--typography--fontSize-jumbo)",
        }}
      >
        {emojiMap[activeOption]}
      </div>
    </div>
  );
};

export const WithIcons: Story = () => {
  const [activeOption, setActiveOption] = useState<BasicSegment>("pizza");

  return (
    <SegmentedControl
      defaultOption={"phone"}
      selectedOption={activeOption}
      onSelectOption={d => {
        setActiveOption(d as BasicSegment);
      }}
    >
      <SegmentedControl.Option value="calendar" ariaLabel="Calendar">
        <Icon name="calendar" />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="phone" ariaLabel="Phone">
        <Icon name="phone" />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="presentation" ariaLabel="Presentation">
        <Icon name="presentation" />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="availability" ariaLabel="Availability">
        <Icon name="availability" />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="chat" ariaLabel="Chat">
        <Icon name="chat" />
      </SegmentedControl.Option>
    </SegmentedControl>
  );
};
