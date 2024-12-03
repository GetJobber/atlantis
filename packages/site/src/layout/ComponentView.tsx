import { Box, Content, Grid, Page, Tab, Tabs } from "@jobber/components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { PageWrapper } from "./PageWrapper";
import { PropsList } from "../components/PropsList";
import { ComponentNotFound } from "../components/ComponentNotFound";
import { ComponentLinks } from "../components/ComponentLinks";
import { CodePreviewWindow } from "../components/CodePreviewWindow";
import { usePageValues } from "../hooks/usePageValues";
import { SiteContent } from "../content";
import { useStyleUpdater } from "../hooks/useStyleUpdater";
import { useErrorCatcher } from "../hooks/useErrorCatcher";
import {
  AtlantisPreviewEditor,
  AtlantisPreviewViewer,
  useAtlantisPreview,
} from "../components/AtlantisPreviewEditorProvider";
import { useComponentAndCode } from "../hooks/useComponentAndCode";

/**
 * Layout for displaying a Component documentation page. This will display the component, props, and code.
 * This isn't really a Layout component, but it's not really a component component either. We could make a "Views" directory maybe, or a "Template" directory?
 * @returns ReactNode
 */
// eslint-disable-next-line max-statements
export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const { updateCode, iframe } = useAtlantisPreview();
  const PageMeta = SiteContent[name];
  useErrorCatcher();
  const { updateStyles } = useStyleUpdater();
  const { stateValues } = usePageValues(PageMeta);
  const [tab, setTab] = useState("Design");
  const ComponentContent = PageMeta?.content;
  const { code } = useComponentAndCode(PageMeta);
  useEffect(() => {
    if (iframe?.current) {
      setTimeout(() => updateCode(code as string), 100);
    }
  }, [code, iframe?.current]);

  const goToProps = e => {
    e.preventDefault();
    setTab("Implementation");
  };

  const goToUsage = e => {
    e.preventDefault();
    setTab("Implementation");
  };

  return PageMeta ? (
    <Grid>
      <Grid.Cell size={{ xs: 12, md: 9 }}>
        <Page width="fill" title={PageMeta.title}>
          <PageWrapper>
            <Box>
              <Content spacing="large">
                <Box direction="column" gap="small">
                  <CodePreviewWindow>
                    <AtlantisPreviewViewer />
                  </CodePreviewWindow>
                </Box>
                <span
                  style={{ "--public-tab--inset": 0 } as React.CSSProperties}
                >
                  <Tabs onTabChange={updateStyles} defaultTab={tab}>
                    <Tab label="Design">
                      <Content spacing="large">
                        <ComponentContent />
                      </Content>
                    </Tab>
                    <Tab label="Implementation">
                      <Box margin={{ bottom: "base" }}>
                        <AtlantisPreviewEditor />
                      </Box>
                      <PropsList values={stateValues} />
                    </Tab>
                  </Tabs>
                </span>
              </Content>
            </Box>
          </PageWrapper>
        </Page>
      </Grid.Cell>
      <Grid.Cell size={{ xs: 12, md: 3 }}>
        <ComponentLinks
          links={PageMeta?.links}
          goToProps={goToProps}
          goToUsage={goToUsage}
        />
      </Grid.Cell>
    </Grid>
  ) : (
    <ComponentNotFound />
  );
};
