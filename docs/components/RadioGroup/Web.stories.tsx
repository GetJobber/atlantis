import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RadioGroup, RadioOption } from "@jobber/components/RadioGroup";
import { Content } from "@jobber/components/Content";
import { Divider } from "@jobber/components/Divider";
import { Checkbox } from "@jobber/components/Checkbox";
import { Avatar } from "@jobber/components/Avatar";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Forms and Inputs/RadioGroup/Web",
  component: RadioGroup,
  subcomponents: { RadioOption },
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof RadioGroup>;

const BasicTemplate: ComponentStory<typeof RadioGroup> = args => {
  const [company, setCompany] = useState("apple");
  return (
    <RadioGroup
      {...args}
      onChange={(value: string) => setCompany(value)}
      value={company}
      ariaLabel="Companies"
    >
      <RadioOption value="apple" label="Apple" />
      <RadioOption value="google" label="Google" />
      <RadioOption value="microsoft" label="Microsoft" />
    </RadioGroup>
  );
};

const DisabledTemplate: ComponentStory<typeof RadioGroup> = () => {
  const [company, setCompany] = useState("apple");
  const [checked, setChecked] = useState(true);
  return (
    <Content spacing="large">
      <RadioGroup
        onChange={(value: string) => setCompany(value)}
        value={company}
        ariaLabel="Companies"
      >
        <RadioOption value="apple" label="Apple" />
        <RadioOption value="google" label="Google" />
        <RadioOption value="amazon" label="Amazon" disabled={true} />
        <RadioOption value="microsoft" label="Microsoft" disabled={!checked} />
      </RadioGroup>
      <Divider />
      <Checkbox
        checked={checked}
        label="Allow Microsoft"
        onChange={setChecked}
      />
    </Content>
  );
};

const DescriptionTemplate: ComponentStory<typeof RadioGroup> = () => {
  const [company, setCompany] = useState("apple");
  return (
    <RadioGroup
      onChange={(value: string) => setCompany(value)}
      value={company}
      ariaLabel="Companies"
    >
      <RadioOption
        value="apple"
        label="Apple"
        description="A delicious fruit that fends off doctors"
      />
      <RadioOption
        value="amazon"
        label="Amazon"
        description="The worlds largest rainforest"
      />
      <RadioOption
        value="google"
        label="Google"
        description="A search engine"
      />
    </RadioGroup>
  );
};

const RadioOptionWithChildrenTemplate: ComponentStory<
  typeof RadioGroup
> = () => {
  const [company, setPhoto] = useState("JBR");
  const users = [
    { name: "Jobber", initials: "JBR" },
    { name: "User 1", initials: "U1" },
    { name: "User 2", initials: "U2" },
    { name: "User 3", initials: "U3" },
    { name: "User 4", initials: "U4" },
  ];
  return (
    <>
      <Content>
        <Text>Select a user</Text>
        <RadioGroup
          onChange={(value: string) => setPhoto(value)}
          value={company}
          ariaLabel="Users"
        >
          {users.map(user => (
            <RadioOption value={user.name} key={user.name}>
              <Avatar initials={user.initials} name={user.name} />
            </RadioOption>
          ))}
        </RadioGroup>
      </Content>
    </>
  );
};

export const Basic = BasicTemplate.bind({});

export const Description = DescriptionTemplate.bind({});

export const Disabled = DisabledTemplate.bind({});

export const RadioOptionWithChildren = RadioOptionWithChildrenTemplate.bind({});
