import { PageBlock } from "../components/PageBlock";

export const FigmaPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Figma for Atlantis",
          body: "Jobber's toolkit for building consumer-grade experiences",
          ctaLabel: "Go to Libraries",
          to: "https://www.figma.com/files/1154197009171393179/project/68434130/Atlantis-%2B-SG-1?fuid=596716868535775450",
          imageURL: "Figma.png",
        },
        body: {
          content: [
            {
              title: "Base",
              url: "https://www.figma.com/design/HXWXusJPZLmaJNGlKEpiyhXW/Product%2FBase?m=auurl",
              imageURL: "/Design.png",
              sections: ["Libraries"],
            },
            {
              title: "Components (web)",
              url: "https://www.figma.com/design/rIIhulZvcp9M82lNOCGv16/Product%2FOnline?m=auto",
              imageURL: "/Components.png",
              sections: ["Libraries"],
            },
            {
              title: "Components (mobile)",
              to: "https://www.figma.com/design/avvgu5SkbBvS8lGVePBsqO/Product%2FMobile?m=auto",
              imageURL: "/Components.png",
              sections: ["Libraries"],
            },
          ],
        },
        useCategories: true,
      }}
    />
  );
};
