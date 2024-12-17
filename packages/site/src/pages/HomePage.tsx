import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Atlantis",
          body: "Jobber's toolkit for building consumer-grade experiences",
          ctaLabel: "Get Started",
          to: "/design/welcome-guide",
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
              imageURL: "/Placeholder.png",
              sections: ["Resources"],
            },
            {
              title: "Guides",
              to: "/guides",
              imageURL: "/Placeholder.png",
              sections: ["Resources"],
            },
            {
              title: "Changelog",
              to: "/changelog",
              imageURL: "/Placeholder.png",
              sections: ["Changelog"],
            },
          ],
        },
        useCategories: true,
        showSegmentedControl: false,
      }}
    />
  );
};
