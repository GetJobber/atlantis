import AnimationDocs, {
  toc as animationToc,
} from "@atlantis/docs/design/Animation.stories.mdx";
import BorderDocs, {
  toc as bordersToc,
} from "@atlantis/docs/design/Borders.stories.mdx";
import ColorDocs, {
  toc as colorsToc,
} from "@atlantis/docs/design/Colors.stories.mdx";
import ElevationDocs, {
  toc as elevationsToc,
} from "@atlantis/docs/design/Elevations.stories.mdx";
import OpacityDocs, {
  toc as opacityToc,
} from "@atlantis/docs/design/Opacity.stories.mdx";
import RadiiDocs, {
  toc as radiiToc,
} from "@atlantis/docs/design/Radii.stories.mdx";
import ResponsiveBreakpointsDocs, {
  toc as responsiveBreakpointsToc,
} from "@atlantis/docs/design/ResponsiveBreakpoint.stories.mdx";
import SpacingDocs, {
  toc as spacingToc,
} from "@atlantis/docs/design/Spacing.stories.mdx";
import TypographyDocs, {
  toc as typographyToc,
} from "@atlantis/docs/design/Typography.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const designContentMap: ContentMapItems = {
  animation: {
    intro: "Animation",
    title: "Animation",
    content: () => <AnimationDocs />,
    toc: animationToc,
  },
  borders: {
    intro: "Borders",
    title: "Borders",
    content: () => <BorderDocs />,
    toc: bordersToc,
  },
  colors: {
    intro: "Colors",
    title: "Colors",
    content: () => <ColorDocs />,
    toc: colorsToc,
  },
  elevations: {
    intro: "Elevations",
    title: "Elevations",
    content: () => <ElevationDocs />,
    toc: elevationsToc,
  },
  opacity: {
    intro: "Opacity",
    title: "Opacity",
    content: () => <OpacityDocs />,
    toc: opacityToc,
  },
  radii: {
    intro: "Radii",
    title: "Radii",
    content: () => <RadiiDocs />,
    toc: radiiToc,
  },
  breakpoints: {
    intro: "Breakpoints",
    title: "Breakpoints",
    content: () => <ResponsiveBreakpointsDocs />,
    toc: responsiveBreakpointsToc,
  },
  spacing: {
    intro: "Spacing",
    title: "Spacing",
    content: () => <SpacingDocs />,
    toc: spacingToc,
  },
  typography: {
    intro: "Typography",
    title: "Typography",
    content: () => <TypographyDocs />,
    toc: typographyToc,
  },
};
