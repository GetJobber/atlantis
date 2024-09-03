declare const brand: unique symbol;
type Callback = () => void;
export type SetTrue = Callback & {
    [brand]: "SetTrue";
};
export type SetFalse = Callback & {
    [brand]: "SetFalse";
};
export type Toggle = Callback & {
    [brand]: "Toggle";
};
export declare function useBool(initialState?: boolean): [boolean, SetTrue, SetFalse, Toggle];
export {};
