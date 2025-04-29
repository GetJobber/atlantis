import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputEmail } from "@jobber/components/InputEmail";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Forms and Inputs/InputEmail/Web",
  component: InputEmail,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputEmail>;

const BasicTemplate: ComponentStory<typeof InputEmail> = args => (
  <InputEmail {...args} />
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "Enter your email",
};

export const VersionComparison = () => {
  const [values, setValues] = useState({
    basic: "",
    disabled: "",
    invalid: "",
    withDescription: "",
    inline: "",
    prefix: "",
    suffix: "",
    both: "",
    rightAlign: "",
    centerAlign: "",
    sizeSmall: "",
    sizeLarge: "",
    loading: "",
    maxLength: "",
    clearable: "",
  });

  const [inline, setInline] = useState(false);
  const [invalid, setInvalid] = useState<boolean | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const extraProps = {
    invalid,
    inline,
    disabled,
    description,
    error,
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
        <InputEmail
          {...props}
          version={1}
          value={values[field]}
          onChange={handleChange(field)}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <InputEmail
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
          "Basic Input",
          {
            placeholder: "Enter your email",
            ...extraProps,
          },
          "basic",
        )}

        {renderBothVersions(
          "Right Aligned",
          {
            placeholder: "Right aligned",
            align: "right",
            ...extraProps,
          },
          "rightAlign",
        )}

        {renderBothVersions(
          "Center Aligned",
          {
            placeholder: "Center aligned",
            align: "center",
            ...extraProps,
          },
          "centerAlign",
        )}

        {renderBothVersions(
          "With Prefix",
          {
            placeholder: "Input with prefix",
            prefix: { icon: "search" },
            ...extraProps,
          },
          "prefix",
        )}

        {renderBothVersions(
          "With Suffix",
          {
            placeholder: "Input with suffix",
            suffix: { icon: "sparkles" },
            ...extraProps,
          },
          "suffix",
        )}

        {renderBothVersions(
          "With Prefix and Suffix",
          {
            placeholder: "Input with both",
            prefix: { label: "Pre" },
            suffix: { label: "Suf" },
            ...extraProps,
          },
          "both",
        )}

        {renderBothVersions(
          "Size small",
          {
            placeholder: "Small input",
            size: "small",
            ...extraProps,
          },
          "sizeSmall",
        )}

        {renderBothVersions(
          "Size large",
          {
            placeholder: "Large input",
            size: "large",
            ...extraProps,
          },
          "sizeLarge",
        )}

        {renderBothVersions(
          "Loading",
          {
            placeholder: "Loading input",
            loading: true,
            ...extraProps,
          },
          "loading",
        )}

        {renderBothVersions(
          "Max Length",
          {
            placeholder: "Max length input",
            maxLength: 5,
            ...extraProps,
          },
          "maxLength",
        )}
        {renderBothVersions(
          "Clearable",
          {
            placeholder: "Clearable input",
            clearable: "always",
            ...extraProps,
          },
          "clearable",
        )}
      </div>

      <Grid>
        <Grid.Cell size={{ xs: 6 }}>
          <Button label="Toggle Inline" onClick={() => setInline(!inline)} />
        </Grid.Cell>
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
            label="Toggle Disabled"
            onClick={() => {
              setDisabled(!disabled);
            }}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Description"
            onClick={() => {
              setDescription(description ? "" : "This is a description");
            }}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Error"
            onClick={() => setError(error ? "" : "This is an error message")}
          />
        </Grid.Cell>
      </Grid>
    </Content>
  );
};
