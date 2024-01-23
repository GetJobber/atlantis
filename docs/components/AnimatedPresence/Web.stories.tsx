import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  AnimatedPresence,
  AnimatedPresenceTransitions,
} from "@jobber/components/AnimatedPresence";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Divider } from "@jobber/components/Divider";
import { Heading } from "@jobber/components/Heading";
import { AnimatedSwitcher } from "@jobber/components/AnimatedSwitcher";

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

  return (
    <Content>
      <Flex template={["grow", "shrink"]}>
        <Heading level={2}>Checkout</Heading>
        <AnimatedSwitcher
          switched={switched}
          initialChild={
            <Button
              icon={"arrowDown"}
              iconOnRight={true}
              label={"View details"}
              type="secondary"
              onClick={() => setSwitched(!switched)}
            />
          }
          switchTo={
            <Button
              icon={"arrowUp"}
              iconOnRight={true}
              label={"Hide details"}
              onClick={() => setSwitched(!switched)}
            />
          }
        />
      </Flex>
      <AnimatedPresence {...args}>
        {switched && (
          <Content>
            <Flex template={["grow", "shrink"]}>
              <Text>Monthly subscription</Text>
              <Text>12 &#x78; $149.00</Text>
            </Flex>
            <Divider />
            <Flex template={["grow", "shrink"]}>
              <Text>Tax</Text>
              <Text>$89.40</Text>
            </Flex>
            <Divider size="large" />
          </Content>
        )}

        <Heading level={4}>
          <Flex template={["grow", "shrink"]}>
            <span>Total</span>
            <span>$1,877.40/year</span>
          </Flex>
        </Heading>

        {switched && (
          <Content>
            <Divider />
            <Text variation="subdued" size="small">
              You will be charged something. By continuing, you agree to our
              terms and conditions.
            </Text>
          </Content>
        )}
      </AnimatedPresence>
    </Content>
  );
};

const ListTemplate: ComponentStory<typeof AnimatedPresence> = args => {
  const [count, setCount] = useState(12);

  return (
    <Content>
      <Flex template={["shrink", "shrink"]}>
        <Button label="Add" onClick={() => setCount(count + 3)} />
        <Button
          label="Remove"
          onClick={() => setCount(count - 3)}
          disabled={count < 1}
        />
      </Flex>

      <Flex template={["grow", "grow", "grow"]} align="start">
        <AnimatedPresence {...args}>
          {[...Array(count)].map((_, i) => (
            <Card key={i}>
              <Content>
                <Text>Card {i + 1}</Text>
              </Content>
            </Card>
          ))}
        </AnimatedPresence>
      </Flex>
    </Content>
  );
};

const StepperTemplate: ComponentStory<typeof AnimatedPresence> = args => {
  const [step, setStep] = useState(1);
  const [transition, setTransition] =
    useState<AnimatedPresenceTransitions>("fromLeftToRight");

  return (
    <Content>
      <Flex template={["shrink", "shrink"]}>
        <Button
          label="Previous"
          disabled={step === 1}
          onClick={() => {
            setTransition("fromLeftToRight");
            // wait a bit before moving pages
            setTimeout(() => setStep(step - 1), 0);
          }}
        />
        <Button
          label="Next"
          disabled={step === 3}
          onClick={() => {
            setTransition("fromRightToLeft");
            // wait a bit before moving pages
            setTimeout(() => setStep(step + 1), 0);
          }}
        />
      </Flex>

      <AnimatedPresence {...args} transition={transition}>
        {step === 1 && (
          <Card>
            <Content>
              <Text>Step 1</Text>
            </Content>
          </Card>
        )}
        {step === 2 && (
          <Card>
            <Content>
              <Text>Step 2</Text>
            </Content>
          </Card>
        )}
        {step === 3 && (
          <Card>
            <Content>
              <Text>Step 3</Text>
            </Content>
          </Card>
        )}
      </AnimatedPresence>
    </Content>
  );
};

export const Basic = BasicTemplate.bind({});

export const List = ListTemplate.bind({});
List.args = {
  initial: true,
};

export const Stepper = StepperTemplate.bind({});
Stepper.args = {
  transition: "fromLeftToRight",
  exitBeforeEnter: true,
};
Stepper.parameters = {
  previewTabs: {
    code: {
      hidden: false,
      extraImports: {
        "@jobber/components/AnimatedPresence": [
          "AnimatedPresence",
          "AnimatedPresenceTransitions",
        ],
      },
    },
  },
};
