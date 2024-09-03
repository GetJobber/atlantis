/// <reference types="react" />
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
export declare function useOnKeyDown(callback: (event: KeyboardEvent) => void, keys: KeyComparator[] | KeyComparator): void;
export {};
