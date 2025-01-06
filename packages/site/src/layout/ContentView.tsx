import { Content } from "@jobber/components";
import { BaseView } from "./BaseView";
import { ContentExport } from "../types/content";
import { AnchorLinks } from "../components/AnchorLinks";
import usePageTitle from "../hooks/usePageTitle";

export const ContentView = ({
  title,
  key,
  content,
}: {
  readonly title: string;
  readonly key: string;
  readonly content: ContentExport["content"];
}) => {
  usePageTitle({ title });

  return (
    <BaseView>
      <BaseView.Main>
        <custom-elements>
          <Content>{content()}</Content>
        </custom-elements>
      </BaseView.Main>
      <BaseView.Siderail>
        <AnchorLinks header="Jump To" id={key} />
      </BaseView.Siderail>
    </BaseView>
  );
};
