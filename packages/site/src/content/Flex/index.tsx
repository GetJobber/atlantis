import Content from "@atlantis/docs/components/Flex/Flex.stories.mdx";
import Props from "./Flex.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Flex template={["grow", "shrink"]}>
      <Flex align="start" template={["shrink", "grow"]}>
        <Icon name="quote" />
        <Content spacing="small">
          <Flex template={["grow", "shrink"]}>
            <Emphasis variation="bold">Dylan Tec</Emphasis>
            <StatusLabel label="Success" status="success" />
          </Flex>
          <Text>Sep 03 | $100 | Quote #93</Text>
        </Content>
      </Flex>
      <Icon name="arrowRight" />
    </Flex>`,
  },
  title: "Flex",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Flex-web--docs",
    },
  ],
} as const satisfies ContentExport;
