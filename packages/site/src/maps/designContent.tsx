import AnimationDocs from "@atlantis/docs/design/Animation.stories.mdx";
import BorderDocs from "@atlantis/docs/design/Borders.stories.mdx";
import ColorDocs from "@atlantis/docs/design/Colors.stories.mdx";
import ElevationDocs from "@atlantis/docs/design/Elevations.stories.mdx";
import OpacityDocs from "@atlantis/docs/design/Opacity.stories.mdx";
import RadiiDocs from "@atlantis/docs/design/Radii.stories.mdx";
import ResponsiveBreakpointsDocs from "@atlantis/docs/design/ResponsiveBreakpoint.stories.mdx";
import SpacingDocs from "@atlantis/docs/design/Spacing.stories.mdx";
import TypographyDocs from "@atlantis/docs/design/Typography.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const designContentMap: ContentMapItems = {
  animation: {
    intro: "Animation",
    title: "Animation",
    content: () => <AnimationDocs />,
  },
  borders: {
    intro: "Borders",
    title: "Borders",
    content: () => <BorderDocs />,
  },
  colors: {
    intro: "Colors",
    title: "Colors",
    content: () => <ColorDocs />,
  },
  elevations: {
    intro: "Elevations",
    title: "Elevations",
    content: () => <ElevationDocs />,
  },
  opacity: {
    intro: "Opacity",
    title: "Opacity",
    content: () => <OpacityDocs />,
  },
  radii: {
    intro: "Radii",
    title: "Radii",
    content: () => <RadiiDocs />,
  },
  breakpoints: {
    intro: "Breakpoints",
    title: "Breakpoints",
    content: () => <ResponsiveBreakpointsDocs />,
  },
  spacing: {
    intro: "Spacing",
    title: "Spacing",
    content: () => <SpacingDocs />,
  },
  typography: {
    intro: "Typography",
    title: "Typography",
    content: () => <TypographyDocs />,
  },
};
