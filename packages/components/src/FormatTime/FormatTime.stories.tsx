import React from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
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
} as Meta<typeof FormatTime>;

const BasicTemplate: StoryFn<typeof FormatTime> = args => {
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

export const Basic = {
  render: BasicTemplate,
  args: {},
};
