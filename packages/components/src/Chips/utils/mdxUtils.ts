import uniq from "lodash/uniq";
import { useEffect, useState } from "react";

export function useFakeOptionQuery() {
  const [options, setOptions] = useState<string[]>([]);
  const initialDataGetUrl = "https://swapi.dev/api/people/?format=json";
  const [nextGet, setNextGet] = useState(initialDataGetUrl);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(["Mando", "Din Djarin"]);

  const actions = {
    handleLoadMore: () => {
      if (loading || !nextGet) return;

      setLoading(true);
      fetchData(nextGet).then(result => {
        const newOptions = uniq([...selected, ...options, ...result.options]);
        setOptions(newOptions);
        setNextGet(result.next);
        setLoading(false);
      });
    },
    handleSearch: (searchValue: string) => {
      setNextGet(initialDataGetUrl + `&search=${searchValue}`);
      setOptions(selected);
    },
    handleSelect: (value: string[]) => {
      setSelected(value);
    },
    handleCustomAdd: (value: string) => {
      setSelected(uniq([...selected, value]));
    },
  };

  useEffect(() => actions.handleLoadMore(), []); // load once on mount
  useEffect(() => actions.handleLoadMore(), [nextGet]);

  return { selected, options, loading, ...actions };
}

async function fetchData(url: string) {
  const response = await fetch(url);
  const { results, next } = await response.json();
  const options: string[] = results.map((data: { name: string }) => data.name);
  return { options, next };
}
