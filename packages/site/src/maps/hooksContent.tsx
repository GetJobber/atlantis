import UseBoolDocs from "@atlantis/docs/hooks/useBool.stories.mdx";
import UseBreakpointsDocs from "@atlantis/docs/hooks/useBreakpoints.stories.mdx";
import UseCallbackRefDocs from "@atlantis/docs/hooks/useCallbackRef.stories.mdx";
import UseCollectionQueryDocs from "@atlantis/docs/hooks/useCollectionQuery.stories.mdx";
import UseFocusTrapDocs from "@atlantis/docs/hooks/useFocusTrap.stories.mdx";
import UseFormStateDocs from "@atlantis/docs/hooks/useFormState.stories.mdx";
import UseInViewDocs from "@atlantis/docs/hooks/useInView.stories.mdx";
import UseIsMountedDocs from "@atlantis/docs/hooks/useIsMounted.stories.mdx";
import UseLiveAnnounceDocs from "@atlantis/docs/hooks/useLiveAnnounce.stories.mdx";
import UseOnKeyDownDocs from "@atlantis/docs/hooks/useOnKeyDown.stories.mdx";
import UseOnMountDocs from "@atlantis/docs/hooks/useOnMount.stories.mdx";
import UseRefocusOnActivatorDocs from "@atlantis/docs/hooks/useRefocusOnActivator.stories.mdx";
import UseResizeObserverDocs from "@atlantis/docs/hooks/useResizeObserver.stories.mdx";
import UseWindowDimensionsDocs from "@atlantis/docs/hooks/useWindowDimensions.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const hooksContentMap: ContentMapItems = {
  useBool: {
    intro: "useBool",
    title: "useBool",
    content: () => <UseBoolDocs />,
  },
  useBreakpoints: {
    intro: "useBreakpoints",
    title: "useBreakpoints",
    content: () => <UseBreakpointsDocs />,
  },
  useCallbackRef: {
    intro: "useCallbackRef",
    title: "useCallbackRef",
    content: () => <UseCallbackRefDocs />,
  },
  useCollectionQuery: {
    intro: "useCollectionQuery",
    title: "useCollectionQuery",
    content: () => <UseCollectionQueryDocs />,
  },
  useFocusTrap: {
    intro: "useFocusTrap",
    title: "useFocusTrap",
    content: () => <UseFocusTrapDocs />,
  },
  useFormState: {
    intro: "useFormState",
    title: "useFormState",
    content: () => <UseFormStateDocs />,
  },
  useInView: {
    intro: "useInView",
    title: "useInView",
    content: () => <UseInViewDocs />,
  },
  useIsMounted: {
    intro: "useIsMounted",
    title: "useIsMounted",
    content: () => <UseIsMountedDocs />,
  },
  useLiveAnnounce: {
    intro: "useLiveAnnounce",
    title: "useLiveAnnounce",
    content: () => <UseLiveAnnounceDocs />,
  },
  useOnKeyDown: {
    intro: "useOnKeyDown",
    title: "useOnKeyDown",
    content: () => <UseOnKeyDownDocs />,
  },
  useOnMount: {
    intro: "useOnMount",
    title: "useOnMount",
    content: () => <UseOnMountDocs />,
  },
  useRefocusOnActivator: {
    intro: "useRefocusOnActivator",
    title: "useRefocusOnActivator",
    content: () => <UseRefocusOnActivatorDocs />,
  },
  useResizeObserver: {
    intro: "useResizeObserver",
    title: "useResizeObserver",
    content: () => <UseResizeObserverDocs />,
  },
  useWindowDimensions: {
    intro: "useWindowDimensions",
    title: "useWindowDimensions",
    content: () => <UseWindowDimensionsDocs />,
  },
};
