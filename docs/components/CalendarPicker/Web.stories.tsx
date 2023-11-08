import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CalendarPicker } from "@jobber/components/CalendarPicker";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Selections/Calendar/Web",
  component: CalendarPicker,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/CalendarPicker": ["CalendarPicker"],
        },
      },
    },
  },
} as ComponentMeta<typeof CalendarPicker>;

const BasicTemplate: ComponentStory<typeof CalendarPicker> = () => {
  return (
    <Content>
      <CalendarPicker />
    </Content>
  );
};

export const Base = BasicTemplate.bind({});
