import useEventListener from "@use-it/event-listener";
import { XOR } from "ts-xor";

type SimpleKeyComparator = KeyboardEvent["key"];

interface VerboseKeyComparator {
  readonly key: SimpleKeyComparator;
  readonly shiftKey?: boolean;
  readonly ctrlKey?: boolean;
  readonly altKey?: boolean;
  readonly metaKey?: boolean;
  readonly [index: string]: boolean | string | undefined;
}

type KeyComparator = XOR<VerboseKeyComparator, SimpleKeyComparator>;

export function useOnKeyDown(
  callback: (event: KeyboardEvent) => void,
  keys: KeyComparator[] | KeyComparator,
) {
  useEventListener("keydown", handler);

  function handler(event: KeyboardEvent) {
    const keyboardEvent = (event as unknown) as VerboseKeyComparator;
    if (typeof keys === "string" && keyboardEvent.key === keys) {
      callback(event);
      return;
    }

    if (
      Array.isArray(keys) &&
      keys.some((item) => {
        if (typeof item === "string") return keyboardEvent.key === item;
        return Object.keys(item).every(
          (index) => keyboardEvent[index] === item[index],
        );
      })
    ) {
      callback(event);
      return;
    }

    if (
      !Array.isArray(keys) &&
      typeof keys !== "string" &&
      Object.keys(keys).every((index) => keyboardEvent[index] === keys[index])
    ) {
      callback(event);
      return;
    }
  }
}
