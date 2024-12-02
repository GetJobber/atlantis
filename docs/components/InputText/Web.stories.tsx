import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

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

const AffixTemplate: ComponentStory<typeof InputText> = args => {
  return (
    <Content>
      <InputText
        {...args}
        placeholder="Prefix icon"
        clearable="while-editing"
        prefix={{ icon: "user" }}
      />
      <InputText
        {...args}
        clearable="while-editing"
        placeholder="Suffix icon"
        suffix={{ icon: "user" }}
      />
      <InputText
        {...args}
        placeholder="Prefix label"
        clearable="while-editing"
        prefix={{ label: "$" }}
      />
      <InputText
        {...args}
        placeholder="Suffix label"
        clearable="while-editing"
        suffix={{ label: "%" }}
      />
      <InputText
        {...args}
        placeholder="Prefix icon and label"
        prefix={{ icon: "user", label: "$" }}
      />
      <InputText
        {...args}
        placeholder="Suffix icon and label"
        clearable="while-editing"
        suffix={{ icon: "user", label: "%" }}
      />
      <InputText
        {...args}
        placeholder="Prefix / suffix icon "
        prefix={{ icon: "user" }}
        clearable="while-editing"
        suffix={{ icon: "add" }}
      />
      <InputText
        {...args}
        placeholder="Prefix / suffix label"
        prefix={{ label: "$" }}
        clearable="while-editing"
        suffix={{ label: "%" }}
      />
      <InputText
        {...args}
        placeholder="Prefix / suffix icon and label"
        prefix={{ icon: "user", label: "$" }}
        clearable="while-editing"
        suffix={{ icon: "add", label: "%" }}
      />
    </Content>
  );
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

export const Toolbar = BasicTemplate.bind({});
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

export const Comparison = AffixTemplate.bind({});
Comparison.args = {};
