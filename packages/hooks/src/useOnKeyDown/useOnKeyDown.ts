import useEventListener from "@use-it/event-listener";
import { XOR } from "ts-xor";

type SimpleKeyComparator = globalThis.KeyboardEvent["key"];

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
  callback: (event: globalThis.KeyboardEvent) => void,
  keys: KeyComparator[] | KeyComparator,
) {
  // Pending: https://github.com/donavon/use-event-listener/pull/12
  // The types in useEventListener mistakenly require a SyntheticEvent for the passed generic.
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  useEventListener<KeyboardEvent>("keydown", handler);

  function handler(event: globalThis.KeyboardEvent) {
    const keyboardEvent = (event as unknown) as VerboseKeyComparator;
    if (typeof keys === "string" && keyboardEvent.key === keys) {
      callback(event);
    }
    if (
      Array.isArray(keys) &&
      keys.some(item => {
        if (typeof item === "string") return keyboardEvent.key === item;
        return Object.keys(item).every(
          index => keyboardEvent[index] === item[index],
        );
      })
    ) {
      callback(event);
    }
    if (
      !Array.isArray(keys) &&
      typeof keys !== "string" &&
      Object.keys(keys).every(index => keyboardEvent[index] === keys[index])
    ) {
      callback(event);
    }
  }
}
