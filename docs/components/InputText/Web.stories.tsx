import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Forms and Inputs/InputText/Web",
  component: InputText,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputText>;

const BasicTemplate: ComponentStory<typeof InputText> = args => {
  return <InputText {...args} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "age",
  placeholder: "Age in words",
};

export const Multiline = BasicTemplate.bind({});
Multiline.args = {
  defaultValue: "Rocinante",
  multiline: true,
  rows: { min: 1, max: 5 },
};

const ToolbarTemplate: ComponentStory<typeof InputText> = args => {
  return (
    <div>
      <h2>Multiline</h2>
      <Box gap="base">
        <InputText {...args} multiline />
        <InputText {...args} rows={{ min: 5, max: 10 }} multiline />
        <p>Example text...</p>
        <h2>Single line</h2>
      </Box>
      <Box gap="base">
        <InputText {...args} rows={undefined} multiline={false} />
        <InputText {...args} rows={undefined} multiline={false} />
      </Box>
      <p>Example text...</p>
    </div>
  );
};

export const Toolbar = ToolbarTemplate.bind({});
Toolbar.args = {
  placeholder: "Hakunamatata",
  multiline: true,
  rows: { min: 1, max: 5 },
  toolbar: (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Button label="Rewrite" size="small" icon="sparkles" fullWidth={false} />
      <Button
        ariaLabel="Undo"
        size="small"
        icon="redo"
        type="tertiary"
        fullWidth={false}
      />
    </div>
  ),
};

export const Readonly = BasicTemplate.bind({});
Readonly.args = {
  defaultValue: "Rocinante",
  readonly: true,
};

export const Loading = BasicTemplate.bind({});
Loading.args = {
  name: "phoneNumber",
  loading: true,
};

export const Clearable = BasicTemplate.bind({});
Clearable.args = {
  name: "name",
  clearable: "always",
};
