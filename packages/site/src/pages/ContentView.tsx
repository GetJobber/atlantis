import { Content } from "@jobber/components";
import { ContentExport } from "../types/content";
import { AnchorLinks } from "../components/AnchorLinks";
import { BaseView } from "../layout/BaseView";

export const ContentView = ({
  key,
  content,
}: {
  readonly key: string;
  readonly content: ContentExport["content"];
}) => {
  return (
    <BaseView>
      <BaseView.Main>
        <custom-elements>
          <Content>{content()}</Content>
        </custom-elements>
      </BaseView.Main>
      <BaseView.Siderail>
        <AnchorLinks header="Jump To" key={key} />
      </BaseView.Siderail>
    </BaseView>
  );
};
