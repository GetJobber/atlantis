import { Dispatch, Reducer, ReducerAction, ReducerState } from "react";

// The types in here are effectively copied from React's internal useReducer.

/**
 * Similar to React's internal `useReducer`, however it does not manage internal
 * state so that it can be used with a controlled component.
 *
 * @param reducer - Reducer
 * @param currentState - Current controlled state.
 * @param changeHandler - Called with the result of the reducer.
 */
export function useStatelessReducer<
  R extends Reducer<ReducerState<R>, ReducerAction<R>>,
>(
  reducer: R,
  currentState: ReducerState<R>,
  changeHandler: (newValue: ReducerState<R>) => void,
): Dispatch<ReducerAction<R>> {
  return function dispatch(action: ReducerAction<R>) {
    changeHandler(reducer(currentState, action));
  };
}
