import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputValidation } from "@jobber/components/InputValidation";
import { InputText } from "@jobber/components/InputText";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export default {
  title: "Components/Forms and Inputs/InputValidation/Web",
  components: InputValidation,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputValidation>;

const BasicTemplate: ComponentStory<typeof InputValidation> = args => {
  const [validationMessages, setValidationMessages] = useState(args.message);
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  message: "",
};
