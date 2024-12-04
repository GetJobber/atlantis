// pages/ChangelogPage.tsx
import { Content, Page } from "@jobber/components";
import DesignChangelogContent from "../../../design/CHANGELOG.md";

export const DesignChangelogPage = () => {
  return (
    <Page title="">
      <Content>
        <DesignChangelogContent />
      </Content>
    </Page>
  );
};
