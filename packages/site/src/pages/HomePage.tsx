import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Atlantis",
          body: "Design and build consumer-grade products with this world-class design system",
          ctaLabel: "Get Started",
          to: "/welcome-guide",
        },
        body: {
          title: "Packages",
          content: [
            { title: "Components", to: "/components" },
            { title: "Colors", to: "/colors" },
            { title: "Welcome Guide", to: "/welcome-guide" },
          ],
        },
      }}
    />
  );
};
