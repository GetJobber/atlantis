import { PageBlock } from "../components/PageBlock";
import { changelogList } from "../changelogList";

export const ChangelogPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Changelog",
          body: "What's new and notable",
          imageURL: "/img-page-divider-collage.webp",
        },
        body: {
          content: changelogList,
        },
      }}
    />
  );
};
