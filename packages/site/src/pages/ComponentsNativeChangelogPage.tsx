// pages/ChangelogPage.tsx
import { Content, Page } from "@jobber/components";
import ComponentsNativeChangelogContent from "../../../components-native/CHANGELOG.md";

export const ComponentsNativeChangelogPage = () => {
  return (
    <Page title="">
      <Content>
        <ComponentsNativeChangelogContent />
      </Content>
    </Page>
  );
};
