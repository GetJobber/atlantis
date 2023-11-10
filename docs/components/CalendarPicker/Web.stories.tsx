import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  CalendarPicker,
  CalendarPickerModal,
  CalendarPickerModalProps,
  PickedCalendarRange,
  useHumanReadableRRule,
  useRRuleFromPickedCalendarRange,
} from "@jobber/components/CalendarPicker";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";

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

const BasicTemplate: ComponentStory<typeof CalendarPicker> = args => {
  return (
    <Content>
      <CalendarPicker
        restrict
        enableRangeInteraction={args.enableRangeInteraction}
      />
    </Content>
  );
};

const RuleTemplate: ComponentStory<typeof CalendarPicker> = args => {
  const [range, setRange] = useState<PickedCalendarRange>();
  const { rule } = useRRuleFromPickedCalendarRange(
    range || ({} as PickedCalendarRange),
  );

  return (
    <Content>
      <CalendarPicker
        restrict
        enableRangeInteraction={args.enableRangeInteraction}
        defaultPickedCalendarRange={range}
        onUpdate={update => {
          setRange(update);
        }}
      />
      {rule}
    </Content>
  );
};

const ModalTemplate: ComponentStory<typeof CalendarPickerModal> = (
  args: CalendarPickerModalProps,
) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<PickedCalendarRange>();
  const { rule } = useRRuleFromPickedCalendarRange(range);
  const human = useHumanReadableRRule(rule);

  return (
    <Content>
      <CalendarPickerModal
        picker={{
          ...args.picker,
          onUpdate: inRange => {
            setRange(inRange);
          },
        }}
        modal={{
          ...args.modal,
          open,
          onRequestClose: () => {
            setOpen(false);
            console.log(rule, range);
            alert(
              "RRule Generated: " + rule + "\nPlain Text Generated: " + human,
            );
          },
        }}
      />
      <Button
        label={open ? "Hide Calendar" : "Show Calendar"}
        onClick={() => setOpen(true)}
      />
    </Content>
  );
};

export const Modal = ModalTemplate.bind({});

const HookJSXTemplate = ({ range }: { readonly range: string }) => {
  return <div>{range}</div>;
};

const HookTemplate: ComponentStory<typeof HookJSXTemplate> = ({
  range = "",
}: {
  readonly range: string;
}) => {
  const humanRange = useHumanReadableRRule(range);

  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 12 }}>
        See Range Field Below
      </div>
      Human Readable: {humanRange}
    </div>
  );
};
export const Hook = HookTemplate.bind({});
Hook.args = {
  range: "RRULE:FREQ=DAILY;INTERVAL=15;",
};

export const Base = BasicTemplate.bind({});
export const RRuleDisplay = RuleTemplate.bind({});
