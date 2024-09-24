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
      <FormatTime {...args} time={earlyTime} /> -{" "}
      <FormatTime {...args} time={lateTime} />
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
