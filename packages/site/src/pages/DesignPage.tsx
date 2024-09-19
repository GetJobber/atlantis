import { PageBlock } from "../components/PageBlock";

export const DesignPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Design",
          body: "Design elements and concepts that apply across Jobber's ecosystem",
        },
        body: {
          title: "Design",
          content: [
            {
              title: "Animation",
              to: "/content/design/animation",
              imageURL: "/Animation.png",
            },
            {
              title: "Borders",
              to: "/content/design/borders",
              imageURL: "/Borders.png",
            },
            {
              title: "Breakpoints",
              to: "/content/design/responsive-breakpoint",
              imageURL: "/Breakpoints.png",
            },
            {
              title: "Colors",
              to: "/content/design/colors",
              imageURL: "/Colors.png",
            },
            {
              title: "Elevations",
              to: "/content/design/elevations",
              imageURL: "/Elevations.png",
            },
            {
              title: "Opacity",
              to: "/content/design/opacity",
              imageURL: "/Opacity.png",
            },
            {
              title: "Radii",
              to: "/content/design/radii",
              imageURL: "/Radii.png",
            },
            {
              title: "Spacing",
              to: "/content/design/spacing",
              imageURL: "/Spacing.png",
            },
            {
              title: "Typography",
              to: "/content/design/typography",
              imageURL: "/Typography.png",
            },
          ],
        },
      }}
    />
  );
};
