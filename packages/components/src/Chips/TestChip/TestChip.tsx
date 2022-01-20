// DELETE ME: For testing purposes, delete before putting up for review
// TODO: Move to MDX playground as an example

import React, { useState } from "react";
import { useCollectionQuery } from "@jobber/hooks";
import {
  LIST_QUERY,
  ListQueryType,
  apolloClient,
  getLoadingState,
} from "./utils";
import { Chip, Chips } from "..";
import { Avatar } from "../../Avatar";

export function TestChip() {
  const [options, setOptions] = useState([
    "Darryl Tec",
    "Chris Murray",
    "Rebecca Li",
    "Katie-Lynn Kimble",
    "Adam Bobadam",
    "Deep Vishwas",
    "Eddy Sims",
    "Selina Wang",
    "Wang Yi",
    "Queena Zhang",
    "Chen Chen",
    "Juan Pablo",
    "Robby Tiu",
    "Michael Paradis",
    "Konstantin Rakitine",
    "Hoss Talebi",
    "Lori-Anne Morgan",
  ]);
  const [selected, setSelected] = useState([options[0]]);

  const {
    data,
    error,
    refresh,
    nextPage,
    loadingRefresh,
    loadingNextPage,
    loadingInitialContent,
  } = useCollectionQuery<ListQueryType>({
    // useCollectionQuery should be called with the query type, and
    // optionally, the subscription type. The playground errors with
    // typing included, so typing has been removed in this example.
    // Please see the first example for appropriate typing.
    query: LIST_QUERY,
    queryOptions: {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
      // eslint-disable-next-line
      // @ts-ignore
      client: apolloClient,
    },
    getCollectionByPath(items) {
      return items && items.allPlanets;
    },
  });

  const { loadingStatus, loading } = getLoadingState(
    loadingInitialContent,
    loadingRefresh,
    loadingNextPage,
  );

  let items: string[] = [];

  if (data) {
    items = data.allPlanets.edges.map(edge => {
      return edge.node.name;
    });
  }

  return (
    <Chips
      type="dismissible"
      selected={selected}
      onChange={setSelected}
      onCustomAdd={handleCustomAdd}
      onClick={(_, v) => alert(v)}
      onSearch={v => console.log(v)}
      onLoadMore={() => nextPage()}
    >
      {items.map(name => (
        <Chip
          key={name}
          prefix={<Avatar initials={getInitials(name)} />}
          label={name}
          value={name}
        />
      ))}
    </Chips>
  );

  function getInitials(name: string) {
    return name
      .split(" ")
      .map(initial => initial[0])
      .join("");
  }

  function handleCustomAdd(value: string) {
    setOptions([...options, value]);
    setSelected([...selected, value]);
  }
}
