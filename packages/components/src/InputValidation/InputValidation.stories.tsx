import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputValidation } from "@jobber/components/InputValidation";
import { InputText } from "@jobber/components/InputText";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

const meta = {
  title: "Components/Forms and Inputs/InputValidation",
  component: InputValidation,
} satisfies Meta<typeof InputValidation>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof InputValidation>, "message">
>;

const BasicTemplate = (args: Story["args"]) => {
  const [validationMessages, setValidationMessages] = useState(
    args?.message ?? "",
  );
  const [displayError, setDisplayError] = useState(true);

  return (
    <Content>
      <Content spacing="smallest">
        <Text>
          My name is
          <InputText
            validations={{
              required: {
                value: true,
                message: "Please tell me your name",
              },
              pattern: {
                value: /Jeff/,
                message: "Have you considered a better name, like Jeff?",
              },
            }}
            onValidation={message => setValidationMessages(message)}
            size="small"
            inline={true}
            maxLength={4}
          />
        </Text>
        <InputValidation
          message={validationMessages}
          visible={!!validationMessages}
        />
      </Content>
      <Content spacing="smallest">
        <Text>
          InputValidation can also be toggled using the visible prop
          <InputText size="small" />
        </Text>
        <InputValidation
          message="This error message can be toggled "
          visible={displayError}
        />
        <Button
          fullWidth={false}
          onClick={() => setDisplayError(prev => !prev)}
          label="Toggle Error"
        />
      </Content>
    </Content>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    message: "",
  },
};
