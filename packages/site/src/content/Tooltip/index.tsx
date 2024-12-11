import Content from "@atlantis/docs/components/Tooltip/Tooltip.stories.mdx";
import Props from "./Tooltip.props.json";
import { ContentExport } from "../../types/content";

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
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-overlays-tooltip--docs`,
    },
  ],
} as const satisfies ContentExport;
