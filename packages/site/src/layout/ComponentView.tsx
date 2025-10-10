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
import { ComponentType, PlatformType } from "../types/content";
import {
  getAvailableComponentTypes,
  getAvailablePlatformTypes,
  getAvailableVersionsForPlatform,
  getComponentContent,
  getComponentElement,
  getComponentLinks,
  getComponentNotes,
  getComponentTypeConfig,
  getDefaultComponentType,
  getPlatformForComponentType,
} from "../utils/componentTypeUtils";
import { VersionSelector } from "../components/VersionSelector";

/**
 * Layout for displaying a Component documentation page. This will display the component, props, and code.
 * This isn't really a Layout component, but it's not really a component component either. We could make a "Views" directory maybe, or a "Template" directory?
 * @returns ReactNode
 */
// eslint-disable-next-line max-statements
export const ComponentView = () => {
  const { name = "" } = useParams<{ name: string }>();
  const { updateCode, type, updateType } = useAtlantisPreview();
  const PageMeta = SiteContent[name];
  useErrorCatcher();
  const { updateStyles } = useStyleUpdater();
  const [tab, setTab] = useState(0);
  const { stateValues } = usePropsAsDataList(PageMeta, type);
  const { enableMinimal, minimal, disableMinimal, isMinimal } =
    useAtlantisSite();

  usePageTitle({ title: PageMeta?.title });

  // Get available component types for this component
  const availableTypes = useMemo(
    () => (PageMeta ? getAvailableComponentTypes(PageMeta) : []),
    [PageMeta],
  );

  const availablePlatforms = useMemo(
    () => (PageMeta ? getAvailablePlatformTypes(PageMeta) : []),
    [PageMeta],
  );

  // Get current platform and available versions for that platform
  const currentPlatform = useMemo(
    () => getPlatformForComponentType(type),
    [type],
  );

  const availableVersionsForCurrentPlatform = useMemo(
    () =>
      PageMeta
        ? getAvailableVersionsForPlatform(PageMeta, currentPlatform)
        : [],
    [PageMeta, currentPlatform],
  );

  // Set initial type based on what's available
  useEffect(() => {
    if (PageMeta && availableTypes.length > 0) {
      const defaultType = getDefaultComponentType(PageMeta);

      if (!availableTypes.includes(type)) {
        updateType(defaultType);
      }
    }
  }, [PageMeta, availableTypes, type, updateType]);

  useEffect(() => {
    if (minimal.requested && !minimal.enabled) {
      enableMinimal();
    }

    return () => {
      disableMinimal();
    };
  }, []);

  const ComponentContent = getComponentContent(PageMeta, type);

  const code = getComponentElement(PageMeta, type);

  useEffect(() => {
    if (code) {
      setTimeout(() => updateCode(code as string, true), 100);
    }
  }, [code, type, updateCode]);

  const handleTabChange = (tabIn: number) => {
    if (tabIn === 0) {
      // Design tab - no type change needed
      setTab(tabIn);
    } else if (tabIn <= availablePlatforms.length) {
      // Platform implementation tabs (Web, Mobile)
      const platformTabIndex = tabIn - 1; // Adjust for design tab being first
      const targetPlatform = availablePlatforms[platformTabIndex];

      if (targetPlatform) {
        // Only change the component type if we're switching to a different platform
        if (currentPlatform !== targetPlatform) {
          // Find the first available version for this platform
          const versionsForPlatform = getAvailableVersionsForPlatform(
            PageMeta,
            targetPlatform,
          );

          if (versionsForPlatform.length > 0) {
            updateType(versionsForPlatform[0]);
          }
        }
        // Always set the tab regardless of whether we changed the type
        setTab(tabIn);
      }
    } else {
      // Implement tab or other tabs - just switch without changing type
      setTab(tabIn);
    }
    updateStyles();
  };

  // Create tabs dynamically based on available platforms (not individual component types)
  const tabs = useMemo(() => {
    const tabList = [
      {
        label: "Design",
        children: (
          <Content spacing="large">
            {ComponentContent && <ComponentContent />}
          </Content>
        ),
      },
    ];

    // Add platform implementation tabs
    availablePlatforms.forEach((platform: PlatformType) => {
      const versionsForPlatform = getAvailableVersionsForPlatform(
        PageMeta,
        platform,
      );
      if (versionsForPlatform.length === 0) return;

      // Use the first version to get the platform config
      const firstVersion = versionsForPlatform[0];
      const config = getComponentTypeConfig(firstVersion);

      tabList.push({
        label: config.platform === "web" ? "Web" : "Mobile",
        children: (
          <div data-usage-tab={platform}>
            <Box margin={{ bottom: "base" }}>
              <AtlantisPreviewEditor />
            </Box>
            {config.warningMessage && (
              <Box margin={{ top: "base", bottom: "base" }}>
                <Banner type="warning" dismissible={false}>
                  {config.warningMessage}
                </Banner>
              </Box>
            )}
            <PropsList values={stateValues || []} />
          </div>
        ),
      });
    });

    // Add Implement tab if notes are available
    const currentNotes = getComponentNotes(PageMeta, type);

    if (currentNotes && typeof currentNotes === "function") {
      const NotesComponent = currentNotes;
      tabList.push({
        label: "Implement",
        children: (
          <Content spacing="large">
            <NotesComponent />
          </Content>
        ),
      });
    }

    return tabList;
  }, [availablePlatforms, PageMeta, ComponentContent, stateValues, type]);

  const goToProps = (typeIn: ComponentType) => {
    const platform = getPlatformForComponentType(typeIn);
    const platformIndex = availablePlatforms.indexOf(platform);

    if (platformIndex !== -1) {
      updateType(typeIn); // Switch to the specific version
      handleTabChange(platformIndex + 1); // +1 to account for Design tab
      setTimeout(() => {
        document
          .querySelector("[data-props-list]")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const goToUsage = (typeIn: ComponentType) => {
    const platform = getPlatformForComponentType(typeIn);
    const platformIndex = availablePlatforms.indexOf(platform);

    if (platformIndex !== -1) {
      updateType(typeIn); // Switch to the specific version
      handleTabChange(platformIndex + 1); // +1 to account for Design tab
      setTimeout(() => {
        document
          .querySelector(`[data-usage-tab="${platform}"]`)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
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
                {/* Version selector - only show if there are multiple versions for current platform */}
                <VersionSelector
                  availableVersions={availableVersionsForCurrentPlatform}
                  currentVersion={type}
                  onVersionChange={updateType}
                />
              </Box>
              <span style={{ "--public-tab--inset": 0 } as React.CSSProperties}>
                <Tabs onTabChange={handleTabChange} activeTab={tab}>
                  {tabs.map((activeTab, index) => (
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
          links={getComponentLinks(PageMeta, type)}
          availablePlatforms={availablePlatforms}
          availableVersionsForCurrentPlatform={
            availableVersionsForCurrentPlatform
          }
          currentType={type}
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
