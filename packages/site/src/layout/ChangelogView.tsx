import { BaseView } from "./BaseView";
import { ChangelogDataTable } from "../pages/changelog/ChangelogDataTable";

export const ChangelogView = () => {
  return (
    <BaseView>
      <BaseView.Main>
        <ChangelogDataTable />
      </BaseView.Main>
    </BaseView>
  );
};
