import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputText, InputTextSPAR } from "@jobber/components/InputText";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";

export default {
  title: "Components/Forms and Inputs/InputText/Web",
  component: InputText,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputText>;

const BasicTemplate: ComponentStory<typeof InputText> = args => {
  const [value, setValue] = React.useState("");

  return <InputText {...args} value={value} onChange={setValue} version={2} />;
};

const Version2Template: ComponentStory<typeof InputTextSPAR> = args => {
  const [value, setValue] = React.useState("");

  return <InputText {...args} value={value} onChange={setValue} version={2} />;
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

export const Version2 = Version2Template.bind({});
Version2.args = {
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

export const VersionComparison = () => {
  const [values, setValues] = React.useState({
    basic: "",
    multiline: "",
    error: "",
    disabled: "",
    readonly: "",
    withToolbar: "",
    prefix: "",
    suffix: "",
    both: "",
    rightAlign: "",
    centerAlign: "",
    sizeSmall: "",
    sizeLarge: "",
    inline: "",
  });
  const [multiline, setMultiline] = React.useState(false);
  const [inline, setInline] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const extraProps = {
    invalid,
    error: errorMessage,
    multiline,
    inline,
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
        <InputTextSPAR
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
          },
          "basic",
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
          <Button label="Toggle Invalid" onClick={() => setInvalid(!invalid)} />
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Button
            label="Toggle Error message"
            onClick={() => {
              if (errorMessage) {
                setErrorMessage("");
              } else {
                setErrorMessage("This is an error message");
              }
            }}
          />
        </Grid.Cell>
      </Grid>
    </Content>
  );
};
