import Content from "./Cluster.mdx";
import Props from "./Cluster.props.json";
import { ContentExport } from "../../types/content";

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
      url: "/?path=/story/components-layouts-and-structure-cluster-web--basic",
    },
  ],
} as const satisfies ContentExport;
