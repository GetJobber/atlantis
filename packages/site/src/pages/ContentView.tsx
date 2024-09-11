import { Content, Page } from "@jobber/components";
import { ReactNode } from "react";

export const ContentView = ({
  content,
  intro,
  title,
}: {
  readonly content: ReactNode;
  readonly intro: string;
  readonly title: string;
}) => {
  return (
    <div style={{ backgroundColor: "var(--color-surface" }}>
      <Page intro={intro} title={title}>
        <Content>{content}</Content>
      </Page>
    </div>
  );
};
