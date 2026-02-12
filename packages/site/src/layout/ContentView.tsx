import { Content } from "@jobber/components";
import { BaseView } from "./BaseView";
import { ContentExport } from "../types/content";
import { AnchorLinks } from "../components/AnchorLinks";
import usePageTitle from "../hooks/usePageTitle";

export const ContentView = ({
  title,
  key,
  content,
  noMaxWidth = false,
  toc,
}: {
  readonly title: string;
  readonly key: string;
  readonly content: ContentExport["content"];
  readonly noMaxWidth?: boolean;
  readonly toc?: ContentExport["toc"];
}) => {
  usePageTitle({ title });

  return (
    <BaseView>
      <BaseView.Main noMaxWidth={noMaxWidth}>
        <custom-elements>
          <Content>{content()}</Content>
        </custom-elements>
      </BaseView.Main>
      <BaseView.Siderail>
        <AnchorLinks header="Jump To" id={key} toc={toc} />
      </BaseView.Siderail>
    </BaseView>
  );
};
