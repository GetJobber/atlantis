import { useCallback, useState } from "react";

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

export function useBool(
  initialState = false,
): [
  boolean,
  SetTrue,
  SetFalse,
  Toggle,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [state, setState] = useState(initialState);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState(current => !current), []);

  return [
    state,
    setTrue as SetTrue,
    setFalse as SetFalse,
    toggle as Toggle,
    setState,
  ];
}
