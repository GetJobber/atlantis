import AnimationDocs from "../content/design/Animation.stories.mdx";
import BorderDocs from "../content/design/Borders.stories.mdx";
import ColorDocs from "../content/design/Colors.stories.mdx";
import ElevationDocs from "../content/design/Elevations.stories.mdx";
import OpacityDocs from "../content/design/Opacity.stories.mdx";
import RadiiDocs from "../content/design/Radii.stories.mdx";
import ResponsiveBreakpointsDocs from "../content/design/ResponsiveBreakpoint.stories.mdx";
import SpacingDocs from "../content/design/Spacing.stories.mdx";
import TypographyDocs from "../content/design/Typography.stories.mdx";
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
