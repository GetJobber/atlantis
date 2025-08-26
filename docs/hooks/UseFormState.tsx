import React from "react";
import { Form } from "@jobber/components/Form";
import { InputText } from "@jobber/components/InputText";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { useFormState } from "@jobber/hooks/useFormState";

export function UseFormState() {
  const [formState, setFormState] = useFormState();

  return (
    <>
      <Form onSubmit={() => alert("submitted")} onStateChange={setFormState}>
        <Content>
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
            disabled={!formState.isDirty || !formState.isValid}
          />
        </Content>
      </Form>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </>
  );
}
