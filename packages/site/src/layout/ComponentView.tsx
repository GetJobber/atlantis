import { Box, Content, Grid, Page, Tab, Tabs } from "@jobber/components";
import { useParams } from "react-router";
import { useEffect, useMemo } from "react";
import { PageWrapper } from "./PageWrapper";
import { PropsList } from "../components/PropsList";
import { ComponentNotFound } from "../components/ComponentNotFound";
import { ComponentLinks } from "../components/ComponentLinks";
import { CodePreviewWindow } from "../components/CodePreviewWindow";
import { usePropsAsDataList } from "../hooks/usePropsAsDataList";
import { SiteContent } from "../content";
import { useStyleUpdater } from "../hooks/useStyleUpdater";
import { useErrorCatcher } from "../hooks/useErrorCatcher";
import {
  AtlantisPreviewEditor,
  AtlantisPreviewViewer,
  useAtlantisPreview,
} from "../providers/AtlantisPreviewEditorProvider";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";

/**
 * Layout for displaying a Component documentation page. This will display the component, props, and code.
 * This isn't really a Layout component, but it's not really a component component either. We could make a "Views" directory maybe, or a "Template" directory?
 * @returns ReactNode
 */
// eslint-disable-next-line max-statements
export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const { updateCode, iframe, iframeMobile, type, updateType } =
    useAtlantisPreview();
  const PageMeta = SiteContent[name];
  useErrorCatcher();
  const { updateStyles } = useStyleUpdater();
  const { stateValues } = usePropsAsDataList(PageMeta, type);
  const { enableMinimal, minimal, disableMinimal, isMinimal } =
    useAtlantisSite();

  useEffect(() => {
    if (minimal.requested && !minimal.enabled) {
      enableMinimal();
    }

    return () => {
      disableMinimal();
    };
  }, []);

  const ComponentContent = PageMeta?.content;

  const code =
    type === "web" && PageMeta?.component?.element
      ? PageMeta?.component?.element
      : PageMeta?.component?.mobileElement;

  useEffect(() => {
    if (iframe?.current || iframeMobile?.current) {
      setTimeout(() => updateCode(code as string), 100);
    }
  }, [code, iframe?.current, iframeMobile?.current, type]);

  useEffect(() => {
    if (
      type === "web" &&
      !PageMeta?.component?.element &&
      PageMeta?.component?.mobileElement
    ) {
      updateType("mobile");
    }

    if (type === "mobile" && !PageMeta?.component?.mobileElement) {
      updateType("web");
    }
  }, [type, PageMeta]);

  const handleTabChange = (tab: number) => {
    if (tab == 1) {
      updateType("web");
    } else if (tab == 2) {
      updateType("mobile");
    }
    updateStyles();
  };
  const tabs = [
    {
      label: "Design",
      children: (
        <Content spacing="large">
          <ComponentContent />
        </Content>
      ),
    },
    {
      label: "Web",
      children: (
        <>
          <Box margin={{ bottom: "base" }}>
            <AtlantisPreviewEditor />
          </Box>
          <PropsList values={stateValues || []} />
        </>
      ),
    },
    {
      label: "Mobile",
      children: (
        <>
          <Box margin={{ bottom: "base" }}>
            <AtlantisPreviewEditor />
          </Box>
          <PropsList values={stateValues || []} />
        </>
      ),
    },
  ];

  const activeTabs = useMemo(() => {
    return tabs.filter((_, index) => {
      if (!PageMeta?.component.element && index === 1) {
        return false;
      }

      if (!PageMeta?.component.mobileElement && index === 2) {
        return false;
      }

      return true;
    });
  }, [tabs]);

  return PageMeta ? (
    <Grid>
      <Grid.Cell size={isMinimal ? { xs: 12, md: 12 } : { xs: 12, md: 9 }}>
        <Page width="fill" title={PageMeta.title}>
          <PageWrapper>
            <Box>
              <Content spacing="large">
                <Box direction="column" gap="small" alignItems="flex-end">
                  <CodePreviewWindow>
                    <AtlantisPreviewViewer />
                  </CodePreviewWindow>
                </Box>
                <span
                  style={{ "--public-tab--inset": 0 } as React.CSSProperties}
                >
                  <Tabs onTabChange={handleTabChange}>
                    {activeTabs.map((tab, index) => (
                      <Tab key={index} label={tab.label}>
                        {tab.children}
                      </Tab>
                    ))}
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
