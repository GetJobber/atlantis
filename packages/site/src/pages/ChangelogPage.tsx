import { Page } from "@jobber/components";
import { ChangelogDataTable } from "./changelog/ChangelogDataTable";
import { BaseView } from "../layout/BaseView";
import usePageTitle from "../hooks/usePageTitle";

export const ChangelogPage = () => {
  usePageTitle({ title: "Changelog" });

  return (
    <BaseView>
      <BaseView.Main noMaxWidth={true}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "var(--space-large)",
          }}
        >
          <Page title="Changelog" width="fill">
            <ChangelogDataTable />
          </Page>
        </div>
      </BaseView.Main>
    </BaseView>
  );
};
