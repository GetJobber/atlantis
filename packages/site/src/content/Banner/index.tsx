import BannerContent from "@atlantis/docs/components/Banner/Banner.stories.mdx";
import Props from "./Banner.props.json";
import MobileProps from "./Banner.props-mobile.json";
import { ContentExport } from "../../types/content";

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
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-Banner-web--docs`,
    },
  ],
} as const satisfies ContentExport;
