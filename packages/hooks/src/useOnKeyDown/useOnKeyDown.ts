import useEventListener from "@use-it/event-listener";
import { XOR } from "ts-xor";

type SimpleKeyComparerator = globalThis.KeyboardEvent["key"];

interface VerboseKeyComparerator {
  readonly key: SimpleKeyComparerator;
  readonly shiftKey?: boolean;
  readonly ctrlKey?: boolean;
  readonly altKey?: boolean;
  readonly metaKey?: boolean;
  readonly [index: string]: boolean | string | undefined;
}

type KeyComparerator = XOR<VerboseKeyComparerator, SimpleKeyComparerator>;

export function useOnKeyDown(
  callback: (event: globalThis.KeyboardEvent) => void,
  keys: KeyComparerator[] | KeyComparerator,
) {
  const handler: (event: globalThis.KeyboardEvent) => void = (
    event: globalThis.KeyboardEvent,
  ) => {
    const keyboardEvent = (event as unknown) as VerboseKeyComparerator;
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
  };

  // Pending: https://github.com/donavon/use-event-listener/pull/12
  // The types in useEventListener mistakenly require a SyntheticEvent for the passed generic.
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  useEventListener<KeyboardEvent>("keydown", handler);
}
