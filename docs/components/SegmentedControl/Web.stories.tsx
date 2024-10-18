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
export const Basic: Story = {
  render: () => {
    const [activeOption, setActiveOption] = useState<BasicSegment>("pizza");

    return (
      <SegmentedControl
        defaultOption={"developer"}
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
    );
  },
};
