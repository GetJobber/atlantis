import WelcomeGuide from "@atlantis/docs/README.md";
import { ContentView } from "../layout/ContentView";

export const GettingStartedPage = () => {
  return (
    <ContentView
      title="Welcome Guide"
      key="welcome-guide"
      content={() => <WelcomeGuide />}
    />
  );
};
