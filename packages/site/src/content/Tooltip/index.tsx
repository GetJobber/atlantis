import Content from "./Tooltip.stories.mdx";
import Props from "./Tooltip.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Flex gap="large" template={["shrink", "shrink"]}>
      <Tooltip message={"'tis a button"}>
        <Button label="Hover on Me" />
      </Tooltip>
      <Tooltip message={"'tis a button"}>
        <Button label="Hover on Me Too" />
      </Tooltip>
    </Flex>`,
    defaultProps: {},
  },
  title: "Tooltip",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-overlays-tooltip--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
