import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CivilTime } from "@std-proposal/temporal";
import { FormatTime } from "@jobber/components/FormatTime";

export default {
  title: "Components/Utilities/FormatTime/Web",
  component: FormatTime,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@std-proposal/temporal": ["CivilTime"],
        },
      },
    },
  },
} as ComponentMeta<typeof FormatTime>;

const BasicTemplate: ComponentStory<typeof FormatTime> = args => (
  <>
    <FormatTime {...args} time={new CivilTime(2, 35)} />
    -
    <FormatTime {...args} time={new CivilTime(18, 35)} />
  </>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {};
