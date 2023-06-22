import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";
import { Content } from "../Content";
import { InputText } from "../InputText";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Animated Button Test",
  component: Button,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = () => {
  const [switchedArrows, setSwitchedArrows] = useState(false);
  const [switchedChecked, setSwitchedChecked] = useState(false);
  const [switchedShow, setSwitchedShow] = useState(false);
  const [switchedMenu, setSwitchedMenu] = useState(false);
  const [switchedCalendar, setSwitchedCalendar] = useState(false);
  return (
    <Content>
      <div>
        <Button
          label={switchedArrows ? "Expand" : "Collapse"}
          icon={switchedArrows ? "arrowDown" : "arrowUp"}
          type="secondary"
          onClick={() => setSwitchedArrows(!switchedArrows)}
        />
      </div>
      <div>
        <Button
          label={switchedChecked ? "Added" : "Add"}
          icon={switchedChecked ? "checkmark" : "add"}
          type="secondary"
          onClick={() => setSwitchedChecked(!switchedChecked)}
        />
      </div>
      <div>
        <Button
          label={switchedShow ? "Show" : "Hide"}
          type="secondary"
          onClick={() => setSwitchedShow(!switchedShow)}
        />
      </div>
      <div>
        <Button
          icon={switchedMenu ? "backArrow" : "menu"}
          ariaLabel="Menu"
          type="secondary"
          onClick={() => setSwitchedMenu(!switchedMenu)}
        />
      </div>
      <div>
        <InputText
          placeholder="Select date"
          inline
          suffix={{
            icon: switchedCalendar ? "cross" : "calendar",
            // @ts-expect-error - added onClick to suffix
            onClick: () => setSwitchedCalendar(!switchedCalendar),
          }}
        />
      </div>
    </Content>
  );
};

export const Animated = Template.bind({});
Animated.args = {};
