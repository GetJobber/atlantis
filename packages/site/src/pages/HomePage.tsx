import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Home",
          body: "Jobber's toolkit for building consumer-grade experiences",
          ctaLabel: "Get Started",
          to: "../guides",
          imageURL: "/img_collage.jpg",
        },
        body: {
          content: [
            {
              title: "Components",
              to: "/components",
              imageURL: "/Components.png",
              sections: ["Packages"],
            },
            {
              title: "Design",
              to: "/design",
              imageURL: "/Design.png",
              sections: ["Packages"],
            },
            {
              title: "Content",
              to: "/content",
              imageURL: "/ContentGuidance.png",
              sections: ["Resources"],
            },
            {
              title: "Hooks",
              to: "/hooks",
              imageURL: "/Hooks.png",
              sections: ["Packages"],
            },
            {
              title: "Guides",
              to: "/guides",
              imageURL: "/Guides.png",
              sections: ["Resources"],
            },
            {
              title: "Patterns",
              to: "/patterns",
              imageURL: "/Patterns.png",
              sections: ["Resources"],
            },
            {
              title: "Packages",
              to: "/packages",
            },
            {
              title: "Changelog",
              to: "/changelog",
              sections: ["Changelog"],
            },
          ],
        },
        useCategories: true,
      }}
    />
  );
};
