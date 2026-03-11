import BannerContent from "./Banner.stories.mdx";
import Props from "./Banner.props.json";
import MobileProps from "./Banner.props-mobile.json";
import Notes from "./BannerNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <BannerContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: '<Banner type={"success"}>Account Details Updated</Banner>',
    mobileElement: `<><Banner type="success">
        <Text>Your import is in progress</Text>
      </Banner>
      <Banner type="warning">
        <Text>Your import is in progress</Text>
      </Banner>
      <Banner type="notice">
        <Text>Your import is in progress</Text>
      </Banner>
      <Banner type="error">
        <Text>Your import is in progress</Text>
      </Banner></>
      `,
  },
  title: "Banner",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-banner--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-banner--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
