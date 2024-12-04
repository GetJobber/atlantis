import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Atlantis",
          body: "Jobber's toolkit for building consumer-grade experiences",
          ctaLabel: "Get Started",
          to: "/docs/content/design/welcome-guide",
          imageURL: "/docs/img_collage.jpg",
        },
        body: {
          title: "Packages",
          content: [
            {
              title: "Components",
              to: "/docs/components",
              imageURL: "/docs/Components.png",
            },
            {
              title: "Design",
              to: "/docs/design",
              imageURL: "/docs/Design.png",
            },
          ],
        },
      }}
    />
  );
};
