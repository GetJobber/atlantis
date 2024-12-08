import Content from "@atlantis/docs/components/List/List.stories.mdx";
import Props from "./List.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Card>

 <List
        items={[
          {
            id: 1,
            icon: "wallet",
            iconColor: "orange",
            content: "Payment for Invoice #39",
            value: "-$300.00",
            caption: "Sep 25, 2019",
            onClick: () => {alert('Item 1')}
          },
          {
            id: 3,
            icon: "paidInvoice",
            content: "Invoice #39",
            value: "$300.00",
            caption: "Sep 24, 2019",
            onClick: () => {alert('Item 2')}
          },
        ]}
      />
</Card>
`,
  },
  title: "List",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-List-web--docs",
    },
  ],
} as const satisfies ContentExport;
