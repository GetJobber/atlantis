import { PageBlock } from "../components/PageBlock";
import { changelogList } from "../changelogList";

export const ChangelogPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Changelog",
          body: "COPY",
          imageURL: "/img-page-divider-collage.webp",
        },
        body: {
          title: "Changelog",
          content: changelogList,
        },
      }}
    />
  );
};
