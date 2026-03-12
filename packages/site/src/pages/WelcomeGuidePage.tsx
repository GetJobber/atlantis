import WelcomeGuide from "../content/guides/welcome-guide.stories.mdx";
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
