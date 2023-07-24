import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useFormState } from "@jobber/hooks";
import { Form, FormRef } from "@jobber/components/Form";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";

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

export const Basic = BasicTemplate.bind({});
Basic.args = {};

export const OnStateChange = OnStateChangeTemplate.bind({});
OnStateChange.args = {};

export const TriggeringSubmission = TriggeringSubmissionTemplate.bind({});
TriggeringSubmission.args = {};
