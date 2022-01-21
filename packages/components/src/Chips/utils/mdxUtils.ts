import { uniq } from "lodash";
import { useEffect, useState } from "react";

export function useFakeOptionQuery() {
  const [options, setOptions] = useState<string[]>([]);
  const initialDataUrl = "https://swapi.dev/api/people/?format=json";
  const [next, setNext] = useState(initialDataUrl);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(["Mando", "Din Djarin"]);

  const actions = {
    handleLoadMore: () => {
      if (loading || !next) return;

      setLoading(true);
      fetchData(next).then(result => {
        const newOptions = uniq([...selected, ...options, ...result.options]);
        setOptions(newOptions);
        setNext(result.next);
        setLoading(false);
      });
    },
    handleSearch: (searchValue: string) => {
      setNext(initialDataUrl + `&search=${searchValue}`);
      setOptions(selected);
    },
    handleSelect: (value: string[]) => {
      setSelected(value);
    },
    handleCustomAdd: (value: string) => {
      setSelected([...selected, value]);
    },
  };

  useEffect(() => actions.handleLoadMore(), []); // load once on mount
  useEffect(() => actions.handleLoadMore(), [next]);

  return { selected, options, loading, ...actions };
}

async function fetchData(url: string) {
  const response = await fetch(url);
  const { results, next } = await response.json();
  const options: string[] = results.map((data: { name: string }) => data.name);
  return { options, next };
}
