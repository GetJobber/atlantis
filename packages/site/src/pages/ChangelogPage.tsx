import { Page } from "@jobber/components";
import { ChangelogDataTable } from "./changelog/ChangelogDataTable";
import { BaseView } from "../layout/BaseView";
import usePageTitle from "../hooks/usePageTitle";

export const ChangelogPage = () => {
  usePageTitle({ title: "Changelog" });

  return (
    <BaseView>
      <BaseView.Main>
        <Page title="Changelog">
          <ChangelogDataTable />
        </Page>
      </BaseView.Main>
    </BaseView>
  );
};
