import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Atlantis",
          body: "Jobber's toolkit for building consumer-grade experiences",
          ctaLabel: "Get Started",
          to: "/content/design/welcome-guide",
          imageURL: "/img_collage.jpg",
        },
        body: {
          title: "Packages",
          content: [
            {
              title: "Components",
              to: "/components",
              imageURL: "/Components.png",
            },
            {
              title: "Design",
              to: "/design",
              imageURL: "/Design.png",
            },
            {
              title: "Changelog",
              to: "/changelog",
              imageURL: "/Changelog.png",
            },
          ],
        },
      }}
    />
  );
};
