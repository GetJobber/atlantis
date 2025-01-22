import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";
import { InputLabel } from "@jobber/components/InputLabel";
import { InputDate } from "@jobber/components/InputDate";
import { InputEmail } from "@jobber/components/InputEmail";
import { InputPhoneNumber } from "@jobber/components/InputPhoneNumber";

export default {
  title: "Components/Forms and Inputs/InputLabel/Web",
  component: InputLabel,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputLabel>;

const InputTextTemplate: ComponentStory<typeof InputLabel> = () => {
  const [value, setValue] = useState<string>();

  return (
    <div>
      <InputLabel inputId="ageInput" label="Age" />
      <InputText
        id="ageInput"
        version={2}
        value={value || ""}
        onChange={newVal => setValue(newVal)}
      />
    </div>
  );
};

export const LabelledInputText = InputTextTemplate.bind({});

const InputDateTemplate: ComponentStory<typeof InputLabel> = () => {
  const [value, setValue] = useState<Date>();

  return (
    <div>
      <InputLabel inputId="birthdayInput" label="Birthday" />
      <InputDate
        id="birthdayInput"
        value={value}
        onChange={newDate => setValue(newDate)}
      />
    </div>
  );
};

export const LabelledInputDate = InputDateTemplate.bind({});

const InputEmailTemplate: ComponentStory<typeof InputLabel> = () => {
  return (
    <div>
      <InputLabel inputId="emailInput" label="Email" />
      <InputEmail id="emailInput" />
    </div>
  );
};

export const LabelledInputEmail = InputEmailTemplate.bind({});

const InputPhoneNumberTemplate: ComponentStory<typeof InputLabel> = () => {
  const [value, setValue] = useState<string>();

  return (
    <div>
      <InputLabel inputId="phoneNumberInput" label="Phone Number" />
      <InputPhoneNumber
        id="phoneNumberInput"
        value={value || ""}
        onChange={newDate => setValue(newDate)}
      />
    </div>
  );
};

export const LabelledInputPhoneNumber = InputPhoneNumberTemplate.bind({});

const CustomStylesTemplate: ComponentStory<typeof InputLabel> = () => {
  const [value, setValue] = useState<string>();
  const customStyles = { color: "red", fontWeight: "bold" };

  return (
    <div>
      <InputLabel inputId="ageInput" label="Age" style={customStyles} />
      <InputText
        id="ageInput"
        version={2}
        value={value || ""}
        onChange={newVal => setValue(newVal)}
      />
    </div>
  );
};

export const CustomStyles = CustomStylesTemplate.bind({});
