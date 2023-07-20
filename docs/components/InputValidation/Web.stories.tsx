import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputValidation } from "@jobber/components/InputValidation";
import { InputText } from "@jobber/components/InputText";
import { Text } from "@jobber/components/Text";

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
  return (
    <>
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
      {validationMessages && <InputValidation message={validationMessages} />}
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  message: "",
};
