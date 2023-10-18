import { useCallback, useState } from "react";

export const useBool = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState(current => !current), []);

  return [state, setTrue, setFalse, toggle] as const;
};
