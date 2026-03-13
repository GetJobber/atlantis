import UseBoolDocs, {
  toc as useBoolToc,
} from "../content/hooks/useBool.stories.mdx";
import UseBreakpointsDocs, {
  toc as useBreakpointsToc,
} from "../content/hooks/useBreakpoints.stories.mdx";
import UseCallbackRefDocs, {
  toc as useCallbackRefToc,
} from "../content/hooks/useCallbackRef.stories.mdx";
import UseCollectionQueryDocs, {
  toc as useCollectionQueryToc,
} from "../content/hooks/useCollectionQuery.stories.mdx";
import UseDebounceDocs, {
  toc as useDebounceToc,
} from "../content/hooks/useDebounce.stories.mdx";
import UseFocusTrapDocs, {
  toc as useFocusTrapToc,
} from "../content/hooks/useFocusTrap.stories.mdx";
import UseFormStateDocs, {
  toc as useFormStateToc,
} from "../content/hooks/useFormState.stories.mdx";
import UseInViewDocs, {
  toc as useInViewToc,
} from "../content/hooks/useInView.stories.mdx";
import UseIsMountedDocs, {
  toc as useIsMountedToc,
} from "../content/hooks/useIsMounted.stories.mdx";
import UseLiveAnnounceDocs, {
  toc as useLiveAnnounceToc,
} from "../content/hooks/useLiveAnnounce.stories.mdx";
import UseOnKeyDownDocs, {
  toc as useOnKeyDownToc,
} from "../content/hooks/useOnKeyDown.stories.mdx";
import UseOnMountDocs, {
  toc as useOnMountToc,
} from "../content/hooks/useOnMount.stories.mdx";
import UseRefocusOnActivatorDocs, {
  toc as useRefocusOnActivatorToc,
} from "../content/hooks/useRefocusOnActivator.stories.mdx";
import UseResizeObserverDocs, {
  toc as useResizeObserverToc,
} from "../content/hooks/useResizeObserver.stories.mdx";
import UseStepperDocs, {
  toc as useStepperToc,
} from "../content/hooks/useStepper.stories.mdx";
import UseWindowDimensionsDocs, {
  toc as useWindowDimensionsToc,
} from "../content/hooks/useWindowDimensions.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const hooksContentMap: ContentMapItems = {
  useBool: {
    intro: "useBool",
    title: "useBool",
    content: () => <UseBoolDocs />,
    toc: useBoolToc,
  },
  useBreakpoints: {
    intro: "useBreakpoints",
    title: "useBreakpoints",
    content: () => <UseBreakpointsDocs />,
    toc: useBreakpointsToc,
  },
  useCallbackRef: {
    intro: "useCallbackRef",
    title: "useCallbackRef",
    content: () => <UseCallbackRefDocs />,
    toc: useCallbackRefToc,
  },
  useCollectionQuery: {
    intro: "useCollectionQuery",
    title: "useCollectionQuery",
    content: () => <UseCollectionQueryDocs />,
    toc: useCollectionQueryToc,
  },
  useDebounce: {
    intro: "useDebounce",
    title: "useDebounce",
    content: () => <UseDebounceDocs />,
    toc: useDebounceToc,
  },
  useFocusTrap: {
    intro: "useFocusTrap",
    title: "useFocusTrap",
    content: () => <UseFocusTrapDocs />,
    toc: useFocusTrapToc,
  },
  useFormState: {
    intro: "useFormState",
    title: "useFormState",
    content: () => <UseFormStateDocs />,
    toc: useFormStateToc,
  },
  useInView: {
    intro: "useInView",
    title: "useInView",
    content: () => <UseInViewDocs />,
    toc: useInViewToc,
  },
  useIsMounted: {
    intro: "useIsMounted",
    title: "useIsMounted",
    content: () => <UseIsMountedDocs />,
    toc: useIsMountedToc,
  },
  useLiveAnnounce: {
    intro: "useLiveAnnounce",
    title: "useLiveAnnounce",
    content: () => <UseLiveAnnounceDocs />,
    toc: useLiveAnnounceToc,
  },
  useOnKeyDown: {
    intro: "useOnKeyDown",
    title: "useOnKeyDown",
    content: () => <UseOnKeyDownDocs />,
    toc: useOnKeyDownToc,
  },
  useOnMount: {
    intro: "useOnMount",
    title: "useOnMount",
    content: () => <UseOnMountDocs />,
    toc: useOnMountToc,
  },
  useRefocusOnActivator: {
    intro: "useRefocusOnActivator",
    title: "useRefocusOnActivator",
    content: () => <UseRefocusOnActivatorDocs />,
    toc: useRefocusOnActivatorToc,
  },
  useResizeObserver: {
    intro: "useResizeObserver",
    title: "useResizeObserver",
    content: () => <UseResizeObserverDocs />,
    toc: useResizeObserverToc,
  },
  useStepper: {
    intro: "useStepper",
    title: "useStepper",
    content: () => <UseStepperDocs />,
    toc: useStepperToc,
  },
  useWindowDimensions: {
    intro: "useWindowDimensions",
    title: "useWindowDimensions",
    content: () => <UseWindowDimensionsDocs />,
    toc: useWindowDimensionsToc,
  },
};
