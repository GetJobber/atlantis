import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useFormState } from "@jobber/hooks";
import { Form, type FormRef } from "@jobber/components/Form";
import { Content } from "@jobber/components/Content";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";

const meta = {
  title: "Components/Forms and Inputs/Form",
  component: Form,
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Form>>>;

const BasicTemplate = (args: Story["args"]) => {
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

const OnStateChangeTemplate = (args: Story["args"]) => {
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

const TriggeringSubmissionTemplate = (args: Story["args"]) => {
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

export const Basic: Story = {
  render: BasicTemplate,
};

export const OnStateChange: Story = {
  render: OnStateChangeTemplate,
};

export const TriggeringSubmission: Story = {
  render: TriggeringSubmissionTemplate,
};
