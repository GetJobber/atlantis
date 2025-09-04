import { useCallback, useMemo, useState } from "react";

/**
 * Shared version state synced with URL.
 * - Accepts optional count for clamping
 * - Reads human version (?version=N) and converts to 0-based index
 * - Writes human version back to URL; omits when v1
 */
export const usePageVersion = (maxVersions?: number) => {
  const [index, setIndex] = useState(() => {
    try {
      const qp = new URLSearchParams(window.location.search);
      const param = qp.get("version");
      const requestedHuman = param != null ? parseInt(param, 10) : 1;
      const requested = Number.isFinite(requestedHuman)
        ? requestedHuman - 1
        : 0;
      const max = (maxVersions ?? 1) - 1;
      const clamped = Number.isFinite(requested)
        ? Math.max(0, Math.min(requested, Math.max(0, max)))
        : 0;

      return clamped;
    } catch {
      return 0;
    }
  });

  const setVersionIndex = useCallback((next: number) => {
    setIndex(next);

    const params = new URLSearchParams(window.location.search);

    if (next === 0) {
      params.delete("version");
    } else {
      params.set("version", String(next + 1));
    }

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  }, []);

  const human = useMemo(() => index + 1, [index]);

  return { index, human, setIndex: setVersionIndex };
};
