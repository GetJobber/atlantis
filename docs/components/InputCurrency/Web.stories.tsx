import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputCurrency } from "@jobber/components/InputCurrency";
import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Grid } from "@jobber/components/Grid";
import { FormFieldLabel } from "@jobber/components/FormField";
import { Flex } from "@jobber/components/Flex";

export default {
  title: "Components/Forms and Inputs/InputCurrency/Web",
  component: InputCurrency,
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
} as ComponentMeta<typeof InputCurrency>;

const BasicTemplate: ComponentStory<typeof InputCurrency> = args => {
  return <InputCurrency {...args} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  align: undefined,
  defaultValue: undefined,
  description: "Price of a cheese pizza and a large soda at Pinucci's",
  disabled: false,
  inline: undefined,
  invalid: undefined,
  name: "price",
  placeholder: "Price in dollars",
  readonly: false,
  showMiniLabel: true,
  size: undefined,
};

export const Readonly = BasicTemplate.bind({});
Readonly.args = {
  defaultValue: 120.22,
  readonly: true,
};

const ExternalLabelTemplate: ComponentStory<typeof InputCurrency> = args => {
  return (
    <div>
      <FormFieldLabel external={true} htmlFor="ext-input">
        External label
      </FormFieldLabel>
      <InputCurrency id="ext-input" {...args} />
    </div>
  );
};

export const ExternalLabel = ExternalLabelTemplate.bind({});
ExternalLabel.args = {
  name: "name",
  showMiniLabel: false,
};

const FocusTemplate: ComponentStory<typeof InputCurrency> = args => {
  const inputCurrencyRef = useRef<InputCurrencyRef>(null);

  function toggleInputFocus(shouldFocus = true) {
    const action = shouldFocus ? "focus" : "blur";
    inputCurrencyRef.current?.[action]();
  }

  return (
    <Content>
      <InputCurrency {...args} value={5.0} ref={inputCurrencyRef} />
      <Button label="Focus input" onClick={() => toggleInputFocus(true)} />
      <br />
      <Button label="Blur input" onClick={() => toggleInputFocus(false)} />
    </Content>
  );
};

export const FocusAndBlur = FocusTemplate.bind({});
FocusAndBlur.args = {};

export const VersionComparison = () => {
  const [values, setValues] = React.useState({
    basic: 11.77,
    multiline: 11.77,
    error: 11.77,
    disabled: 11.77,
    readonly: 11.77,
    withToolbar: 11.77,
    prefix: 11.77,
    suffix: 11.77,
    both: 11.77,
    rightAlign: 11.77,
    centerAlign: 11.77,
    sizeSmall: 11.77,
    sizeLarge: 11.77,
    inline: 11.77,
    multilineResize: 11.77,
  });
  const [inline, setInline] = React.useState(false);
  const [invalid, setInvalid] = React.useState<boolean | undefined>(undefined);
  const [disabled, setDisabled] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [description, setDescription] = React.useState<string>("");

  const extraProps = {
    invalid,
    error: errorMessage,
    inline,
    disabled,
    description,
  };

  const handleChange = (field: keyof typeof values) => (value?: number) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const renderComponent = (
    title: string,
    props: Record<string, unknown>,
    field: keyof typeof values,
  ) => (
    <InputCurrency
      {...props}
      value={values[field]}
      onChange={handleChange(field)}
    />
  );

  return (
    <Content>
      {renderComponent(
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
      {renderComponent(
        "Readonly",
        {
          placeholder: "Readonly",
          ...extraProps,
          readonly: true,
        },
        "readonly",
      )}
      {renderComponent(
        "Right Aligned",
        {
          placeholder: "Right aligned text",
          align: "right",
          ...extraProps,
        },
        "rightAlign",
      )}

      {renderComponent(
        "Center Aligned",
        {
          placeholder: "Center aligned text",
          align: "center",
          ...extraProps,
        },
        "centerAlign",
      )}

      {renderComponent(
        "With Prefix",
        {
          placeholder: "Input with prefix",
          prefix: { label: "$" },
          ...extraProps,
        },
        "prefix",
      )}

      {renderComponent(
        "With Suffix",
        {
          placeholder: "Input with suffix",
          suffix: { label: "%" },
          ...extraProps,
          title: "this is a title",
        },
        "suffix",
      )}

      {renderComponent(
        "With Prefix and Suffix",
        {
          placeholder: "Input with both",
          prefix: { icon: "search" },
          suffix: { icon: "calendar" },
          ...extraProps,
        },
        "both",
      )}

      {renderComponent(
        "With Toolbar",
        {
          placeholder: "With toolbar",
          toolbar: toolbar,
          ...extraProps,
        },
        "withToolbar",
      )}

      {renderComponent(
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
      {renderComponent(
        "Size small",
        {
          placeholder: "With Size",
          size: "small",
          ...extraProps,
        },
        "sizeSmall",
      )}
      {renderComponent(
        "Size large",
        { placeholder: "With Size", size: "large", ...extraProps },
        "sizeLarge",
      )}
      <Grid>
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
      </Grid>
    </Content>
  );
};

const ControlledTemplate: ComponentStory<typeof InputCurrency> = args => {
  const [value, setValue] = useState<number>(11.77);

  return (
    <Box gap="base">
      <InputCurrency {...args} value={value} onChange={v => setValue(v)} />

      <Flex template={["shrink", "shrink", "shrink"]}>
        <Button label="Set to 11.77" onClick={() => setValue(11.77)} />
        <Button label="Add $1" onClick={() => setValue(v => v + 1)} />
        <Button
          label="Subtract $0.01"
          onClick={() => setValue(v => v - 0.01)}
        />
      </Flex>
    </Box>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  placeholder: "Hakunamatata",
};

const FormattingExamplesTemplate: ComponentStory<
  typeof InputCurrency
> = args => {
  const [value, setValue] = useState<number>(11.1337);
  const [formatOptions, setFormatOptions] = useState<Intl.NumberFormatOptions>({
    currency: "CAD",
    currencyDisplay: "code",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box gap="base">
      <InputCurrency
        {...args}
        value={value}
        onChange={v => setValue(v)}
        formatOptions={formatOptions}
      />

      <Flex template={["shrink", "shrink", "shrink"]} gap="small">
        <Button
          label="CAD"
          onClick={() =>
            setFormatOptions({ ...formatOptions, currency: "CAD" })
          }
        />
        <Button
          label="USD"
          onClick={() =>
            setFormatOptions({ ...formatOptions, currency: "USD" })
          }
        />
        <Button
          label="BGP"
          onClick={() =>
            setFormatOptions({ ...formatOptions, currency: "GBP" })
          }
        />
      </Flex>

      <Flex template={["shrink", "shrink", "shrink"]} gap="small">
        <Button
          label="Code Display"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              currencyDisplay: "code",
            })
          }
        />
        <Button
          label="Symbol Display"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              currencyDisplay: "symbol",
            })
          }
        />
        <Button
          label="Name Display"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              currencyDisplay: "name",
            })
          }
        />
      </Flex>

      <Flex template={["shrink", "shrink"]} gap="small">
        <Button
          label="2 Decimals"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
        <Button
          label="4 Decimals"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            })
          }
        />
      </Flex>
    </Box>
  );
};

export const FormattingExamples = FormattingExamplesTemplate.bind({});
FormattingExamples.args = {
  placeholder: "Hakunamatata",
  formatOptions: {
    currency: "CAD",
    currencyDisplay: "code",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  },
};
