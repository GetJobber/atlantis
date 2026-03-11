import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { Box } from "@jobber/components/Box";
import { FormFieldLabel } from "@jobber/components/FormField";

export default {
  title: "Components/Forms and Inputs/InputText/Web",
  component: InputText,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/FormField": ["FormFieldLabel"],
        },
      },
    },
  },
} as ComponentMeta<typeof InputText>;

const BasicTemplate: ComponentStory<typeof InputText> = args => {
  return <InputText {...args} />;
};

const ExternalLabelTemplate: ComponentStory<typeof InputText> = args => {
  return (
    <div>
      <FormFieldLabel external={true} htmlFor="ext-input">
        External label
      </FormFieldLabel>
      <InputText id="ext-input" {...args} />
    </div>
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

export const Autocomplete: ComponentStory<typeof InputText> = args => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <Content spacing="base">
        <InputText
          name="atlantis-is-real"
          autocomplete="on"
          placeholder="Enter a value"
          {...args}
        />
        <Button label="Submit" submit />
      </Content>
    </form>
  );
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

export const ExternalLabel = ExternalLabelTemplate.bind({});
ExternalLabel.args = {
  name: "name",
  clearable: "always",
  showMiniLabel: false,
};

export const VersionComparison = () => {
  const [values, setValues] = React.useState({
    basic: "",
    multiline: "",
    error: "",
    disabled: "",
    readonly: "This is readonly",
    withToolbar: "",
    prefix: "",
    suffix: "",
    both: "",
    rightAlign: "",
    centerAlign: "",
    sizeSmall: "",
    sizeLarge: "",
    inline: "",
    multilineResize: "",
  });
  const [multiline, setMultiline] = React.useState(false);
  const [inline, setInline] = React.useState(false);
  const [invalid, setInvalid] = React.useState<boolean | undefined>(undefined);
  const [disabled, setDisabled] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [description, setDescription] = React.useState<string>("");

  const extraProps = {
    invalid,
    error: errorMessage,
    multiline,
    inline,
    disabled,
    description,
  };

  const handleChange = (field: keyof typeof values) => (value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const toolbar = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button label="Rewrite" size="small" icon="sparkles" fullWidth={false} />
      <Button
        ariaLabel="Undo"
        size="small"
        icon="redo"
        type="tertiary"
        fullWidth={false}
      />
    </div>
  );

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
        <InputText
          {...props}
          version={1}
          value={values[field]}
          onChange={handleChange(field)}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <InputText
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
          "Left Aligned (Default)",
          {
            placeholder: "Default alignment",
            ...extraProps,
            showMiniLabel: false,
            description: "Description text",
            error: "Error string",
          },
          "basic",
        )}
        {renderBothVersions(
          "Readonly",
          {
            placeholder: "Readonly",
            ...extraProps,
            // For version 1
            readonly: true,
            // For version 2
            readOnly: true,
          },
          "readonly",
        )}
        {renderBothVersions(
          "Right Aligned",
          {
            placeholder: "Right aligned text",
            align: "right",
            ...extraProps,
          },
          "rightAlign",
        )}

        {renderBothVersions(
          "Center Aligned",
          {
            placeholder: "Center aligned text",
            align: "center",
            ...extraProps,
          },
          "centerAlign",
        )}

        {renderBothVersions(
          "With Prefix",
          {
            placeholder: "Input with prefix",
            prefix: { label: "$" },
            ...extraProps,
          },
          "prefix",
        )}

        {renderBothVersions(
          "With Suffix",
          {
            placeholder: "Input with suffix",
            suffix: { label: "%" },
            ...extraProps,
            title: "this is a title",
          },
          "suffix",
        )}

        {renderBothVersions(
          "With Prefix and Suffix",
          {
            placeholder: "Input with both",
            prefix: { icon: "search" },
            suffix: { icon: "calendar" },
            ...extraProps,
          },
          "both",
        )}

        {renderBothVersions(
          "With Toolbar",
          {
            placeholder: "With toolbar",
            toolbar: toolbar,
            ...extraProps,
          },
          "withToolbar",
        )}

        {renderBothVersions(
          "Combined Features",
          {
            placeholder: "All features",
            align: "right",
            prefix: { label: "$" },
            suffix: { icon: "remove" },
            toolbar: toolbar,
            ...extraProps,
          },
          "both",
        )}
        {renderBothVersions(
          "Size small",
          {
            placeholder: "With Size",
            size: "small",
            ...extraProps,
          },
          "sizeSmall",
        )}
        {renderBothVersions(
          "Size large",
          { placeholder: "With Size", size: "large", ...extraProps },
          "sizeLarge",
        )}
        {renderBothVersions(
          "Multiline Resize",
          {
            placeholder: "Multiline resize",
            rows: { min: 2, max: 10 },
            multiline: true,
          },
          "multilineResize",
        )}
      </div>
      <Grid>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Multiline"
            onClick={() => setMultiline(!multiline)}
          />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button label="Toggle inline" onClick={() => setInline(!inline)} />
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
            label="Toggle Error message"
            onClick={() => {
              if (errorMessage) {
                setErrorMessage(undefined);
              } else {
                setErrorMessage("This is an error message");
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
            label="Reset MultiLine resize"
            onClick={() => handleChange("multilineResize")("")}
          />
        </Grid.Cell>
      </Grid>
    </Content>
  );
};

const ControlledTemplate: ComponentStory<typeof InputText> = args => {
  const [value, setValue] = useState("");

  return (
    <Box gap="base">
      <InputText
        {...args}
        rows={{ min: 1, max: 10 }}
        multiline
        value={value}
        onChange={v => setValue(`${v}`)}
      />

      <div>
        <Button label="Reset" onClick={() => setValue("")} />
      </div>
    </Box>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: "Hakunamatata",
};
