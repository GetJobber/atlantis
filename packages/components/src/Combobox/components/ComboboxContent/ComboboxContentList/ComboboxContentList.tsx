import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Text } from "@jobber/components/Text";
import { Glimmer } from "@jobber/components/Glimmer";
import styles from "./ComboboxContentList.css";
import {
  ComboboxListProps,
  ComboboxOption as ComboboxOptionType,
} from "../../../Combobox.types";
import { ComboboxOption } from "../../ComboboxOption/ComboboxOption";

export function ComboboxContentList(props: ComboboxListProps): JSX.Element {
  const showOptions = !props.showEmptyState && !props.loading;
  const { listScrollState } = useScrollState(
    props.optionsListRef,
    props.options,
    props.showEmptyState,
  );

  return (
    <div
      className={classnames(
        styles.container,
        styles[listScrollState as keyof typeof styles],
      )}
    >
      {!props.showEmptyState && props.options.length > 0 && (
        <ul
          className={styles.optionsList}
          role="listbox"
          aria-multiselectable={props.multiselect}
          ref={props.optionsListRef}
        >
          {showOptions &&
            props.options.map(option => {
              return (
                <ComboboxOption
                  key={option.id}
                  id={option.id}
                  label={option.label}
                />
              );
            })}
          {props.loading && (
            <div className={styles.loadingContainer}>
              <Glimmer size="larger" />
            </div>
          )}
        </ul>
      )}
      {!props.showEmptyState && props.options.length === 0 && (
        <div className={styles.filterMessage}>
          <Text variation="subdued">
            No results for {`“${props.searchValue}”`}
          </Text>
        </div>
      )}

      {props.showEmptyState && (
        <div className={styles.emptyStateMessage}>
          <Text variation="subdued">
            {getZeroIndexStateText(props.subjectNoun)}
          </Text>
        </div>
      )}
    </div>
  );
}

function getZeroIndexStateText(subjectNoun?: string) {
  if (subjectNoun) {
    return `You don't have any ${subjectNoun} yet`;
  }

  return "No options yet";
}

function useScrollState(
  optionsListRef: React.RefObject<HTMLUListElement>,
  options: ComboboxOptionType[],
  showEmptyState: boolean,
) {
  const [listScrollState, setlistScrollState] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (optionsListRef.current) {
        const { scrollTop, clientHeight, scrollHeight } =
          optionsListRef.current;

        if (scrollHeight === clientHeight) {
          setlistScrollState("scrollNone");
        } else if (scrollTop === 0) {
          setlistScrollState("scrollTop");
        } else if (scrollTop + clientHeight === scrollHeight) {
          setlistScrollState("scrollBottom");
        } else {
          setlistScrollState("");
        }
      }
    };

    if (!showEmptyState && options.length === 0) {
      handleScroll();
    }

    if (optionsListRef.current) {
      optionsListRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (optionsListRef.current) {
        optionsListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [options]);

  return { listScrollState };
}
