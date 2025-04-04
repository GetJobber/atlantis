import Content from "./Cluster.mdx";
import Props from "./Cluster.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Cluster>
  <Chip label="Cluster Chip" />
  <Heading level={5}>These are all in a cluster</Heading>
  <Button label="Clustered items have variable widths" />
  <Text>They wrap when they run out of space</Text>
</Cluster>
    `,
  },
  title: "Cluster",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-cluster-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
