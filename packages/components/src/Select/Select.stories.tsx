import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Option, Select } from "@jobber/components/Select";
import type {
  SelectLegacyProps,
  SelectRebuiltProps,
} from "@jobber/components/Select";
import { Divider } from "@jobber/components/Divider";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Grid } from "@jobber/components/Grid";
import { Button } from "@jobber/components/Button";

type SelectStoryArgs = Pick<
  React.ComponentProps<typeof Select>,
  "placeholder" | "inline" | "size" | "defaultValue"
>;

const meta = {
  title: "Components/Selections/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<SelectStoryArgs>;
interface SelectComparisonValues {
  basic: string;
  rightAlign: string;
  centerAlign: string;
  prefix: string;
  suffix: string;
  both: string;
  sizeSmall: string;
  sizeLarge: string;
  maxLength: string;
  optionGroups: string;
}
type SelectComparisonField = keyof SelectComparisonValues;
interface SelectComparisonProps
  extends Partial<
    Pick<
      SelectLegacyProps,
      | "align"
      | "description"
      | "disabled"
      | "inline"
      | "invalid"
      | "maxLength"
      | "placeholder"
      | "prefix"
      | "size"
      | "suffix"
    >
  > {
  UNSAFE_experimentalStyles?: SelectRebuiltProps["UNSAFE_experimentalStyles"];
}

export const Basic: Story = {
  render: args => (
    <Select placeholder={args?.placeholder}>
      <Option value="alice">Alice</Option>
      <Option value="bob">Bob</Option>
      <Option value="charlie">Charlie</Option>
    </Select>
  ),
  args: {
    placeholder: "My best friend",
  },
};

export const Sizes: Story = {
  render: args => {
    return (
      <Content>
        <Select size="small">
          <Option value="">Small</Option>
          <Option value="alice" disabled>
            Alice
          </Option>
          <Option value="bob">Bob</Option>
          <Option value="charlie">Charlie</Option>
        </Select>
        <Divider size="largest" />
        <Select placeholder={args?.placeholder ?? "Pick a friend"}>
          <Option value="">Default</Option>
          <Option value="alice" disabled>
            Alice
          </Option>
          <Option value="bob">Bob</Option>
          <Option value="charlie">Charlie</Option>
        </Select>
        <Divider size="largest" />
        <Select size="large" placeholder={args?.placeholder ?? "Pick a friend"}>
          <Option value="">Large</Option>
          <Option value="alice" disabled>
            Alice
          </Option>
          <Option value="bob">Bob</Option>
          <Option value="charlie">Charlie</Option>
        </Select>
      </Content>
    );
  },
  args: {
    placeholder: "Pick a friend",
  },
};

export const Inline: Story = {
  render: args => (
    <Flex template={["shrink", "shrink"]}>
      <p>My best Friend: </p>
      <Select inline={args?.inline ?? true} size={args?.size ?? "small"}>
        <Option value="alice">Alice</Option>
        <Option value="bob">Bob</Option>
        <Option value="charlie">Charlie</Option>
      </Select>
    </Flex>
  ),
  args: {
    inline: true,
    size: "small",
  },
};

export const InitialValue: Story = {
  render: args => (
    <Select
      defaultValue={args?.defaultValue ?? "bob"}
      placeholder={args?.placeholder ?? "Pick a friend"}
    >
      <Option value="alice">Alice</Option>
      <Option value="bob">Bob</Option>
      <Option value="charlie">Charlie</Option>
      <Option value="diana">Diana</Option>
    </Select>
  ),
  args: {
    placeholder: "Pick a friend",
    defaultValue: "bob",
  },
};

export const Events: Story = {
  render: () => (
    <Select
      onChange={(newValue: string) => {
        alert("You picked: " + newValue);
      }}
    >
      <Option value="alice">Alice</Option>
      <Option value="bob">Bob</Option>
      <Option value="charlie">Charlie</Option>
      <Option value="diana">Diana</Option>
    </Select>
  ),
};

export const OnFocusAndBlur: Story = {
  render: args => (
    <Select
      defaultValue={args?.defaultValue ?? "bob"}
      placeholder={args?.placeholder ?? "Pick a friend"}
      onFocus={() => {
        console.log("I have been focused!");
      }}
      onBlur={() => console.log("I have been blurred!")}
    >
      <Option value="alice">Alice</Option>
      <Option value="bob">Bob</Option>
      <Option value="charlie">Charlie</Option>
      <Option value="diana">Diana</Option>
    </Select>
  ),
  args: {
    placeholder: "Pick a friend",
    defaultValue: "bob",
  },
};

export const BaseOptionGroups: Story = {
  render: () => (
    <Select placeholder="Select an option" version={1}>
      <Select.OptionGroup label="Team A">
        <Select.Option value="alice">Alice</Select.Option>
        <Select.Option value="bob">Bob</Select.Option>
        <Select.Option value="charlie">Charlie</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="Team B">
        <Select.Option value="diana">Diana</Select.Option>
        <Select.Option value="evan">Evan</Select.Option>
        <Select.Option value="frank">Frank</Select.Option>
      </Select.OptionGroup>
    </Select>
  ),
};

export const CustomOptionGroups: Story = {
  render: () => (
    <Select
      placeholder="Select an option"
      version={2}
      UNSAFE_experimentalStyles={true}
    >
      <Select.OptionGroup label="Team A">
        <Select.Option value="alice">Alice</Select.Option>
        <Select.Option value="bob">Bob</Select.Option>
        <Select.Option value="charlie">Charlie</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="Team B">
        <Select.Option value="diana">Diana</Select.Option>
        <Select.Option value="evan">Evan</Select.Option>
        <Select.Option value="frank">Frank</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="Team C">
        <Select.Option value="grace">Grace</Select.Option>
        <Select.Option value="hector">Hector</Select.Option>
        <Select.Option value="isabel">Isabel</Select.Option>
      </Select.OptionGroup>
    </Select>
  ),
};

export const CustomOptionGroupSizes: Story = {
  render: () => {
    return (
      <Content>
        <Select
          size="small"
          placeholder="Small with groups"
          version={2}
          UNSAFE_experimentalStyles
        >
          <Select.OptionGroup label="Team A">
            <Select.Option value="alice">Alice</Select.Option>
            <Select.Option value="bob">Bob</Select.Option>
          </Select.OptionGroup>
          <Select.OptionGroup label="Team B">
            <Select.Option value="charlie">Charlie</Select.Option>
            <Select.Option value="diana">Diana</Select.Option>
          </Select.OptionGroup>
        </Select>
        <Divider size="largest" />
        <Select
          placeholder="Default with groups"
          version={2}
          UNSAFE_experimentalStyles
        >
          <Select.OptionGroup label="Team A">
            <Select.Option value="alice">Alice</Select.Option>
            <Select.Option value="bob">Bob</Select.Option>
          </Select.OptionGroup>
          <Select.OptionGroup label="Team B">
            <Select.Option value="charlie">Charlie</Select.Option>
            <Select.Option value="diana">Diana</Select.Option>
          </Select.OptionGroup>
        </Select>
        <Divider size="largest" />
        <Select
          size="large"
          placeholder="Large with groups"
          version={2}
          UNSAFE_experimentalStyles
        >
          <Select.OptionGroup label="Team A">
            <Select.Option value="alice">Alice</Select.Option>
            <Select.Option value="bob">Bob</Select.Option>
          </Select.OptionGroup>
          <Select.OptionGroup label="Team B">
            <Select.Option value="charlie">Charlie</Select.Option>
            <Select.Option value="diana">Diana</Select.Option>
          </Select.OptionGroup>
        </Select>
      </Content>
    );
  },
};

export const CustomOptionGroupDisabled: Story = {
  render: () => (
    <Select
      version={2}
      UNSAFE_experimentalStyles
      placeholder="Select an option"
    >
      <Select.OptionGroup label="Available Items">
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="Unavailable Items" disabled>
        <Select.Option value="option3">Option 3</Select.Option>
        <Select.Option value="option4">Option 4</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="More Items">
        <Select.Option value="option5">Option 5</Select.Option>
        <Select.Option value="option6">Option 6</Select.Option>
      </Select.OptionGroup>
    </Select>
  ),
};

export const VersionComparison: Story = {
  render: () => {
    const [values, setValues] = useState<SelectComparisonValues>({
      basic: "",
      rightAlign: "",
      centerAlign: "",
      prefix: "",
      suffix: "",
      both: "",
      sizeSmall: "",
      sizeLarge: "",
      maxLength: "",
      optionGroups: "",
    });

    const [inline, setInline] = useState(false);
    const [invalid, setInvalid] = useState<boolean | undefined>(undefined);
    const [disabled, setDisabled] = useState(false);
    const [description, setDescription] = useState("");

    const extraProps = {
      invalid,
      inline,
      disabled,
      description,
    };

    const handleChange =
      (field: SelectComparisonField) =>
      (value?: string | number | boolean | Date) => {
        setValues(prev => ({ ...prev, [field]: String(value ?? "") }));
      };

    const renderBothVersions = (
      title: string,
      props: SelectComparisonProps,
      field: SelectComparisonField,
    ) => {
      const { UNSAFE_experimentalStyles, ...sharedProps } = props;

      return (
        <Grid>
          <Grid.Cell size={{ xs: 12 }}>
            <h3>{title}</h3>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Select
              {...sharedProps}
              version={1}
              value={values[field]}
              onChange={handleChange(field)}
            >
              <Option value="alice">Alice</Option>
              <Option value="bob">Bob</Option>
              <Option value="charlie">Charlie</Option>
            </Select>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Select
              {...sharedProps}
              version={2}
              value={values[field]}
              onChange={handleChange(field)}
              UNSAFE_experimentalStyles={UNSAFE_experimentalStyles}
            >
              <Option value="alice">Alice</Option>
              <Option value="bob">Bob</Option>
              <Option value="charlie">Charlie</Option>
            </Select>
          </Grid.Cell>
        </Grid>
      );
    };

    const renderBothVersionsWithGroups = (
      title: string,
      props: SelectComparisonProps,
      field: SelectComparisonField,
    ) => {
      const { UNSAFE_experimentalStyles, ...sharedProps } = props;

      return (
        <Grid>
          <Grid.Cell size={{ xs: 12 }}>
            <h3>{title}</h3>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Select
              {...sharedProps}
              version={1}
              value={values[field]}
              onChange={handleChange(field)}
            >
              <Select.OptionGroup label="Group A">
                <Select.Option value="alice">Alice</Select.Option>
                <Select.Option value="bob">Bob</Select.Option>
              </Select.OptionGroup>
              <Select.OptionGroup label="Group B">
                <Select.Option value="charlie">Charlie</Select.Option>
                <Select.Option value="diana">Diana</Select.Option>
              </Select.OptionGroup>
            </Select>
          </Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>
            <Select
              {...sharedProps}
              version={2}
              value={values[field]}
              onChange={handleChange(field)}
              UNSAFE_experimentalStyles={UNSAFE_experimentalStyles}
            >
              <Select.OptionGroup label="Group A">
                <Select.Option value="alice">Alice</Select.Option>
                <Select.Option value="bob">Bob</Select.Option>
              </Select.OptionGroup>
              <Select.OptionGroup label="Group B">
                <Select.Option value="charlie">Charlie</Select.Option>
                <Select.Option value="diana">Diana</Select.Option>
              </Select.OptionGroup>
            </Select>
          </Grid.Cell>
        </Grid>
      );
    };

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
              placeholder: "Select an option",
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
            "Max Length",
            {
              placeholder: "Max length select",
              maxLength: 5,
              ...extraProps,
            },
            "maxLength",
          )}

          {renderBothVersionsWithGroups(
            "Grouped",
            {
              placeholder: "Grouped",
              ...extraProps,
            },
            "optionGroups",
          )}

          {renderBothVersions(
            "With experimental styles",
            {
              placeholder: "Experimental styles",
              UNSAFE_experimentalStyles: true,
              ...extraProps,
            },
            "basic",
          )}

          {renderBothVersionsWithGroups(
            "Grouped with experimental styles",
            {
              placeholder: "Grouped with experimental styles",
              UNSAFE_experimentalStyles: true,
              ...extraProps,
            },
            "optionGroups",
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
        </Grid>
      </Content>
    );
  },
};
