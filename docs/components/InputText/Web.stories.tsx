import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { Menu } from "@jobber/components/Menu";

export default {
  title: "Components/Forms and Inputs/InputText/Web",
  component: InputText,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof InputText>;

const BasicTemplate: ComponentStory<typeof InputText> = args => {
  const [show, setShow] = React.useState(false);

  return (
    <InputText
      {...args}
      toolbar={
        <Menu
          items={[
            {
              actions: [
                {
                  label: "Edit",
                  icon: "edit",
                  onClick: () => {
                    alert("✏️");
                  },
                },
              ],
            },
            {
              header: "Send as...",
              actions: [
                {
                  label: "Text Message",
                  icon: "sms",
                  onClick: () => {
                    alert("📱");
                  },
                },
                {
                  label: "Email",
                  icon: "email",
                  onClick: () => {
                    alert("📨");
                  },
                },
              ],
            },
          ]}
        />
      }
    />
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
