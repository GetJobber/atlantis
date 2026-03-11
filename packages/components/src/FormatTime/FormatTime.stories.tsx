import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormatTime } from "@jobber/components/FormatTime";

const meta = {
  title: "Components/Utilities/FormatTime",
  component: FormatTime,
} satisfies Meta<typeof FormatTime>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof FormatTime>, "use24HourClock">
>;

const BasicTemplate = (args: Story["args"]) => {
  const earlyTime = new Date();
  earlyTime.setHours(2, 35, 0, 0);

  const lateTime = new Date();
  lateTime.setHours(22, 35, 0, 0);

  return (
    <>
      <div>
        <FormatTime
          time={earlyTime}
          use24HourClock={args?.use24HourClock ?? true}
        />{" "}
        -{" "}
        <FormatTime
          time={lateTime}
          use24HourClock={args?.use24HourClock ?? true}
        />
      </div>
      <div>
        <FormatTime
          time={earlyTime}
          use24HourClock={args?.use24HourClock ?? false}
        />{" "}
        -{" "}
        <FormatTime
          time={lateTime}
          use24HourClock={args?.use24HourClock ?? false}
        />
      </div>
    </>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
};
