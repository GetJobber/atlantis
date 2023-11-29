import {
  checkboxGroupReducer,
  initCheckboxGroupState,
} from "./CheckboxGroupReducer";
import { CheckboxGroupState } from "./types";

let state: CheckboxGroupState;
const checkbox1 = "checkbox1";
const checkbox2 = "checkbox2";
const checkbox3 = "checkbox3";
const childrenNames = [checkbox1, checkbox2, checkbox3];

describe("update", () => {
  beforeEach(() => {
    state = initCheckboxGroupState(childrenNames);
  });

  it("should update childrenChecked", () => {
    const result = checkboxGroupReducer(state, {
      type: "Update",
      data: { childrenChecked: { [checkbox1]: true } },
    });
    expect(result).toEqual({
      ...state,
      childrenChecked: {
        ...state.childrenChecked,
        [checkbox1]: true,
      },
    });
  });
  it("should update parentChecked", () => {
    const result = checkboxGroupReducer(state, {
      type: "Update",
      data: { parentChecked: true },
    });
    expect(result).toEqual({
      ...state,
      parentChecked: true,
    });
  });
});
