import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Option, Select } from "@jobber/components/Select";
import { Divider } from "@jobber/components/Divider";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Grid } from "@jobber/components/Grid";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Selections/Select/Web",
  component: Select,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Select": ["Select", "Option"],
        },
      },
    },
  },
} as ComponentMeta<typeof Select>;

const BasicTemplate: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Option value="tony">Tony</Option>
    <Option value="quincy">Quincy</Option>
    <Option value="peppa">Peppa Pig</Option>
  </Select>
);

const InlineTemplate: ComponentStory<typeof Select> = args => (
  <Flex template={["shrink", "shrink"]}>
    <p>My best Friend: </p>
    <Select {...args}>
      <Option value="tony">Tony</Option>
      <Option value="quincy">Quincy</Option>
      <Option value="peppa">Peppa Pig</Option>
    </Select>
  </Flex>
);

const SizesTemplate: ComponentStory<typeof Select> = args => {
  return (
    <Content>
      <Select size="small">
        <Option value="">Small</Option>
        <Option value="tony" disabled>
          Tony
        </Option>
        <Option value="steve">Steve</Option>
        <Option value="natasha">Natasha</Option>
      </Select>
      <Divider size="largest" />
      <Select {...args}>
        <Option value="">Default</Option>
        <Option value="tony" disabled>
          Tony
        </Option>
        <Option value="steve">Steve</Option>
        <Option value="natasha">Natasha</Option>
      </Select>
      <Divider size="largest" />
      <Select {...args} size="large">
        <Option value="">Large</Option>
        <Option value="tony" disabled>
          Tony
        </Option>
        <Option value="steve">Steve</Option>
        <Option value="natasha">Natasha</Option>
      </Select>
    </Content>
  );
};

const InitialValueTemplate: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Option value="tony">Tony</Option>
    <Option value="steve">Steve</Option>
    <Option value="natasha">Natasha</Option>
    <Option value="bob">Bob</Option>
  </Select>
);

const OnFocusAndBlurTemplate: ComponentStory<typeof Select> = args => (
  <Select
    {...args}
    onFocus={() => {
      console.log("I have been focused!");
    }}
    onBlur={() => console.log("I have been blurred!")}
  >
    <Option value="tony">Tony</Option>
    <Option value="steve">Steve</Option>
    <Option value="natasha">Natasha</Option>
    <Option value="bob">Bob</Option>
  </Select>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  placeholder: "My best friend",
};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  placeholder: "Pick a friend",
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  inline: true,
  size: "small",
};

export const InitialValue = InitialValueTemplate.bind({});
InitialValue.args = {
  placeholder: "Pick a friend",
  defaultValue: "bob",
};

export const Events = InitialValueTemplate.bind({});
Events.args = {
  onChange: (newValue: string) => {
    alert("You picked: " + newValue);
  },
};

export const OnFocusAndBlur = OnFocusAndBlurTemplate.bind({});
OnFocusAndBlur.args = {
  placeholder: "Pick a friend",
  defaultValue: "bob",
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
        <Select
          {...props}
          version={1}
          value={values[field]}
          onChange={handleChange(field)}
        >
          <Option value="tony">Tony</Option>
          <Option value="steve">Steve</Option>
          <Option value="natasha">Natasha</Option>
        </Select>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 6 }}>
        <Select
          {...props}
          version={2}
          value={values[field]}
          onChange={handleChange(field)}
        >
          <Option value="tony">Tony</Option>
          <Option value="steve">Steve</Option>
          <Option value="natasha">Natasha</Option>
        </Select>
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
          "Basic Select",
          {
            placeholder: "Select a hero",
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
            placeholder: "Select with prefix",
            prefix: { icon: "search" },
            ...extraProps,
          },
          "prefix",
        )}

        {renderBothVersions(
          "With Suffix",
          {
            placeholder: "Select with suffix",
            suffix: { icon: "sparkles" },
            ...extraProps,
          },
          "suffix",
        )}

        {renderBothVersions(
          "With Prefix and Suffix",
          {
            placeholder: "Select with both",
            prefix: { label: "Pre" },
            suffix: { label: "Suf" },
            ...extraProps,
          },
          "both",
        )}

        {renderBothVersions(
          "Size small",
          {
            placeholder: "Small select",
            size: "small",
            ...extraProps,
          },
          "sizeSmall",
        )}

        {renderBothVersions(
          "Size large",
          {
            placeholder: "Large select",
            size: "large",
            ...extraProps,
          },
          "sizeLarge",
        )}

        {renderBothVersions(
          "Loading",
          {
            placeholder: "Loading select",
            loading: true,
            ...extraProps,
          },
          "loading",
        )}

        {renderBothVersions(
          "Max Length",
          {
            placeholder: "Max length select",
            maxLength: 5,
            ...extraProps,
          },
          "maxLength",
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
            onClick={() => setError(error ? "" : "This is an error")}
          />
        </Grid.Cell>
      </Grid>
    </Content>
  );
};
