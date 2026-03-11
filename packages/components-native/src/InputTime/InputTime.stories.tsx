import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Content, Form, InputTime } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/InputTime",
  component: InputTime,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof InputTime>;
export default meta;

interface NativeInputTimeControlledStoryArgs {
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean | string;
  emptyValueLabel?: string;
}

interface NativeInputTimeFormStoryArgs {
  name: string;
  placeholder?: string;
}

type ControlledStory = StoryObj<NativeInputTimeControlledStoryArgs>;
type FormStory = StoryObj<NativeInputTimeFormStoryArgs>;

const BasicTemplate = (args: ControlledStory["args"]) => {
  const [time, setTime] = useState<Date | undefined>(
    new Date("2023-07-21T16:36:34.873Z"),
  );

  return (
    <InputTime
      placeholder={args?.placeholder}
      disabled={args?.disabled}
      invalid={args?.invalid}
      emptyValueLabel={args?.emptyValueLabel}
      value={time}
      onChange={newTime => setTime(newTime)}
    />
  );
};

const EmptyValueTemplate = (args: ControlledStory["args"]) => {
  const [time, setTime] = useState<Date | undefined>(undefined);

  return (
    <InputTime
      placeholder={args?.placeholder}
      disabled={args?.disabled}
      invalid={args?.invalid}
      emptyValueLabel={args?.emptyValueLabel}
      value={time}
      onChange={newTime => setTime(newTime)}
    />
  );
};

const FormControlledTemplate = (args: FormStory["args"]) => (
  <SafeAreaProvider>
    <Host>
      <Form
        initialValues={{ startTime: new Date("2023-07-21T16:36:34.873Z") }}
        onSubmit={value =>
          new Promise(resolve => {
            setTimeout(
              () => resolve(alert(JSON.stringify(value, undefined))),
              1000,
            );
          })
        }
        onSubmitError={() => undefined}
        onSubmitSuccess={() => undefined}
      >
        <Content>
          <InputTime
            name={args?.name ?? "startTime"}
            placeholder={args?.placeholder}
          />
        </Content>
      </Form>
    </Host>
  </SafeAreaProvider>
);

export const Basic: ControlledStory = {
  render: BasicTemplate,
  args: {
    placeholder: "Start time",
  },
};

export const Disabled: ControlledStory = {
  render: BasicTemplate,
  args: {
    placeholder: "Start time",
    disabled: true,
  },
};

export const Invalid: ControlledStory = {
  render: BasicTemplate,
  args: {
    placeholder: "Start time",
    invalid: "Start time is required",
  },
};

export const FormControlled: FormStory = {
  render: FormControlledTemplate,
  args: {
    name: "startTime",
    placeholder: "Created time",
  },
};

export const EmptyValue: ControlledStory = {
  render: EmptyValueTemplate,
  args: {
    placeholder: "Start time",
    emptyValueLabel: "Unscheduled",
  },
};
