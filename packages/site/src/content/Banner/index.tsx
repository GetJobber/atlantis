import { Banner as BannerRoot } from "@jobber/components";
import BannerContent from "@atlantis/docs/components/Banner/Banner.stories.mdx";
import { PropsWithChildren } from "react";
import Props from "./Banner.props.json";
import { ContentExport } from "../../types/content";

export const Banner = (props: PropsWithChildren) => {
  return (
    <BannerRoot {...props}>
      <p>{"Account details updated"}</p>
    </BannerRoot>
  );
};

export default {
  content: () => <BannerContent />,
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
