import deepmerge from "deepmerge";
import { CheckboxGroupState, CheckboxGroupStateInitializer } from "./types";

interface UpdateAction {
  type: "Update";
  data: Partial<CheckboxGroupState>;
}

type CheckboxGroupAction = UpdateAction;

export function initCheckboxGroupState(
  childNames: CheckboxGroupStateInitializer,
): CheckboxGroupState {
  return {
    parentChecked: false,
    childrenChecked: childNames.reduce((acc, name) => {
      return { ...acc, [name]: false };
    }, {}),
  };
}

export function checkboxGroupReducer(
  state: CheckboxGroupState,
  action: CheckboxGroupAction,
): CheckboxGroupState {
  switch (action.type) {
    case "Update":
      return deepmerge(state, action.data);
    default:
      return state;
  }
}
