import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormatTime } from "@jobber/components/FormatTime";

export default {
  title: "Components/Utilities/FormatTime/Web",
  component: FormatTime,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof FormatTime>;

const BasicTemplate: ComponentStory<typeof FormatTime> = args => {
  const earlyTime = new Date();
  earlyTime.setHours(2, 35, 0, 0);

  const lateTime = new Date();
  lateTime.setHours(22, 35, 0, 0);

  return (
    <>
      <div>
        <FormatTime {...args} time={earlyTime} use24HourClock={true} /> -{" "}
        <FormatTime {...args} time={lateTime} use24HourClock={true} />
      </div>
      <div>
        <FormatTime {...args} time={earlyTime} use24HourClock={false} /> -{" "}
        <FormatTime {...args} time={lateTime} use24HourClock={false} />
      </div>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
