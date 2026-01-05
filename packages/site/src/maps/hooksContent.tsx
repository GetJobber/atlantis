import UseBoolDocs from "../content/hooks/useBool.stories.mdx";
import UseBreakpointsDocs from "../content/hooks/useBreakpoints.stories.mdx";
import UseCallbackRefDocs from "../content/hooks/useCallbackRef.stories.mdx";
import UseCollectionQueryDocs from "../content/hooks/useCollectionQuery.stories.mdx";
import UseDebounceDocs from "../content/hooks/useDebounce.stories.mdx";
import UseFocusTrapDocs from "../content/hooks/useFocusTrap.stories.mdx";
import UseFormStateDocs from "../content/hooks/useFormState.stories.mdx";
import UseInViewDocs from "../content/hooks/useInView.stories.mdx";
import UseIsMountedDocs from "../content/hooks/useIsMounted.stories.mdx";
import UseLiveAnnounceDocs from "../content/hooks/useLiveAnnounce.stories.mdx";
import UseOnKeyDownDocs from "../content/hooks/useOnKeyDown.stories.mdx";
import UseOnMountDocs from "../content/hooks/useOnMount.stories.mdx";
import UseRefocusOnActivatorDocs from "../content/hooks/useRefocusOnActivator.stories.mdx";
import UseResizeObserverDocs from "../content/hooks/useResizeObserver.stories.mdx";
import UseStepperDocs from "../content/hooks/useStepper.stories.mdx";
import UseWindowDimensionsDocs from "../content/hooks/useWindowDimensions.stories.mdx";
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
  useDebounce: {
    intro: "useDebounce",
    title: "useDebounce",
    content: () => <UseDebounceDocs />,
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
  useStepper: {
    intro: "useStepper",
    title: "useStepper",
    content: () => <UseStepperDocs />,
  },
  useWindowDimensions: {
    intro: "useWindowDimensions",
    title: "useWindowDimensions",
    content: () => <UseWindowDimensionsDocs />,
  },
};
