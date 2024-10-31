import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  SegmentedControl,
  SegmentedControlContext,
} from "@jobber/components/SegmentedControl";
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
];

export const Controlled: Story = () => {
  const [activeOption, setActiveOption] = useState("");

  return (
    <SegmentedControl
      defaultOption={"pizza"}
      selectedOption={activeOption}
      onSelectOption={setActiveOption}
    >
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};

export const AsUncontrolled: Story = () => {
  const [activeOption, setActiveOption] = useState("calendar");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setActiveOption(e.target.value);
  };

  return (
    <SegmentedControlContext.Provider
      value={{ handleChange, selectedOption: activeOption }}
    >
      <SegmentedControl.Base>
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
      </SegmentedControl.Base>
    </SegmentedControlContext.Provider>
  );
};
