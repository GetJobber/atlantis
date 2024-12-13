// pages/ChangelogPage.tsx
import { Content, Page } from "@jobber/components";
import DesignChangelogContent from "../../../design/CHANGELOG.md";

// STODO: Is there an opportunity to build a more generic markdown page?
// So it just accepts a path to a markdown file and renders it?

export const DesignChangelogPage = () => {
  return (
    <Page title="">
      <Content>
        <DesignChangelogContent />
      </Content>
    </Page>
  );
};
