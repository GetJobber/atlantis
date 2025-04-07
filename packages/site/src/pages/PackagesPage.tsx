import { PageBlock } from "../components/PageBlock";
import { packagesList } from "../packagesList";

export const PackagesPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Packages",
          body: "Explore the Essentials: Must-Have NPM Packages for Your Projects",
          imageURL: "/img-page-divider-collage.webp",
        },
        body: {
          content: packagesList,
        },
      }}
    />
  );
};
