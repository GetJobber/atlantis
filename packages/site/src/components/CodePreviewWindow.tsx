import {
  type PropsWithChildren,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const MIN_PREVIEW_HEIGHT = 160;
const DEFAULT_PREVIEW_HEIGHT = 260;

const getMaxPreviewHeight = () => {
  if (typeof window === "undefined") {
    return 720;
  }

  return Math.max(320, Math.floor(window.innerHeight * 0.75));
};

const clampHeight = (height: number) => {
  return Math.min(Math.max(height, MIN_PREVIEW_HEIGHT), getMaxPreviewHeight());
};

/**
 * Small wrapping window around the code preview that shows up at the top of the ComponentView (typically)
 * @param param0 {children: ReactNode}
 * @returns ReactNode
 */
export const CodePreviewWindow = ({ children }: PropsWithChildren) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{ startHeight: number; startY: number } | null>(
    null,
  );
  const manualHeightRef = useRef<number | null>(null);
  const [contentHeight, setContentHeight] = useState(DEFAULT_PREVIEW_HEIGHT);
  const [manualHeight, setManualHeight] = useState<number | null>(null);
  const resolvedHeight = useMemo(
    () => clampHeight(manualHeight ?? contentHeight),
    [contentHeight, manualHeight],
  );

  useEffect(() => {
    manualHeightRef.current = manualHeight;
  }, [manualHeight]);

  useEffect(() => {
    const element = contentRef.current;

    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(entries => {
      const nextHeight = entries[0]?.contentRect.height;

      if (!nextHeight || manualHeightRef.current !== null) return;

      setContentHeight(nextHeight);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = contentRef.current;

    if (!element) return;

    element.querySelectorAll("iframe").forEach(frame => {
      frame.style.height = `${resolvedHeight}px`;
      frame.style.minHeight = `${resolvedHeight}px`;
    });
  }, [resolvedHeight]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;

      if (!dragState) return;

      const nextHeight =
        dragState.startHeight + (event.clientY - dragState.startY);
      setManualHeight(clampHeight(nextHeight));
    };

    const handlePointerUp = () => {
      dragStateRef.current = null;
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const handleResizeStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
      startHeight: resolvedHeight,
      startY: event.clientY,
    };

    document.body.style.userSelect = "none";
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: "var(--space-small)",
        width: "100%",
        boxSizing: "border-box",
        padding: "var(--space-small)",
        borderRadius: "var(--radius-base)",
        backgroundColor: "var(--color-surface--background--subtle)",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${resolvedHeight}px`,
          overflow: "hidden",
          borderRadius:
            "calc(var(--radius-base) - var(--border-width-base, 1px))",
        }}
      >
        <div
          ref={contentRef}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>

      <button
        aria-label="Resize preview height"
        onDoubleClick={() => setManualHeight(null)}
        onPointerDown={handleResizeStart}
        style={{
          position: "absolute",
          right: "var(--space-smallest)",
          bottom: "var(--space-smallest)",
          display: "grid",
          placeItems: "center",
          width: "1.5rem",
          height: "1.5rem",
          padding: 0,
          border: "none",
          borderRadius: "999px",
          background: "transparent",
          color: "var(--color-text--secondary)",
          cursor: "ns-resize",
          touchAction: "none",
        }}
        type="button"
      >
        <span
          aria-hidden={true}
          style={{
            display: "block",
            width: "0.9rem",
            height: "0.9rem",
            background:
              "linear-gradient(135deg, transparent 0 35%, currentColor 35% 45%, transparent 45% 55%, currentColor 55% 65%, transparent 65% 100%)",
            opacity: 0.7,
          }}
        />
      </button>
    </div>
  );
};
