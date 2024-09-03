export type Clearable = "never" | "while-editing" | "always";
interface UseShowClearParameters {
    clearable: Clearable;
    multiline: boolean;
    focused: boolean;
    hasValue: boolean;
    disabled?: boolean;
}
export declare function useShowClear({ clearable, multiline, focused, hasValue, disabled, }: UseShowClearParameters): boolean | undefined;
export {};
