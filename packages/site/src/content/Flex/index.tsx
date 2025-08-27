import Content from "./Flex.stories.mdx";
import Props from "./Flex.props.json";
import MobileProps from "./Flex.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
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
    mobileElement: `<Flex template={["grow", "shrink"]} align={"center"}>
      <Flex align={"flex-start"} template={["shrink", "grow"]}>
        <Icon name="quote" />
          <Flex template={["grow", "shrink"]}>
            <Text emphasis="strong">Dylan Tec</Text>
            <StatusLabel label="Success" status="success" />
          </Flex>
          <Text>Sep 03 | $100 | Quote #93</Text>
      </Flex>
      <Icon name="arrowRight" />
    </Flex>`,
  },
  title: "Flex",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-flex--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
