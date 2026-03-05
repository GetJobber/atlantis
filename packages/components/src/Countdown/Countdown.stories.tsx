import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Countdown } from "@jobber/components/Countdown";
import { Button } from "@jobber/components/Button";
import { Emphasis } from "@jobber/components/Emphasis";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Utilities/Countdown/Web",
  component: Countdown,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Countdown>;

const BasicTemplate: StoryFn<typeof Countdown> = args => (
  <Countdown
    {...args}
    date={new Date(new Date().getTime() + 25 * 3600 * 1000)}
  />
);

export const Basic = {
  render: BasicTemplate,
  args: {
    granularity: "dhms",
    showUnits: true,
  },
};

const OnCompleteTemplate: StoryFn<typeof Countdown> = args => {
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

export const OnComplete = {
  render: OnCompleteTemplate,
  args: {
    granularity: "s",
    showUnits: true,
    onComplete: () => alert("Completed Timer!"),
  },
};
const StylingTemplate: StoryFn<typeof Countdown> = args => (
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

export const Styling = {
  render: StylingTemplate,
  args: {
    granularity: "s",
    showUnits: true,
  },
};
