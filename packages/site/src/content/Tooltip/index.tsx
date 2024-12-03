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
      url: "http://localhost:6006/?path=/docs/components-utilities-Tooltip-web--docs",
    },
  ],
} as const satisfies ContentExport;
