import { Box, Content, Grid, Page, Tab, Tabs } from "@jobber/components";
import { useParams } from "react-router";
import { ReactNode } from "react";
import { PageWrapper } from "./PageWrapper";
import { PropsList } from "../components/PropsList";
import { CodeViewer } from "../components/CodeViewer";
import { ComponentNotFound } from "../components/ComponentNotFound";
import { ComponentLinks } from "../components/ComponentLinks";
import { CodePreviewWindow } from "../components/CodePreviewWindow";
import { usePageValues } from "../hooks/usePageValues";
import { SiteContent } from "../content";
import { useStyleUpdater } from "../hooks/useStyleUpdater";
import { useErrorCatcher } from "../hooks/useErrorCatcher";
import { useComponentAndCode } from "../hooks/useComponentAndCode";

/**
 * Layout for displaying a Component documentation page. This will display the component, props, and code.
 * This isn't really a Layout component, but it's not really a component component either. We could make a "Views" directory maybe, or a "Template" directory?
 * @returns ReactNode
 */
export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const PageMeta = SiteContent[name];
  useErrorCatcher();
  const { updateStyles } = useStyleUpdater();
  const { stateValues, stateValueWithFunction } = usePageValues(PageMeta);

  const ComponentContent = PageMeta.content as () => ReactNode;

  const { Component, code } = useComponentAndCode(
    PageMeta,
    stateValueWithFunction,
  );

  return PageMeta ? (
    <Grid>
      <Grid.Cell size={{ xs: 12, md: 9 }}>
        <Page
          width="fill"
          title={PageMeta.title}
          subtitle={PageMeta.description}
        >
          <PageWrapper>
            <Box>
              <Content spacing="large">
                <Box direction="column" gap="small">
                  {Component && (
                    <CodePreviewWindow>
                      <Component {...stateValueWithFunction} />
                    </CodePreviewWindow>
                  )}
                </Box>
                <Tabs onTabChange={updateStyles}>
                  <Tab label="Design">
                    <Content spacing="large">
                      <ComponentContent />
                    </Content>
                  </Tab>
                  <Tab label="Props">
                    <PropsList values={stateValues} />
                  </Tab>
                  <Tab label="Code">
                    <CodeViewer code={code} />
                  </Tab>
                </Tabs>
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