import WelcomeGuide from "@atlantis/docs/README.md";
import { BaseView } from "../layout/BaseView";

export const GettingStartedPage = () => {
  return (
    <BaseView>
      <BaseView.Main>
        <WelcomeGuide />
      </BaseView.Main>
    </BaseView>
  );
};
