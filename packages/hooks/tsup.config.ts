import { defineConfig } from "tsup";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  entry: [
    "src/index.ts",
    "src/useAssert/index.ts",
    "src/useBool/index.ts",
    "src/useBreakpoints/index.ts",
    "src/useCollectionQuery/index.ts",
    "src/useFormState/index.ts",
    "src/useFocusTrap/index.ts",
    "src/useInView/index.ts",
    "src/useIsMounted/index.ts",
    "src/useLiveAnnounce/index.ts",
    "src/useOnKeyDown/index.ts",
    "src/usePasswordStrength/index.ts",
    "src/useRefocusOnActivator/index.ts",
    "src/useResizeObserver/index.ts",
    "src/useSafeLayoutEffect/index.ts",
    "src/useShowClear/index.ts",
  ],
  splitting: false,
  sourcemap: true,
  clean: false,
});
