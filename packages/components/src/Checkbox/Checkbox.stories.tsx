import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@jobber/components/Text";
import { Link } from "@jobber/components/Link";
import { Checkbox } from "@jobber/components/Checkbox";

const meta = {
  title: "Components/Selections/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => {
  const [checked, setChecked] = useState(true);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    label: "Save card for future use",
    name: "save-card",
  },
};

const Invalid_v2Template = (args: Story["args"]) => {
  const [checked, setChecked] = useState(true);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Invalid_v2: Story = {
  render: Invalid_v2Template,
  args: {
    label: "Invalid checkbox (requires version 2 prop)",
    invalid: true,
    indeterminate: false,
    disabled: false,
    version: 2,
  },
};

const IndeterminateTemplate = () => {
  const [items, setItems] = useState([true, false, false]);

  return (
    <>
      <Checkbox
        label="Select All"
        checked={!items.includes(false)}
        onChange={toggleAll}
        indeterminate={items.includes(false) && items.includes(true)}
      />
      <ul>
        {items.map((value, index) => (
          <li key={index}>
            <Checkbox
              label={`Item ${index}`}
              checked={value}
              onChange={toggleIndex(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );

  function toggleIndex(index: number) {
    return (newValue: boolean) => {
      const updatedItems = Array.from(items);
      updatedItems[index] = newValue;
      setItems(updatedItems);
    };
  }

  function toggleAll(newValue: boolean) {
    setItems(Array(items.length).fill(newValue));
  }
};

export const Indeterminate: Story = {
  render: IndeterminateTemplate,
  args: {},
};

export const WithDescription: Story = {
  render: BasicTemplate,
  args: {
    label: "Save card for future use",
    description:
      "If you save your card now, you'll never need to save it again.",
  },
};

export const Disabled: Story = {
  render: BasicTemplate,
  args: {
    label: "Subscribe on marketing emails",
    disabled: true,
    defaultChecked: true,
  },
};

const ChildrenAsLabelTemplate = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={setChecked}>
      <Text>
        I agree to the{" "}
        <Link url="https://getjobber.com/terms-of-service/" external>
          terms of service
        </Link>
      </Text>
    </Checkbox>
  );
};

export const ChildrenAsLabel: Story = {
  render: ChildrenAsLabelTemplate,
  args: {},
};
