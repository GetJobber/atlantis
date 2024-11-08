import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";

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
];

export const Controlled: Story = () => {
  const [activeOption, setActiveOption] = useState("tacos");

  return (
    <SegmentedControl
      selectedValue={activeOption}
      onSelectValue={setActiveOption}
    >
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};

export const Uncontrolled: Story = () => {
  return (
    <SegmentedControl defaultValue="pizza">
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};
