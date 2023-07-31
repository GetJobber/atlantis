import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} as ComponentMeta<typeof Countdown>;

const BasicTemplate: ComponentStory<typeof Countdown> = args => (
  <Countdown
    {...args}
    date={new Date(new Date().getTime() + 25 * 3600 * 1000)}
  />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  granularity: "dhms",
  showUnits: true,
};

const OnCompleteTemplate: ComponentStory<typeof Countdown> = args => {
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

export const OnComplete = OnCompleteTemplate.bind({});
OnComplete.args = {
  granularity: "s",
  showUnits: true,
  onComplete: () => alert("Completed Timer!"),
};

const StylingTemplate: ComponentStory<typeof Countdown> = args => (
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

export const Styling = StylingTemplate.bind({});
Styling.args = {
  granularity: "s",
  showUnits: true,
};
