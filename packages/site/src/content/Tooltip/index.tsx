import Content, { toc } from "./Tooltip.stories.mdx";
import Props from "./Tooltip.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
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
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-overlays-tooltip--docs`),
    },
  ],
} as const satisfies ContentExport;
