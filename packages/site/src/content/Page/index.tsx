import Content from "@atlantis/docs/components/Page/Page.stories.mdx";
import Props from "./Page.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `(
    <Page
      title={"Notifications"}
      intro={
        "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us)."
      }
    >
      <Content>
        <Text>Page content here</Text>
      </Content>
    </Page>
  );`,
    defaultProps: {},
  },
  title: "Page",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-page--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
