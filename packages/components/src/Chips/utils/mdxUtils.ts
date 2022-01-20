import { useEffect, useState } from "react";

export function useFakeOptionQuery() {
  const [options, setOptions] = useState<string[]>([]);
  const [next, setNext] = useState(
    "https://swapi.dev/api/planets/?format=json",
  );
  const [loading, setLoading] = useState(false);

  const actions = {
    loadMore: () => {
      if (loading) return;

      setLoading(true);
      fetchPlanets(next).then(result => {
        setOptions([...options, ...result.options]);
        setNext(result.next);
        setLoading(false);
      });
    },
  };

  useEffect(() => {
    actions.loadMore();
  }, []);

  return { loading, options, ...actions };
}

async function fetchPlanets(url: string) {
  const response = await fetch(url);
  const { results, next } = await response.json();
  const options: string[] = results.map(
    (planet: { name: string }) => planet.name,
  );
  return { options, next };
}
