import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
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

type Story = StoryObj<typeof SegmentedControl>;
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
export const Basic: Story = {
  render: () => {
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
  },
};
