import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AnimatedPresence } from "@jobber/components/AnimatedPresence";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Switch } from "@jobber/components/Switch";

export default {
  title: "Components/Utilities/AnimatedPresence/Web",
  component: AnimatedPresence,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof AnimatedPresence>;

const BasicTemplate: ComponentStory<typeof AnimatedPresence> = args => {
  const [switched, setSwitched] = useState(false);
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <Content>
      <Button
        icon={switched ? "arrowUp" : "arrowDown"}
        label={switched ? "Hide" : "Show"}
        iconOnRight
        onClick={() => setSwitched(!switched)}
      />

      <AnimatedPresence {...args}>
        {switched && (
          <Text variation="subdued">
            Oh, theres more text here for some fine print and such. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Doloremque omnis nobis
            totam dicta animi minus sequi quibusdam quisquam esse suscipit!
          </Text>
        )}

        <Card>
          <Content>
            <Flex template={["grow", "shrink"]}>
              <Text>Add me</Text>

              <Button
                icon={added ? "checkmark" : "add"}
                label={added ? "Added" : "Add"}
                iconOnRight
                onClick={() => setAdded(!added)}
              />
            </Flex>
          </Content>
        </Card>

        {switched && (
          <Content>
            <Flex template={["shrink", "shrink"]}>
              <Button label="Add" onClick={() => setCount(count + 2)} />
              <Button label="Remove" onClick={() => setCount(count - 2)} />
            </Flex>
            <AnimatedPresence {...args}>
              {[...Array(count)].map((_, i) => (
                <Card key={i}>
                  <Content>
                    <Flex template={["grow", "shrink"]}>
                      <Text>Card {i + 1}</Text>
                      <Switch />
                    </Flex>
                  </Content>
                </Card>
              ))}
            </AnimatedPresence>
          </Content>
        )}
      </AnimatedPresence>
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
