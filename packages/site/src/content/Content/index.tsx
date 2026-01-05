import Content from "./Content.stories.mdx";
import Props from "./Content.props.json";
import MobileProps from "./Content.props-mobile.json";
import Notes from "./ContentNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `return (
      <div style={{ width: "100%" }}>
        <Content spacing={"base"}>
          <Heading level={6} element={"p"}>
            Base
          </Heading>
          <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
          <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
          <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
          <Content spacing={"small"}>
            <Heading level={6} element={"p"}>
              Small
            </Heading>
            <Box
              background={"base-blue--500"}
              height={16}
              radius={"base"}
            ></Box>
            <Box
              background={"base-blue--500"}
              height={16}
              radius={"base"}
            ></Box>
            <Box
              background={"base-blue--500"}
              height={16}
              radius={"base"}
            ></Box>
          </Content>
        </Content>
      </div>);`,
    mobileElement: `<Content direction={"vertical"}>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam
          neque quam nemo dolores illo eaque qui possimus consequuntur libero.
        </Text>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam
          neque quam nemo dolores illo eaque qui possimus consequuntur libero.
        </Text>
      </Content>`,
  },
  title: "Content",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-content--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
