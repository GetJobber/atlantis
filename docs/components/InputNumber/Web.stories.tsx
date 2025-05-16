import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumber, InputNumberRef } from "@jobber/components/InputNumber";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";
import { Grid } from "@jobber/components/Grid";
import { Link } from "@jobber/components/Link";
import { Flex } from "@jobber/components/Flex";

export default {
  title: "Components/Forms and Inputs/InputNumber/Web",
  component: InputNumber,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof InputNumber>;

const BasicTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "age",
  placeholder: "Age in years",
  value: 37,
};

export const Invalid = BasicTemplate.bind({});
Invalid.args = {
  value: 1.1,
  invalid: true,
  placeholder: "Give a whole number",
};

const SizesTemplate: ComponentStory<typeof InputNumber> = () => {
  return (
    <Content>
      <InputNumber size="small" value={100} />
      <InputNumber size="large" value={1000} />
    </Content>
  );
};

export const Sizes = SizesTemplate.bind({});

const InlineTemplate: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState(args.value);

  return (
    <Text>
      Follow-up after
      <InputNumber
        {...args}
        value={value}
        onChange={(newValue: number) => setValue(newValue)}
      />
      days
    </Text>
  );
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  size: "small",
  value: 2,
  inline: true,
  maxLength: 2,
  align: "center",
};

const FocusTemplate: ComponentStory<typeof InputNumber> = args => {
  const inputNumberRef = useRef<InputNumberRef>(null);

  function toggleInputFocus(shouldFocus = true) {
    const action = shouldFocus ? "focus" : "blur";
    inputNumberRef.current?.[action]();
  }

  return (
    <Content>
      <InputNumber {...args} value={5.0} ref={inputNumberRef} />
      <Button label="Focus input" onClick={() => toggleInputFocus(true)} />
      <br />
      <Button label="Blur input" onClick={() => toggleInputFocus(false)} />
    </Content>
  );
};

export const FocusAndBlur = FocusTemplate.bind({});
FocusAndBlur.args = {};

const ReadonlyTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const Readonly = ReadonlyTemplate.bind({});
Readonly.args = {
  placeholder: "Your pin number",
  value: 12345,
  readonly: true,
};

const DisabledTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  placeholder: "SIN number",
  value: 12345,
  disabled: true,
};

const PrefixAndSuffixTemplate: ComponentStory<typeof InputNumber> = args => {
  return <InputNumber {...args} />;
};

export const PrefixAndSuffix = PrefixAndSuffixTemplate.bind({});
PrefixAndSuffix.args = {
  suffix: { label: ".00" },
  prefix: { label: "$", icon: "invoice" },
  placeholder: "Invoice total",
  defaultValue: "100000",
};

const ControlledTemplate: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState<number>(args.value ?? 11.77);

  return (
    <Box gap="base">
      <InputNumber
        {...args}
        version={2}
        value={value}
        onChange={v => setValue(v)}
      />

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
  value: 10.1337,
  placeholder: "Enter a number",
  prefix: { label: "$", icon: "invoice" },
  suffix: { label: ".00" },
};

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

  const handleChange = (field: keyof typeof values) => (value: number) => {
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
        <InputNumber
          {...props}
          version={1}
          value={values[field]}
          onChange={handleChange(field)}
        />
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <InputNumber
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
            // readonly: true,
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
      </div>
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

const FormattingExamplesTemplate: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState<number>(11.1337);
  const [formatOptions, setFormatOptions] = useState<Intl.NumberFormatOptions>({
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  return (
    <Box gap="base">
      <InputNumber
        {...args}
        value={value}
        version={2}
        onChange={v => setValue(v)}
        formatOptions={formatOptions}
      />

      <Flex template={["shrink", "shrink", "shrink"]} gap="small">
        <Button
          label="Decimal (default)"
          onClick={() =>
            setFormatOptions({ ...formatOptions, style: "decimal" })
          }
        />
        <Button
          label="Percent"
          onClick={() =>
            setFormatOptions({ ...formatOptions, style: "percent" })
          }
        />
        <Button
          label="Unit"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              style: "unit",
              unit: "celsius",
              unitDisplay: "long",
            })
          }
        />
      </Flex>

      <Flex template={["shrink", "shrink", "shrink"]} gap="small">
        <Button
          label="Liter Units"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              style: "unit",
              unit: "liter",
              unitDisplay: "short",
            })
          }
        />
        <Button
          label="Km Units (long display)"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              style: "unit",
              unit: "kilometer",
              unitDisplay: "long",
            })
          }
        />
        <Button
          label="GB Units (narrow display)"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              style: "unit",
              unit: "gigabyte",
              unitDisplay: "narrow",
            })
          }
        />
      </Flex>

      <Flex template={["shrink", "shrink", "shrink"]} gap="small">
        <Button
          label="2-4 Decimals"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              maximumFractionDigits: 4,
              minimumFractionDigits: 2,
            })
          }
        />
        <Button
          label="2 Decimals always"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }
        />
        <Button
          label="No Decimals"
          onClick={() =>
            setFormatOptions({
              ...formatOptions,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          }
        />
      </Flex>
      <Link url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat">
        Learn more about Intl.NumberFormat options
      </Link>
    </Box>
  );
};

export const FormattingExamples_v2Only = FormattingExamplesTemplate.bind({});
FormattingExamples_v2Only.args = {
  placeholder: "Number with formatting",
  formatOptions: {
    maximumFractionDigits: 2,
  },
  description: "Use Intl.NumberFormat for detailed options",
};
