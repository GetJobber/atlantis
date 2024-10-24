import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ListBox } from "@jobber/components/ListBox";
import { IconNames } from "@jobber/design";
import { Icon } from "@jobber/components/Icon";

export default {
  title: "Components/Category/ListBox/Web",
  component: ListBox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof ListBox>;

const BasicTemplate: ComponentStory<typeof ListBox> = args => {
  const [selected, setSelected] = useState<string[]>([]);
  const options: { value: string; icon: IconNames }[] = [
    { value: "truck", icon: "truck" },
    { value: "job", icon: "job" },
    { value: "quote", icon: "quote" },
  ];

  return (
    <div>
      <h1>My Selection is: {selected}</h1>

      <ListBox onSelectionChange={setSelected} selectedKeys={["truck"]}>
        {options.map(option => (
          <ListBox.Item key={option.value} value={option.value}>
            <span>{option.value}</span>
            <Icon name={option.icon} />
          </ListBox.Item>
        ))}
      </ListBox>
    </div>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
