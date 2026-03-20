import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Atlantis Design System",
          body: "Atlantis is Jobber's design system that enables us to build consumer-grade experiences",
          ctaLabel: "Get Started",
          to: "/welcome-guide",
          imageURL: "/img_collage.jpg",
        },
        body: {
          content: [
            {
              title: "Components",
              to: "/components",
              imageURL: "/Components.png",
              sections: ["Quickstarts"],
            },
            {
              title: "Tokens",
              to: "/tokens",
              imageURL: "/Design.png",
              sections: ["Quickstarts"],
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
              sections: ["Quickstarts"],
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
