import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "@jobber/components/Text";
import { Link } from "@jobber/components/Link";
import { Checkbox } from "@jobber/components/Checkbox";

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
  name: "save-card",
};

const Invalid_v2Template: ComponentStory<typeof Checkbox> = args => {
  const [checked, setChecked] = useState(true);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Invalid_v2 = Invalid_v2Template.bind({});
Invalid_v2.args = {
  label: "Invalid checkbox (requires version 2 prop)",
  invalid: true,
  indeterminate: false,
  disabled: false,
  version: 2,
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
        I agree to the{" "}
        <Link url="https://getjobber.com/terms-of-service/" external>
          terms of service
        </Link>
      </Text>
    </Checkbox>
  );
};

export const ChildrenAsLabel = ChildrenAsLabelTemplate.bind({});
ChildrenAsLabel.args = {};
