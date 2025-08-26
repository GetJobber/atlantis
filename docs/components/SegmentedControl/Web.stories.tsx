import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SegmentedControl } from "@jobber/components/SegmentedControl";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Typography } from "@jobber/components/Typography";
import { Heading } from "@jobber/components/Heading";
import { Content } from "@jobber/components/Content";

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
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

export const Controlled: Story = () => {
  const [activeOption, setActiveOption] = useState("week");

  return (
    <Content>
      <Text>
        Control the state without interacting with the SegmentedControl
        directly. Navigate through the options and reset state via the button.
      </Text>
      <Typography>Current activeOption: {activeOption}</Typography>
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
      <Button label="Reset to Week" onClick={() => setActiveOption("week")} />
    </Content>
  );
};

export const Uncontrolled: Story = () => {
  return (
    <SegmentedControl defaultValue="day">
      {options.map(option => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
  );
};

export const Sizes: Story = () => {
  return (
    <Content>
      <Heading level={4}>Small</Heading>
      <SegmentedControl defaultValue="day" size="small">
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
      <Heading level={4}>Base</Heading>
      <SegmentedControl defaultValue="day">
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
      <Heading level={4}>Large</Heading>
      <SegmentedControl defaultValue="day" size="large">
        {options.map(option => (
          <SegmentedControl.Option key={option.value} value={option.value}>
            {option.label}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
    </Content>
  );
};
