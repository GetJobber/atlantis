import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checkbox } from "@jobber/components/Checkbox";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Selections/Checkbox/Web",
  component: Checkbox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Checkbox>;

const BasicTemplate: ComponentStory<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(true);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "Save card for future use",
};

const IndeterminateTemplate: ComponentStory<typeof Checkbox> = () => {
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

export const Indeterminate = IndeterminateTemplate.bind({});
Indeterminate.args = {};

export const WithDescription = BasicTemplate.bind({});
WithDescription.args = {
  label: "Save card for future use",
  description: "If you save your card now, you'll never need to save it again.",
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  label: "Subscribe on marketing emails",
  disabled: true,
  defaultChecked: true,
};

const ChildrenAsLabelTemplate: ComponentStory<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox {...args} checked={checked} onChange={setChecked}>
      <Text>
        I agree to the
        <button
          style={{
            color: "var(--color-interactive)",
            fontFamily: "inherit",
            fontSize: "inherit",
            padding: "0",
            textDecoration: "underline",
            background: "transparent",
            border: "none",
          }}
          onClick={() => alert("Open terms and services")}
        >
          terms of service
        </button>
      </Text>
    </Checkbox>
  );
};

export const ChildrenAsLabel = ChildrenAsLabelTemplate.bind({});
ChildrenAsLabel.args = {};
