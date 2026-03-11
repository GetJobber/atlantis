import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Countdown } from "@jobber/components/Countdown";
import { Button } from "@jobber/components/Button";
import { Emphasis } from "@jobber/components/Emphasis";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

const meta = {
  title: "Components/Utilities/Countdown",
  component: Countdown,
} satisfies Meta<typeof Countdown>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Countdown>>>;

const BasicTemplate = (args: Story["args"]) => (
  <Countdown
    {...args}
    date={new Date(new Date().getTime() + 25 * 3600 * 1000)}
  />
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    granularity: "dhms",
    showUnits: true,
  },
};

const OnCompleteTemplate = (args: Story["args"]) => {
  const [start, setStart] = useState(false);
  const inTenSeconds = new Date(new Date().getTime() + 10 * 1000);

  return (
    <div>
      <Button label={"Start Timer"} onClick={() => setStart(true)} />
      {start && (
        <Text>
          <Countdown {...args} date={inTenSeconds} />
        </Text>
      )}
    </div>
  );
};

export const OnComplete: Story = {
  render: OnCompleteTemplate,
  args: {
    granularity: "s",
    showUnits: true,
    onComplete: () => alert("Completed Timer!"),
  },
};

const StylingTemplate = (args: Story["args"]) => (
  <Content>
    <Text>
      <Countdown
        {...args}
        date={new Date(new Date().getTime() + 36000 * 1000)}
        granularity={"ms"}
      />
    </Text>
    <div />
    <Heading level={1}>
      <Emphasis variation="highlight">
        <Countdown
          {...args}
          date={new Date(new Date().getTime() + 36000 * 1000)}
        />
      </Emphasis>
    </Heading>
  </Content>
);

export const Styling: Story = {
  render: StylingTemplate,
  args: {
    granularity: "s",
    showUnits: true,
  },
};
