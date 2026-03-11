import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioOption } from "@jobber/components/RadioGroup";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";
import { Checkbox } from "@jobber/components/Checkbox";
import { Chip, Chips } from "@jobber/components/Chips";
import { InputNumber } from "@jobber/components/InputNumber";

type RadioGroupStoryArgs = Pick<
  React.ComponentProps<typeof RadioGroup>,
  "ariaLabel"
>;

const meta = {
  title: "Components/Forms and Inputs/RadioGroup",
  component: RadioGroup,
  subcomponents: { RadioOption },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<RadioGroupStoryArgs>;

export const Basic: Story = {
  render: args => {
    const [company, setCompany] = useState("apple");

    return (
      <RadioGroup
        ariaLabel={args?.ariaLabel ?? "Companies"}
        onChange={(value: string) => setCompany(value)}
        value={company}
      >
        <RadioOption value="apple" label="Apple" />
        <RadioOption value="google" label="Google" />
        <RadioOption value="microsoft" label="Microsoft" />
      </RadioGroup>
    );
  },
  args: {
    ariaLabel: "Companies",
  },
};

export const Horizontal: Story = {
  render: args => {
    const [company, setCompany] = useState("apple");

    return (
      <Content spacing="large">
        <div>
          <RadioGroup
            ariaLabel={args?.ariaLabel ?? "Companies"}
            direction="horizontal"
            onChange={(value: string) => setCompany(value)}
            value={company}
          >
            <RadioOption value="apple" label="Apple" />
            <RadioOption value="amazon" label="Amazon" />
            <RadioOption value="google" label="Google" />
          </RadioGroup>
        </div>

        <div>
          <RadioGroup
            ariaLabel={args?.ariaLabel ?? "Companies"}
            direction="horizontal"
            onChange={(value: string) => setCompany(value)}
            value={company}
          >
            <RadioOption
              value="apple"
              label="Apple"
              description="A delicious fruit that fends off doctors"
            />
            <RadioOption
              value="amazon"
              label="Amazon"
              description="The worlds largest rainforest"
            />
            <RadioOption
              value="google"
              label="Google"
              description="A search engine"
            />
          </RadioGroup>
        </div>
      </Content>
    );
  },
  args: {
    ariaLabel: "Companies",
  },
};

export const Description: Story = {
  render: args => {
    const [company, setCompany] = useState("apple");

    return (
      <RadioGroup
        ariaLabel={args?.ariaLabel ?? "Companies"}
        onChange={(value: string) => setCompany(value)}
        value={company}
      >
        <RadioOption
          value="apple"
          label="Apple"
          description="A delicious fruit that fends off doctors"
        />
        <RadioOption
          value="amazon"
          label="Amazon"
          description="The worlds largest rainforest"
        />
        <RadioOption
          value="google"
          label="Google"
          description="A search engine"
        />
      </RadioGroup>
    );
  },
  args: {
    ariaLabel: "Companies",
  },
};

export const Disabled: Story = {
  render: args => {
    const [company, setCompany] = useState("apple");
    const [checked, setChecked] = useState(true);

    return (
      <Content spacing="large">
        <RadioGroup
          ariaLabel={args?.ariaLabel ?? "Companies"}
          onChange={(value: string) => setCompany(value)}
          value={company}
        >
          <RadioOption value="apple" label="Apple" />
          <RadioOption value="google" label="Google" />
          <RadioOption value="amazon" label="Amazon" disabled={true} />
          <RadioOption
            value="microsoft"
            label="Microsoft"
            disabled={!checked}
          />
        </RadioGroup>
        <Divider />
        <Checkbox
          checked={checked}
          label="Allow Microsoft"
          onChange={setChecked}
        />
      </Content>
    );
  },
  args: {
    ariaLabel: "Companies",
  },
};

export const CustomRadioOptionContent: Story = {
  render: args => {
    const [reminderSetting, setReminderSetting] = useState("fixed");
    const [fixedTimeSetting, setFixedTimeSetting] = useState("MINUTES_30");

    return (
      <RadioGroup
        ariaLabel={args?.ariaLabel ?? "Reminder Settings"}
        onChange={(value: string) => setReminderSetting(value)}
        value={reminderSetting}
      >
        <RadioOption
          value="fixed"
          label="Fixed Time"
          description="Select from the 15 mins interval"
        >
          <Chips
            onChange={setting => setFixedTimeSetting(setting ?? "MINUTES_30")}
            selected={fixedTimeSetting}
          >
            <Chip label="15 min" value="MINUTES_15" />
            <Chip label="30 min" value="MINUTES_30" />
            <Chip label="45 min" value="MINUTES_45" />
            <Chip label="60 min" value="MINUTES_60" />
          </Chips>
        </RadioOption>
        <RadioOption
          value="specific"
          label="Specific Time"
          description="Set your reminder down to the seconds"
        >
          Remind me at{" "}
          <InputNumber
            size="small"
            suffix={{ label: "mins" }}
            defaultValue="42"
            maxLength={5}
            inline
          />{" "}
          and{" "}
          <InputNumber
            size="small"
            suffix={{ label: "sec" }}
            defaultValue="3"
            maxLength={5}
            inline
          />{" "}
          interval
        </RadioOption>
      </RadioGroup>
    );
  },
  args: {
    ariaLabel: "Reminder Settings",
  },
};
