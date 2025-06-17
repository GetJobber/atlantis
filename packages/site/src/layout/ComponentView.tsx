import { Banner, Box, Content, Page, Tab, Tabs } from "@jobber/components";
import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { BaseView } from "./BaseView";
import { PropsList } from "../components/PropsList";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ComponentLinks } from "../components/ComponentLinks";
import { CodePreviewWindow } from "../components/CodePreviewWindow";
import { usePropsAsDataList } from "../hooks/usePropsAsDataList";
import { SiteContent } from "../content";
import { useStyleUpdater } from "../hooks/useStyleUpdater";
import { useErrorCatcher } from "../hooks/useErrorCatcher";
import { useAtlantisSite } from "../providers/AtlantisSiteProvider";
import usePageTitle from "../hooks/usePageTitle";
import { useAtlantisPreview } from "../preview/AtlantisPreviewProvider";
import { AtlantisPreviewEditor } from "../preview/AtlantisPreviewEditor";
import { AtlantisPreviewViewer } from "../preview/AtlantisPreviewViewer";

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
  const [tab, setTab] = useState(0);
  const { stateValues } = usePropsAsDataList(PageMeta, type);
  const { enableMinimal, minimal, disableMinimal, isMinimal } =
    useAtlantisSite();

  usePageTitle({ title: PageMeta?.title });

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
      setTimeout(() => updateCode(code as string, true), 100);
    }
  }, [code, type]);

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

  const handleTabChange = (tabIn: number) => {
    if (tabIn == 1) {
      updateType("web");
    } else if (tabIn == 2) {
      updateType("mobile");
    }
    setTab(tabIn);
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
        <div data-usage-tab>
          <Box margin={{ bottom: "base" }}>
            <AtlantisPreviewEditor />
          </Box>
          <Box margin={{ top: "base", bottom: "base" }}>
            <Banner type="warning" dismissible={false}>
              Due to distinctions between web and native platform, this may not
              render accurately in a web browser.
            </Banner>
          </Box>
          <PropsList values={stateValues || []} />
        </div>
      ),
    },
    {
      label: "Implement",
      children: PageMeta?.notes ? (
        <Content spacing="large">
          <PageMeta.notes />
        </Content>
      ) : null,
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

      if (!PageMeta?.notes && index === 3) {
        return false;
      }

      return true;
    });
  }, [tabs]);

  const goToProps = (typeIn: string) => {
    if (typeIn === "web" && PageMeta?.component?.element) {
      handleTabChange(1);
    } else if (typeIn === "mobile" && !PageMeta?.component?.element) {
      handleTabChange(1);
    } else if (
      typeIn === "mobile" &&
      PageMeta?.component?.element &&
      PageMeta?.component?.mobileElement
    ) {
      handleTabChange(2);
    } else {
      handleTabChange(1);
    }
    setTimeout(() => {
      document
        .querySelector("[data-props-list]")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goToUsage = (typeIn: string) => {
    if (typeIn === "web" && PageMeta?.component?.element) {
      handleTabChange(1);
    } else if (typeIn === "mobile" && !PageMeta?.component?.element) {
      handleTabChange(1);
    } else if (
      typeIn === "mobile" &&
      PageMeta?.component?.element &&
      PageMeta?.component?.mobileElement
    ) {
      handleTabChange(2);
    } else {
      handleTabChange(1);
    }
    setTimeout(() => {
      document
        .querySelector("[data-usage-tab]")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goToDesign = () => {
    setTab(0);
  };

  return PageMeta ? (
    <BaseView>
      <BaseView.Main>
        <Page width="narrow" title={PageMeta.title}>
          <Box>
            <Content spacing="large">
              <Box direction="column" gap="small" alignItems="flex-end">
                <CodePreviewWindow>
                  <AtlantisPreviewViewer />
                </CodePreviewWindow>
              </Box>
              <span style={{ "--public-tab--inset": 0 } as React.CSSProperties}>
                <Tabs onTabChange={handleTabChange} activeTab={tab}>
                  {activeTabs.map((activeTab, index) => (
                    <Tab key={index} label={activeTab.label}>
                      {activeTab.children}
                    </Tab>
                  ))}
                </Tabs>
              </span>
            </Content>
          </Box>
        </Page>
      </BaseView.Main>
      <BaseView.Siderail visible={!isMinimal}>
        <ComponentLinks
          key={`component-${name}`}
          links={PageMeta?.links}
          mobileEnabled={!!PageMeta?.component?.mobileElement}
          webEnabled={!!PageMeta?.component?.element}
          goToDesign={goToDesign}
          goToProps={goToProps}
          goToUsage={goToUsage}
        />
      </BaseView.Siderail>
    </BaseView>
  ) : (
    <NotFoundPage />
  );
};
