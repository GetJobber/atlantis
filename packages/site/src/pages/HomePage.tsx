import { PageBlock } from "../components/PageBlock";

export const HomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Atlantis",
          body: "Design and build consumer-grade experiences with Jobber's design system",
          ctaLabel: "Get Started",
          to: "/content/design/welcome-guide",
        },
        body: {
          title: "Packages",
          content: [
            { title: "Components", to: "/components" },
            { title: "Design", to: "/design" },
          ],
        },
      }}
    />
  );
};
