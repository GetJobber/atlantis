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

const ExitBehaviorTemplate: ComponentStory<typeof AnimatedPresence> = () => {
  const [activeTab, setActiveTab] = useState<"red" | "green" | "blue">("red");

  const tabs = [
    { id: "red" as const, label: "Red", color: "#fee2e2" },
    { id: "green" as const, label: "Green", color: "#dcfce7" },
    { id: "blue" as const, label: "Blue", color: "#dbeafe" },
  ];

  const tabContent = {
    red: (
      <div
        key="red"
        style={{
          backgroundColor: "#fee2e2",
          padding: 24,
          borderRadius: 8,
          minHeight: 150,
        }}
      >
        <Heading level={3}>Red Panel</Heading>
        <Text>
          This is the red content panel with some text to give it height.
        </Text>
      </div>
    ),
    green: (
      <div
        key="green"
        style={{
          backgroundColor: "#dcfce7",
          padding: 24,
          borderRadius: 8,
          minHeight: 200,
        }}
      >
        <Heading level={3}>Green Panel</Heading>
        <Text>
          This is the green content panel. It&apos;s intentionally taller to
          show how different exit behaviors handle height changes during
          transitions.
        </Text>
        <Text>Extra line for more height.</Text>
      </div>
    ),
    blue: (
      <div
        key="blue"
        style={{
          backgroundColor: "#dbeafe",
          padding: 24,
          borderRadius: 8,
          minHeight: 120,
        }}
      >
        <Heading level={3}>Blue Panel</Heading>
        <Text>This is the blue content panel. It&apos;s the shortest one.</Text>
      </div>
    ),
  };

  return (
    <Content>
      <Text>
        Compare how the three exit behaviors handle the same tab switch. Watch
        for layout shifts, overlap, and timing differences.
      </Text>

      <Flex template={["shrink", "shrink", "shrink"]} gap="small">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            label={tab.label}
            type={activeTab === tab.id ? "primary" : "secondary"}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </Flex>

      <Divider size="large" />

      <Flex template={["grow", "grow", "grow"]} align="start" gap="base">
        <Content>
          <Heading level={4}>overlap</Heading>
          <Text size="small" variation="subdued">
            Both visible during transition, both in layout flow
          </Text>
          <div style={{ position: "relative", minHeight: 200 }}>
            <AnimatedPresence
              timing="timing-slowest"
              transition="fromBottom"
              exitBehavior="overlap"
              initial={false}
            >
              {tabContent[activeTab]}
            </AnimatedPresence>
          </div>
        </Content>

        <Content>
          <Heading level={4}>replace</Heading>
          <Text size="small" variation="subdued">
            Exit removed from flow, enter takes its place immediately
          </Text>
          <div style={{ position: "relative", minHeight: 200 }}>
            <AnimatedPresence
              timing="timing-slowest"
              transition="fromBottom"
              exitBehavior="replace"
              initial={false}
            >
              {tabContent[activeTab]}
            </AnimatedPresence>
          </div>
        </Content>

        <Content>
          <Heading level={4}>sequential</Heading>
          <Text size="small" variation="subdued">
            Exit completes before enter begins
          </Text>
          <div style={{ position: "relative", minHeight: 200 }}>
            <AnimatedPresence
              timing="timing-slowest"
              transition="fromBottom"
              exitBehavior="sequential"
              initial={false}
            >
              {tabContent[activeTab]}
            </AnimatedPresence>
          </div>
        </Content>
      </Flex>
    </Content>
  );
};

export const ExitBehavior = ExitBehaviorTemplate.bind({});
ExitBehavior.parameters = {
  previewTabs: {
    code: {
      hidden: false,
    },
  },
};
