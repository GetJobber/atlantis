import { Box, Content, Grid, Page, Tab, Tabs } from "@jobber/components";
import { useParams } from "react-router";
import { useEffect } from "react";
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
export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const { updateCode } = useAtlantisPreview();
  const PageMeta = SiteContent[name];
  useErrorCatcher();
  const { updateStyles } = useStyleUpdater();
  const { stateValues } = usePageValues(PageMeta);

  const ComponentContent = PageMeta?.content;
  const { code } = useComponentAndCode(PageMeta);
  useEffect(() => {
    updateCode(code);
  }, [code]);

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
                  <Tabs onTabChange={updateStyles}>
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
        <ComponentLinks links={PageMeta?.links} />
      </Grid.Cell>
    </Grid>
  ) : (
    <ComponentNotFound />
  );
};
