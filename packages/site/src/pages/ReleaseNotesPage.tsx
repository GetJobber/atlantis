import { Content, Page } from "@jobber/components";
import { Text } from "@jobber/components/Text";
import { BaseView } from "../layout/BaseView";
import { AnchorLinks } from "../components/AnchorLinks";

export const ReleaseNotesPage = () => {
  return (
    <BaseView>
      <BaseView.Main>
        <Page width="narrow" title="Release Notes">
          <Content>
            <Text>
              This is where we share the story behind each update—what’s new,
              what’s improved, and why it matters. Think of it as a guided tour
              through the latest features, sprinkled with context, highlights,
              and a little personality. It’s not just what changed, but how it
              makes your experience better.
            </Text>
          </Content>
        </Page>
      </BaseView.Main>
      <BaseView.Siderail>
        <AnchorLinks header="Jump To" id="release-notes" />
      </BaseView.Siderail>
    </BaseView>
  );
};
