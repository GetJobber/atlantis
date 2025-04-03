/**
 * For playground purposes only.
 */
import uniq from "lodash/uniq";
import { useCallback, useEffect, useRef, useState } from "react";

// --- Debounce Utility ---
function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}

// --- API Response Processing Helper ---
function processApiResponse(
  results: { name: string }[],
  next: string | null,
  isSearch: boolean,
  setOptions: (updater: (prev: string[]) => string[]) => void,
  setNextGet: (url: string | null) => void,
  selected: string[],
) {
  const newOptionsData: string[] = results.map(
    (data: { name: string }) => data.name,
  );

  if (isSearch) {
    setOptions(() => uniq([...selected, ...newOptionsData]));
  } else {
    setOptions(prevOptions =>
      uniq([...selected, ...prevOptions, ...newOptionsData]),
    );
  }
  setNextGet(next || null);
}

// --- Fetch Execution Helper ---
async function executeFetchAndSetState(
  url: string,
  isSearch: boolean,
  setLoading: (loading: boolean) => void,
  setOptions: (updater: (prev: string[]) => string[]) => void,
  setNextGet: (url: string | null) => void,
  selected: string[],
) {
  if (!url) return;
  setLoading(true);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { results, next } = await response.json();
    // Delegate response processing
    processApiResponse(
      results,
      next,
      isSearch,
      setOptions,
      setNextGet,
      selected,
    );
  } catch (error) {
    console.error("[Story Utils] Failed to fetch data:", error);
    setNextGet(null);
  } finally {
    setLoading(false);
  }
}

// --- Helper Hook for Callbacks ---
function useQueryCallbacks(
  loading: boolean,
  nextGet: string | null,
  currentSearch: string,
  selected: string[],
  fetchData: (url: string, isSearch?: boolean) => void,
  debouncedSearchHandler: (searchTerm: string) => void,
  setCurrentSearch: (search: string) => void,
  setSelected: (value: string[]) => void,
  setOptions: (updater: (prev: string[]) => string[]) => void,
) {
  const handleLoadMore = useCallback(() => {
    if (loading || !nextGet) return;
    fetchData(nextGet, false);
  }, [nextGet, loading, fetchData]);

  const handleSearch = useCallback(
    (searchValue: string) => {
      const trimmedSearch = searchValue.trim();
      if (loading || trimmedSearch === currentSearch) return;

      if (trimmedSearch !== "") {
        debouncedSearchHandler(trimmedSearch);
      } else {
        if (currentSearch !== "") {
          setCurrentSearch("");
        }
      }
    },
    [currentSearch, loading, debouncedSearchHandler, setCurrentSearch],
  );

  const handleSelect = useCallback(
    (value: string[]) => {
      setSelected(value);
    },
    [setSelected],
  );

  const handleCustomAdd = useCallback(
    (value: string) => {
      const newValue = value.trim();
      if (!newValue) return;
      const newSelected = uniq([...selected, newValue]);
      setSelected(newSelected);
      setOptions(prevOptions => uniq([...prevOptions, newValue]));
    },
    [selected, setSelected, setOptions],
  );

  return {
    handleLoadMore,
    handleSearch,
    handleSelect,
    handleCustomAdd,
  };
}

// --- Main Hook ---
// eslint-disable-next-line max-statements
export function useFakeOptionQuery() {
  const [options, setOptions] = useState<string[]>([]);
  const [nextGet, setNextGet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(["Mando", "Din Djarin"]);
  const [currentSearch, setCurrentSearch] = useState<string>("");

  // Fetch Data Callback
  const fetchData = useCallback(
    (url: string, isSearch: boolean = false) => {
      executeFetchAndSetState(
        url,
        isSearch,
        setLoading,
        setOptions,
        setNextGet,
        selected,
      );
    },
    [selected, setLoading, setOptions, setNextGet],
  );

  // Debounced search execution
  const executeDebouncedSearch = useCallback(
    (searchTermUnknown: unknown) => {
      if (typeof searchTermUnknown !== "string") return;
      const searchTerm = searchTermUnknown;
      setCurrentSearch(searchTerm);
      const searchUrl = `https://swapi.dev/api/people/?format=json&search=${encodeURIComponent(
        searchTerm,
      )}`;
      fetchData(searchUrl, true);
    },
    [fetchData, setCurrentSearch],
  );

  // Debounced search handler
  const debouncedSearchHandler = useDebouncedCallback(
    executeDebouncedSearch,
    300,
  );

  // Get memoized handlers from helper hook
  const handlers = useQueryCallbacks(
    loading,
    nextGet,
    currentSearch,
    selected,
    fetchData,
    debouncedSearchHandler,
    setCurrentSearch,
    setSelected,
    setOptions,
  );

  // Initial load
  useEffect(() => {
    fetchData("https://swapi.dev/api/people/?format=json", false);
  }, [fetchData]);

  return {
    selected,
    options,
    loading,
    ...handlers,
  };
}
