/* eslint-disable max-statements */
import {
  Banner,
  Box,
  Content,
  Heading,
  Page,
  Tab,
  Tabs,
} from "@jobber/components";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
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
import { ComponentType, ContentExport, PlatformType } from "../types/content";
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
  resolveComponentTypeFromRoute,
} from "../utils/componentTypeUtils";
import { VersionSelector } from "../components/VersionSelector";
import { LinkableHeading } from "../components/LinkableHeading";

const DESIGN_TAB_INDEX = 0;

/**
 * Layout for displaying a Component documentation page. This will display the component, props, and code.
 * This isn't really a Layout component, but it's not really a component component either. We could make a "Views" directory maybe, or a "Template" directory?
 * @returns ReactNode
 */
export const ComponentView = () => {
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false });
  const isLegacy = search?.isLegacy === true;
  const name = params.name ?? "";
  const { updateCode, type, updateType } = useAtlantisPreview();
  const tabFromUrl = params.tab?.toLowerCase().trim() ?? "";

  const PageMeta = SiteContent[name];
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

  const { tab, handleTabChange } = useComponentViewTabs({
    PageMeta,
    updateType,
    tabFromUrl,
    isLegacy,
  });

  useErrorCatcher();
  const { stateValues } = usePropsAsDataList(PageMeta, type);
  const {
    enableMinimal,
    minimal,
    disableMinimal,
    isMinimal,
    setComponentTypeInUrl,
  } = useAtlantisSite();

  usePageTitle({ title: PageMeta?.title });

  useEffect(() => {
    if (minimal.requested && !minimal.enabled) {
      enableMinimal();
    }

    return () => {
      disableMinimal();
    };
  }, []);

  const ComponentContent = PageMeta
    ? getComponentContent(PageMeta, type)
    : undefined;

  const code = PageMeta ? getComponentElement(PageMeta, type) : undefined;

  useEffect(() => {
    if (code) {
      setTimeout(() => updateCode(code as string, true), 100);
    }
  }, [code, type, updateCode]);

  // Create tabs dynamically based on available platforms (not individual component types)
  const tabs = useMemo(() => {
    const tabList = [
      {
        label: "Design",
        children: (
          <MDXProvider
            components={{
              h2: ({ children, ...props }) => (
                <LinkableHeading element="h2" {...props}>
                  {children}
                </LinkableHeading>
              ),
            }}
          >
            <Content spacing="large">
              {ComponentContent && <ComponentContent />}
            </Content>
          </MDXProvider>
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
    const currentNotes = PageMeta
      ? getComponentNotes(PageMeta, type)
      : undefined;

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

  return PageMeta ? (
    <BaseView>
      <BaseView.Main>
        <Page
          width="narrow"
          title={
            <Box direction="row" gap="small" alignItems="start">
              <Heading level={1}>{PageMeta.title}</Heading>
              <VersionSelector
                availableVersions={availableVersionsForCurrentPlatform}
                currentVersion={type}
                onVersionChange={newType => {
                  updateType(newType);
                  setComponentTypeInUrl(newType);
                }}
              />
            </Box>
          }
        >
          <Box>
            <Content spacing="large">
              <Box direction="column" gap="small" alignItems="flex-end">
                <CodePreviewWindow>
                  <AtlantisPreviewViewer />
                </CodePreviewWindow>
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
          links={PageMeta ? getComponentLinks(PageMeta, type) : undefined}
          toc={PageMeta.toc}
          availablePlatforms={availablePlatforms}
          availableVersionsForCurrentPlatform={
            availableVersionsForCurrentPlatform
          }
          goToProps={goToProps}
          goToUsage={goToUsage}
        />
      </BaseView.Siderail>
    </BaseView>
  ) : (
    <NotFoundPage />
  );
};

/**
 * Returns the URL path for a given tab index.
 * Tab 0 = Design. Tabs 1..N = platform tabs. Tab N+1 = Implement (per current platform).
 */
const getComponentUrlForTab = ({
  name,
  availablePlatforms,
  tabIndex,
}: {
  name: string;
  availablePlatforms: PlatformType[];
  tabIndex: number;
}): string | null => {
  if (!name) return null;

  const basePath = `/components/${name}`;

  if (tabIndex === 0) {
    return basePath; // Design tab
  }

  if (tabIndex >= 1 && tabIndex <= availablePlatforms.length) {
    const platform = availablePlatforms[tabIndex - 1];

    return platform ? `${basePath}/${platform}` : basePath;
  }

  // Implement tab (single tab): /components/name/implement
  if (tabIndex === availablePlatforms.length + 1) {
    return `${basePath}/implement`;
  }

  return null;
};

/**
 * Derives the active tab index and resolved editor type from the URL tab param.
 * Returns both the tab index and the resolved type (if any).
 */
const getTabAndTypeFromUrl = ({
  tabFromUrl,
  availablePlatforms,
  availableTypes,
  defaultType,
  isLegacy,
}: {
  tabFromUrl: string;
  availablePlatforms: PlatformType[];
  availableTypes: ComponentType[];
  defaultType: ComponentType;
  isLegacy: boolean;
}): { tabIndex: number; resolvedType: ComponentType | null } => {
  let resolvedType: ComponentType | null = null;

  if (!tabFromUrl || tabFromUrl.trim() === "") {
    const resolved = resolveComponentTypeFromRoute({
      tab: tabFromUrl,
      isLegacy,
      availableTypes,
      defaultType,
    });

    resolvedType = resolved;

    return { tabIndex: DESIGN_TAB_INDEX, resolvedType };
  }
  const platformIndex = availablePlatforms.indexOf(tabFromUrl as PlatformType);

  if (tabFromUrl === "implement") {
    const resolved = resolveComponentTypeFromRoute({
      tab: tabFromUrl,
      isLegacy,
      availableTypes,
      defaultType,
    });

    resolvedType = resolved;

    return { tabIndex: availablePlatforms.length + 1, resolvedType };
  } else if (platformIndex !== -1) {
    const resolved = resolveComponentTypeFromRoute({
      tab: tabFromUrl,
      isLegacy,
      availableTypes,
      defaultType,
    });

    resolvedType = resolved;

    return { tabIndex: platformIndex + 1, resolvedType };
  } else {
    return { tabIndex: DESIGN_TAB_INDEX, resolvedType };
  }
};

const useComponentViewTabs = ({
  PageMeta,
  updateType,
  tabFromUrl,
  isLegacy,
}: {
  PageMeta: ContentExport | undefined;

  updateType: (type: ComponentType) => void;
  tabFromUrl: string;
  isLegacy: boolean;
}) => {
  const navigate = useNavigate();
  const { name = "" } = useParams({ strict: false });
  const { updateStyles } = useStyleUpdater();
  const defaultType = useMemo(
    () => (PageMeta ? getDefaultComponentType(PageMeta) : null),
    [PageMeta],
  );
  const currentPlatform = useMemo(
    () => (defaultType ? getPlatformForComponentType(defaultType) : null),
    [defaultType],
  );
  const availablePlatforms = useMemo(
    () => (PageMeta ? getAvailablePlatformTypes(PageMeta) : []),
    [PageMeta],
  );
  const availableTypes = useMemo(
    () => (PageMeta ? getAvailableComponentTypes(PageMeta) : []),
    [PageMeta],
  );

  const [tab, setTab] = useState(() => {
    if (!PageMeta) return DESIGN_TAB_INDEX;

    const initialDefaultType = getDefaultComponentType(PageMeta);

    const initial = getTabAndTypeFromUrl({
      tabFromUrl,
      availablePlatforms: getAvailablePlatformTypes(PageMeta),
      availableTypes: getAvailableComponentTypes(PageMeta),
      defaultType: initialDefaultType,
      isLegacy,
    });

    return initial.tabIndex;
  });

  // Reset tabs when the page meta changes for example when we switch to a different component
  useEffect(() => {
    if (!PageMeta || !defaultType) {
      setTab(DESIGN_TAB_INDEX);

      return;
    }

    const nextTab = getTabAndTypeFromUrl({
      tabFromUrl,
      availablePlatforms,
      availableTypes,
      defaultType,
      isLegacy,
    });

    setTab(nextTab.tabIndex);
  }, [
    tabFromUrl,
    availablePlatforms,
    availableTypes,
    defaultType,
    updateType,
    isLegacy,
    PageMeta,
  ]);

  useEffect(() => {
    if (!PageMeta || !defaultType) return;

    const nextTab = getTabAndTypeFromUrl({
      tabFromUrl,
      availablePlatforms,
      availableTypes,
      defaultType,
      isLegacy,
    });

    if (nextTab.resolvedType) {
      updateType(nextTab.resolvedType);
    }
  }, [
    PageMeta,
    tabFromUrl,
    availablePlatforms,
    availableTypes,
    defaultType,
    isLegacy,
    updateType,
  ]);

  const setAndNavigateTab = (tabIndex: number) => {
    setTab(tabIndex);
    const urlForTab = getComponentUrlForTab({
      name,
      availablePlatforms,
      tabIndex,
    });

    if (urlForTab) {
      navigate({
        to: urlForTab,
        ...(isLegacy && { search: { isLegacy: true } }),
      });
    }
    updateStyles();
  };

  const handleTabChange = (tabIn: number) => {
    if (!PageMeta || !defaultType || !currentPlatform) return;

    if (tabIn === 0) {
      setAndNavigateTab(0);
    } else if (tabIn <= availablePlatforms.length) {
      const platformTabIndex = tabIn - 1;
      const targetPlatform = availablePlatforms[platformTabIndex];

      if (targetPlatform && currentPlatform !== targetPlatform) {
        const versionsForPlatform = getAvailableVersionsForPlatform(
          PageMeta,
          targetPlatform,
        );

        if (versionsForPlatform.length > 0) {
          updateType(versionsForPlatform[0]);
        }
      }
      setAndNavigateTab(tabIn);
    } else {
      setAndNavigateTab(tabIn);
    }
  };

  return {
    tab,
    handleTabChange,
  };
};
