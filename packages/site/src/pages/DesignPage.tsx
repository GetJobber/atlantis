import { PageBlock } from "../components/PageBlock";

export const DesignPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Design",
          body: "What would we do without it?",
        },
        body: {
          title: "Design!",
          content: [
            {
              title: "Animation",
              to: "/content/design/animation",
              imageURL: "",
            },
            {
              title: "Borders",
              to: "/content/design/borders",
              imageURL: "",
            },
            {
              title: "Breakpoints",
              to: "/content/design/responsive-breakpoint",
              imageURL: "",
            },
            {
              title: "Colors",
              to: "/content/design/colors",
              imageURL: "",
            },
            {
              title: "Elevations",
              to: "/content/design/elevations",
              imageURL: "",
            },
            {
              title: "Opacity",
              to: "/content/design/opacity",
              imageURL: "",
            },
            {
              title: "Radii",
              to: "/content/design/radii",
              imageURL: "",
            },
            {
              title: "Spacing",
              to: "/content/design/spacing",
              imageURL: "",
            },
            {
              title: "Typography",
              to: "/content/design/typography",
              imageURL: "",
            },
          ],
        },
      }}
    />
  );
};
