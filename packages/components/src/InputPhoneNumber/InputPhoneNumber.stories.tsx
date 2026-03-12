import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputPhoneNumber } from "@jobber/components/InputPhoneNumber";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Button } from "@jobber/components/Button";

const meta = {
  title: "Components/Forms and Inputs/InputPhoneNumber",
  component: InputPhoneNumber,
} satisfies Meta<typeof InputPhoneNumber>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof InputPhoneNumber>>>;

const BasicTemplate = (args: Story["args"]) => {
  const [value, setValue] = useState(args?.value ?? "");

  return (
    <InputPhoneNumber
      {...args}
      value={value}
      onChange={(newValue: string) => setValue(newValue)}
    />
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter your phone number",
  },
};

export const WithCountryCode: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter your phone number",
    prefix: { label: "+1" },
  },
};

export const CustomPattern: Story = {
  render: BasicTemplate,
  args: {
    placeholder: "Enter your phone number",
    pattern: "(***) ***-**-**",
  },
};

export const InitialValue: Story = {
  render: BasicTemplate,
  args: {
    value: "555-TUNA",
    placeholder: "Enter your phone number",
  },
};

export const VersionComparison: Story = {
  render: () => {
    const [values, setValues] = React.useState({
      basic: "",
      withCountryCode: "",
      customPattern: "",
      error: "",
      disabled: "",
      readonly: "(555) 123-4567",
      clearableAlways: "",
      clearableFocus: "",
      clearableWithSuffix: "",
    });

    const [invalid, setInvalid] = React.useState<boolean | undefined>(
      undefined,
    );
    const [disabled, setDisabled] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<
      string | undefined
    >();
    const [loading, setLoading] = React.useState(false);
    const extraProps = {
      invalid,
      error: errorMessage,
      disabled,
      loading,
    };

    const handleChange = (field: keyof typeof values) => (value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
    };

    const renderBothVersions = (
      title: string,
      props: Record<string, unknown>,
      field: keyof typeof values,
    ) => (
      <Grid>
        <Grid.Cell size={{ xs: 12 }}>
          <h3>{title}</h3>
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <InputPhoneNumber
            {...props}
            version={1}
            value={values[field]}
            onChange={handleChange(field)}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <InputPhoneNumber
            {...props}
            version={2}
            value={values[field]}
            onChange={handleChange(field)}
          />
        </Grid.Cell>
      </Grid>
    );

    return (
      <Content>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Grid>
            <Grid.Cell size={{ xs: 6 }}>
              <h2>V1</h2>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 6 }}>
              <h2>V2</h2>
            </Grid.Cell>
          </Grid>

          {renderBothVersions(
            "Basic",
            {
              placeholder: "Enter your phone number",
              ...extraProps,
            },
            "basic",
          )}

          {renderBothVersions(
            "With Country Code",
            {
              placeholder: "Enter your phone number",
              prefix: { label: "+1" },
              ...extraProps,
            },
            "withCountryCode",
          )}

          {renderBothVersions(
            "Custom Pattern",
            {
              placeholder: "Enter your phone number",
              pattern: "(***) ***-**-**",
              ...extraProps,
            },
            "customPattern",
          )}

          {renderBothVersions(
            "Readonly",
            {
              placeholder: "Enter your phone number",
              ...extraProps,
              readonly: true,
            },
            "readonly",
          )}

          {renderBothVersions(
            "Clearable",
            {
              placeholder: "Enter your phone number",
              clearable: "always",
              ...extraProps,
            },
            "clearableAlways",
          )}

          {renderBothVersions(
            "Clearable with Suffix",
            {
              placeholder: "Enter your phone number",
              clearable: "always",
              suffix: { icon: "phone" },
              ...extraProps,
            },
            "clearableWithSuffix",
          )}

          {renderBothVersions(
            "Clearable with Country Code and Suffix",
            {
              placeholder: "Enter your phone number",
              clearable: "always",
              prefix: { label: "+1" },
              suffix: { icon: "phone" },
              ...extraProps,
            },
            "clearableWithSuffix",
          )}
        </div>

        <Grid>
          <Grid.Cell size={{ xs: 6 }}>
            <Button
              label="Toggle Invalid"
              onClick={() => {
                if (invalid) {
                  setInvalid(undefined);
                } else {
                  setInvalid(true);
                }
              }}
            />
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Button
              label="Toggle Error message"
              onClick={() => {
                if (errorMessage) {
                  setErrorMessage(undefined);
                } else {
                  setErrorMessage("Please enter a valid phone number");
                }
              }}
            />
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Button
              label="Toggle Disabled"
              onClick={() => {
                setDisabled(!disabled);
              }}
            />
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Button
              label="Toggle loading"
              onClick={() => {
                setLoading(!loading);
              }}
            />
          </Grid.Cell>
        </Grid>
      </Content>
    );
  },
};
