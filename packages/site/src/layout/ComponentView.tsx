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
import { ValueStateInternals } from "../types/services";

export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const PageMeta = SiteContent[name];
  useErrorCatcher();
  const { updateStyles } = useStyleUpdater();
  const { updateValue, values, stateValueWithFunction } = usePageValues(
    PageMeta.props as Array<{ props: ValueStateInternals }>,
    PageMeta.component.defaultProps,
  );

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
                    <PropsList
                      values={
                        values as unknown as Record<
                          string,
                          {
                            type: string;
                            value: string;
                            description: string;
                            required: boolean;
                          }
                        >
                      }
                      updateValue={updateValue}
                    />
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
