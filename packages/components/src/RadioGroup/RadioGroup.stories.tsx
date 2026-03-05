import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { RadioGroup, RadioOption } from "@jobber/components/RadioGroup";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";
import { Checkbox } from "@jobber/components/Checkbox";
import { Chip, Chips } from "@jobber/components/Chips";
import { InputNumber } from "@jobber/components/InputNumber";

export default {
  title: "Components/Forms and Inputs/RadioGroup/Web",
  component: RadioGroup,
  subcomponents: { RadioOption },
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/RadioGroup": ["RadioGroup", "RadioOption"],
          "@jobber/components/Chips": ["Chips", "Chip"],
        },
      },
    },
  },
} as Meta<typeof RadioGroup>;

const BasicTemplate: StoryFn<typeof RadioGroup> = args => {
  const [company, setCompany] = useState("apple");

  return (
    <RadioGroup
      {...args}
      onChange={(value: string) => setCompany(value)}
      value={company}
      ariaLabel="Companies"
    >
      <RadioOption value="apple" label="Apple" />
      <RadioOption value="google" label="Google" />
      <RadioOption value="microsoft" label="Microsoft" />
    </RadioGroup>
  );
};

const HorizontalTemplate: StoryFn<typeof RadioGroup> = args => {
  const [company, setCompany] = useState("apple");

  return (
    <Content spacing="large">
      <div>
        <RadioGroup
          {...args}
          onChange={(value: string) => setCompany(value)}
          value={company}
          ariaLabel="Companies"
          direction="horizontal"
        >
          <RadioOption value="apple" label="Apple" />
          <RadioOption value="amazon" label="Amazon" />
          <RadioOption value="google" label="Google" />
        </RadioGroup>
      </div>

      <div>
        <RadioGroup
          {...args}
          onChange={(value: string) => setCompany(value)}
          value={company}
          ariaLabel="Companies"
          direction="horizontal"
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
};

const DisabledTemplate: StoryFn<typeof RadioGroup> = args => {
  const [company, setCompany] = useState("apple");
  const [checked, setChecked] = useState(true);

  return (
    <Content spacing="large">
      <RadioGroup
        {...args}
        onChange={(value: string) => setCompany(value)}
        value={company}
        ariaLabel="Companies"
      >
        <RadioOption value="apple" label="Apple" />
        <RadioOption value="google" label="Google" />
        <RadioOption value="amazon" label="Amazon" disabled={true} />
        <RadioOption value="microsoft" label="Microsoft" disabled={!checked} />
      </RadioGroup>
      <Divider />
      <Checkbox
        checked={checked}
        label="Allow Microsoft"
        onChange={setChecked}
      />
    </Content>
  );
};

const DescriptionTemplate: StoryFn<typeof RadioGroup> = args => {
  const [company, setCompany] = useState("apple");

  return (
    <RadioGroup
      {...args}
      onChange={(value: string) => setCompany(value)}
      value={company}
      ariaLabel="Companies"
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
};

const CustomRadioOptionContentTemplate: StoryFn<typeof RadioGroup> = args => {
  const [reminderSetting, setReminderSetting] = useState("fixed");
  const [fixedTimeSetting, setFixedTimeSetting] = useState("MINUTES_30");

  return (
    <RadioGroup
      {...args}
      onChange={(value: string) => setReminderSetting(value)}
      value={reminderSetting}
    >
      <RadioOption
        value={"fixed"}
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
        value={"specific"}
        label="Specific Time"
        description="Set your reminder down to the seconds"
      >
        Remind me at{" "}
        <InputNumber
          size="small"
          suffix={{ label: "mins" }}
          defaultValue={"42"}
          maxLength={5}
          inline
        />{" "}
        and{" "}
        <InputNumber
          size="small"
          suffix={{ label: "sec" }}
          defaultValue={"3"}
          maxLength={5}
          inline
        />{" "}
        interval
      </RadioOption>
    </RadioGroup>
  );
};

export const Basic = {
  render: BasicTemplate,
};
export const Horizontal = {
  render: HorizontalTemplate,
};
export const Description = {
  render: DescriptionTemplate,
};
export const Disabled = {
  render: DisabledTemplate,
};
export const CustomRadioOptionContent = {
  render: CustomRadioOptionContentTemplate,
  args: {
    ariaLabel: "Reminder Settings",
  },
};
