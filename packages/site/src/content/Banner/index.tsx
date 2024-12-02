import { Banner as BannerRoot } from "@jobber/components";
import BannerContent from "@atlantis/docs/components/Banner/Banner.stories.mdx";
import { PropsWithChildren } from "react";
import Props from "./Banner.props.json";
import { BannerType } from "../../types/banner";
import { ContentExport } from "../../types/content";

export const Banner = (
  props: PropsWithChildren<{
    readonly type: BannerType;
  }>,
) => {
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
    element: 'return <Banner type={"success"}>Account Details Updated</Banner>',
  },
  title: "Banner",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Banner-web--docs",
    },
  ],
} as const satisfies ContentExport;
