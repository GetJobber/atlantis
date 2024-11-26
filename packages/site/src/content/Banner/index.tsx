import { Banner } from "@jobber/components";
import BannerContent from "@atlantis/docs/components/Banner/Banner.stories.mdx";
import Props from "./Banner.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => (
    <BannerContent>
      <p>{"Account details updated"}</p>
    </BannerContent>
  ),
  props: Props,
  component: {
    element: Banner,
    defaultProps: { type: "success" },
  },
  title: "Banner",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Banner-web--docs",
    },
  ],
} as const satisfies ContentExport;
