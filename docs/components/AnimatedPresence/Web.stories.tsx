import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AnimatedPresence } from "@jobber/components/AnimatedPresence";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";

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
  const [count, setCount] = useState(2);

  return (
    <Flex template={["grow", "grow"]} align="start">
      <Content>
        <Button label="Add" onClick={() => setCount(count + 2)} />
        <Button label="Remove" onClick={() => setCount(count - 2)} />
        <AnimatedPresence {...args}>
          {[...Array(count)].map((_, i) => (
            <Card key={i}>
              <Content>
                <Text>Card {i + 1}</Text>
              </Content>
            </Card>
          ))}
        </AnimatedPresence>
      </Content>

      <Content>
        <Button
          icon={switched ? "arrowUp" : "arrowDown"}
          label={switched ? "Hide" : "Show"}
          iconOnRight
          onClick={() => setSwitched(!switched)}
        />
        <AnimatedPresence {...args}>
          {switched && (
            <Card>
              <Content>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores nemo recusandae quae autem nisi eum veniam blanditiis
                  aliquam quo expedita necessitatibus, est provident minus unde
                  cupiditate reprehenderit.
                </Text>
              </Content>
            </Card>
          )}

          <Card>
            <Content>
              <Text>Something in the middle</Text>
            </Content>
          </Card>

          {switched && <Text>Oh, theres more</Text>}
        </AnimatedPresence>
      </Content>
    </Flex>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {};
