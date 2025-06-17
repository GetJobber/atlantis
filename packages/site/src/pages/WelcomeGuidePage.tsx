import WelcomeGuide from "@atlantis/docs/README.md";
import { ContentView } from "../layout/ContentView";

export const WelcomeGuidePage = () => {
  return (
    <ContentView
      title="Welcome Guide"
      key="welcome-guide"
      content={() => <WelcomeGuide />}
    />
  );
};
