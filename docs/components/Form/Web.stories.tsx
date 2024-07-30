import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CivilTime } from "@std-proposal/temporal";
import { useFormState } from "@jobber/hooks";
import { Form, FormRef } from "@jobber/components/Form";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { InputDate } from "@jobber/components/InputDate";
import { InputTime } from "@jobber/components/InputTime";
import { Autocomplete, Option } from "@jobber/components/Autocomplete";

export default {
  title: "Components/Forms and Inputs/Form/Web",
  component: Form,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/hooks": ["useFormState"],
          "@jobber/components/Form": ["Form", "FormRef"],
        },
      },
    },
  },
} as ComponentMeta<typeof Form>;

const BasicTemplate: ComponentStory<typeof Form> = args => {
  const [{ isDirty, isValid }, setFormState] = useFormState();
  const [first, setFirst] = useState("");

  return (
    <Form
      {...args}
      onSubmit={() => alert("Submitted 🎉🎉🎉")}
      onStateChange={setFormState}
    >
      <Content>
        <InputText
          placeholder="First Name"
          name="firstName"
          value={first}
          onChange={(value: string) => setFirst(value)}
          validations={{
            required: {
              value: true,
              message: "Tell us your name",
            },
            minLength: {
              value: 3,
              message: "Your name is too short.",
            },
          }}
        />
        <InputText
          placeholder="Last Name"
          name="lastName"
          validations={{
            required: {
              value: true,
              message: "Tell us your last name.",
            },
          }}
        />
        <Button
          label="Submit Form"
          submit={true}
          disabled={!isDirty || !isValid}
        />
      </Content>
    </Form>
  );
};

const OnStateChangeTemplate: ComponentStory<typeof Form> = args => {
  const [formState, setFormState] = useFormState();

  return (
    <>
      <Form
        {...args}
        onSubmit={() => alert("submitted")}
        onStateChange={setFormState}
      >
        <InputText
          placeholder="First Name"
          name="firstName"
          validations={{
            required: {
              value: true,
              message: "Tell us your name",
            },
            minLength: {
              value: 3,
              message: "Your name is too short.",
            },
          }}
        />
      </Form>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </>
  );
};

const TriggeringSubmissionTemplate: ComponentStory<typeof Form> = args => {
  const formRef = useRef<FormRef>(null);

  return (
    <Content>
      <Form {...args} onSubmit={() => alert("Submitted 🎉🎉🎉")} ref={formRef}>
        <Content>
          <InputText
            placeholder="First Name"
            name="firstName"
            validations={{
              required: {
                value: true,
                message: "Tell us your name",
              },
            }}
          />
          <InputText
            placeholder="Last Name"
            name="lastName"
            validations={{
              required: {
                value: true,
                message: "Tell us your last name.",
              },
            }}
          />
        </Content>
      </Form>
      <Button
        label="Submit Form from the outside"
        onClick={() => formRef.current?.submit?.()}
      />
    </Content>
  );
};

const withDetailsOptions = [
  {
    value: 1,
    label: "Sulaco",
    description: "They mostly come at night, mostly.",
    details: "LV-426",
  },
  { value: 2, label: "Nostromo", details: "LV-426" },
  { value: 3, label: "Serenity", description: "I aim to misbehave." },
  { value: 4, label: "Sleeper Service" },
  { value: 5, label: "Enterprise" },
  {
    value: 6,
    label: "Enterprise-D",
    description: "Tea, earl grey, hot.",
    details: "NCC-1701D",
  },
];

const ErrorFocusTestTemplate: ComponentStory<typeof Form> = args => {
  const [first, setFirst] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<CivilTime>();
  const [autocompleteValue, setAutoCompleteValue] = useState<
    Option | undefined
  >();

  const formRef = useRef<FormRef>(null);

  const handleChange = (newTime: CivilTime) => {
    setTime(newTime);
  };

  return (
    <Content>
      <Form {...args} onSubmit={() => alert("Submitted 🎉🎉🎉")} ref={formRef}>
        <Content>
          <Autocomplete
            initialOptions={withDetailsOptions}
            placeholder="AutocompleteTest"
            value={autocompleteValue}
            onChange={newValue => setAutoCompleteValue(newValue)}
            getOptions={getAutocompleteOptions}
            name="name.0.autocomplete"
            validations={{
              maxLength: 255,
              required: {
                value: true,
                message: "This is a required field",
              },
            }}
          />
          <InputDate
            value={date}
            placeholder="InputDate"
            validations={{
              required: {
                value: true,
                message: "Please select a date",
              },
            }}
            name="name.0.inputDate"
            onChange={setDate}
          />
          <InputTime
            value={time}
            name="name.0.inputTime"
            placeholder="InputTime"
            onChange={handleChange}
            validations={{
              required: {
                value: true,
                message: "Please select a date",
              },
            }}
          />
          <InputText name="name.0.NoValidations" placeholder="No Validations" />
          <InputText
            placeholder="First Name"
            name="name.0.firstName"
            multiline={true}
            value={first}
            onChange={(value: string) => setFirst(value)}
            validations={{
              required: {
                value: true,
                message: "Tell us your name",
              },
              minLength: {
                value: 3,
                message: "Your name is too short.",
              },
            }}
          />
          <InputText
            placeholder="Last Name"
            name="name.0.lastName"
            validations={{
              required: {
                value: true,
                message: "Tell us your last name.",
              },
            }}
          />
          <Button label="Submit Form (inside)" submit={true} />
        </Content>
      </Form>
      <Button
        label="Submit Form from the outside"
        onClick={() => formRef.current?.submit?.()}
      />
    </Content>
  );

  function getAutocompleteOptions(text: string) {
    if (text === "") {
      return withDetailsOptions;
    }
    const filterRegex = new RegExp(text, "i");

    return withDetailsOptions.filter(option => option.label.match(filterRegex));
  }
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};

export const OnStateChange = OnStateChangeTemplate.bind({});
OnStateChange.args = {};

export const TriggeringSubmission = TriggeringSubmissionTemplate.bind({});
TriggeringSubmission.args = {};

export const ErrorFocusTest = ErrorFocusTestTemplate.bind({});
ErrorFocusTest.args = {};
