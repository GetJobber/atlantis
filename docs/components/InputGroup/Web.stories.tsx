import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputGroup } from "@jobber/components/InputGroup";
import { InputTime } from "@jobber/components/InputTime";
import { InputText } from "@jobber/components/InputText";
import { Form } from "@jobber/components/Form";
import { InputValidation } from "@jobber/components/InputValidation";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Forms and Inputs/InputGroup/Web",
  component: InputGroup,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof InputGroup>;

const BasicTemplate: ComponentStory<typeof InputGroup> = args => {
  const startTime = new Date();
  startTime.setHours(8, 35, 0, 0);

  const endTime = new Date();
  endTime.setHours(22, 55, 0, 0);

  return (
    <InputGroup {...args}>
      <InputTime defaultValue={startTime} />
      <InputTime defaultValue={endTime} />
    </InputGroup>
  );
};

const NestedTemplate: ComponentStory<typeof InputGroup> = args => {
  return (
    <InputGroup {...args}>
      <InputText placeholder="Street 1" />
      <InputText placeholder="Street 2" />
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="City" />
        <InputText placeholder="Province" />
      </InputGroup>
      <InputGroup flowDirection="horizontal">
        <InputText placeholder="Postal Code" />
        <InputText placeholder="Country" />
      </InputGroup>
    </InputGroup>
  );
};

const QuotemealTemplate: ComponentStory<typeof InputGroup> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleValidation, setTitleValidation] = useState("");
  const [descriptionValidation, setDescriptionValidation] = useState("");

  const handleValidation = () => {
    if (!title) setTitleValidation("Title is required.");
    if (!description) setDescriptionValidation("Description is required.");
  };

  const handleSubmit = () => {
    handleValidation();

    if (title && description) {
      alert("Form submitted! 🎉");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <InputText
          name="title"
          placeholder="Title"
          value={title}
          onChange={(newValue: string) => {
            setTitle(newValue);
            setTitleValidation("");
          }}
        />
        <InputText
          name="description"
          placeholder="Description"
          value={description}
          onChange={(newValue: string) => {
            setDescription(newValue);
            setDescriptionValidation("");
          }}
          multiline
        />
      </InputGroup>
      {titleValidation && <InputValidation message={titleValidation} />}
      {descriptionValidation && (
        <InputValidation message={descriptionValidation} />
      )}
      <Button label="Submit" submit />
    </Form>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  flowDirection: "vertical",
};

export const Nested = NestedTemplate.bind({});
Nested.args = {
  flowDirection: "vertical",
};

export const Quotemeal = QuotemealTemplate.bind({});
