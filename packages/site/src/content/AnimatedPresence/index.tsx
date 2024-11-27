import {
  AnimatedPresence as AnimatedPresenceRoot,
  Button,
  Content,
  Flex,
  Text,
} from "@jobber/components";
import AnimatedPresenceContent from "@atlantis/docs/components/AnimatedPresence/AnimatedPresence.stories.mdx";
import { PropsWithChildren, useState } from "react";
import Props from "./AnimatedPresence.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export const AnimatedPresence = (props: PropsWithChildren) => {
  const [switched, setSwitched] = useState(false);

  return (
    <Content>
      <Button
        label={switched ? "Switched" : "Initial"}
        onClick={() => setSwitched(!switched)}
      />
      <AnimatedPresenceRoot {...props}>
        {switched && (
          <Content>
            <Flex template={["grow", "shrink"]}>
              <Text>Additional Content!</Text>
              <Text>Additional Content 2!</Text>
            </Flex>
          </Content>
        )}
        {switched && (
          <Content>
            <Flex template={["grow", "shrink"]}>
              <Text>Additional Content!</Text>
              <Text>Additional Content 2!</Text>
            </Flex>
          </Content>
        )}
      </AnimatedPresenceRoot>
    </Content>
  );
};

export default {
  content: () => <AnimatedPresenceContent />,
  props: Props,
  component: {
    element: AnimatedPresence,
    defaultProps: {
      initial: true,
      transition: "fromLeftToRight",
    },
  },
  title: "AnimatedPresence",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-utilities-animatedpresence--docs",
      ),
    },
  ],
} as const satisfies ContentExport;
