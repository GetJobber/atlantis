import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputPhoneNumber } from "@jobber/components/InputPhoneNumber";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Forms and Inputs/InputPhoneNumber/Web",
  component: InputPhoneNumber,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputPhoneNumber>;

const BasicTemplate: ComponentStory<typeof InputPhoneNumber> = args => {
  const [value, setValue] = useState(args.value);

  return <InputPhoneNumber {...args} value={value} onChange={setValue} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Enter your phone number",
};

export const WithCountryCode = BasicTemplate.bind({});
WithCountryCode.args = {
  placeholder: "Enter your phone number",
  prefix: { label: "+1" },
};

export const CustomPattern = BasicTemplate.bind({});
CustomPattern.args = {
  placeholder: "Enter your phone number",
  pattern: "(***) ***-**-**",
};

export const InitialValue = BasicTemplate.bind({});
InitialValue.args = {
  value: "555-TUNA",
  placeholder: "Enter your phone number",
};

export const VersionComparison = () => {
  const [values, setValues] = React.useState({
    basic: "",
    withCountryCode: "",
    customPattern: "",
    error: "",
    disabled: "",
    readonly: "555-123-4567",
    clearableAlways: "",
    clearableFocus: "",
    clearableWithSuffix: "",
  });

  const [invalid, setInvalid] = React.useState<boolean | undefined>(undefined);
  const [disabled, setDisabled] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();

  const extraProps = {
    invalid,
    error: errorMessage,
    disabled,
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
      </Grid>
    </Content>
  );
};
