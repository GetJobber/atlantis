import { useBool } from "./useBool";

export function useToggle(initialState = false) {
  const [state, , , toggle] = useBool(initialState);

  return [state, toggle] as const;
}
