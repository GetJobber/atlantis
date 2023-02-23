import { ChangeEvent, KeyboardEvent } from "react";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useInternalChipDismissibleInput } from "../useInternalChipDismissibleInput";

afterEach(cleanup);

const handleOptionSelect = jest.fn(value => value);
const handleCustomOptionSelect = jest.fn(value => value);
const handleSearch = jest.fn(value => value);

const chips = ["Amazing", "Fabulous", "Magical"];

const hookParams = {
  attachTo: { current: null },
  options: chips.map(chip => ({ label: chip, value: chip })),
  isLoadingMore: false,
  onOptionSelect: handleOptionSelect,
  onCustomOptionSelect: handleCustomOptionSelect,
  onSearch: handleSearch,
};

function setupHook(params?: Partial<typeof hookParams>) {
  const { result } = renderHook(() =>
    useInternalChipDismissibleInput({ ...hookParams, ...params }),
  );
  return result;
}

describe("handleReset", () => {
  it("should reset active index and search value", () => {
    const result = setupHook();

    // set the value to no  default
    const initialValue = "I am here!";
    act(() => {
      result.current.handleSearchChange(fakeChangeEvent(initialValue));
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.searchValue).toBe(initialValue);
    expect(result.current.activeIndex).toBe(1);

    act(() => result.current.handleReset());
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.searchValue).toBe("");
  });
});

describe("handleOpenMenu", () => {
  it("should reset active index and close the menu", () => {
    const result = setupHook();
    expect(result.current.menuOpen).toBe(false);

    act(() => result.current.handleOpenMenu());
    expect(result.current.menuOpen).toBe(true);
  });
});

describe("handleCloseMenu", () => {
  it("should reset active index and close the menu", () => {
    const result = setupHook();
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);

    act(() => {
      result.current.handleOpenMenu();
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(1);

    act(() => result.current.handleCloseMenu());
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
  });
});

describe("handleBlur", () => {
  it("should allow blur", () => {
    const result = setupHook();

    act(() => {
      result.current.handleOpenMenu();
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(1);

    act(() => result.current.handleBlur());
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
  });

  it("should not reset the menu open and active index when blurring is disabled", () => {
    const result = setupHook();

    act(() => {
      result.current.handleOpenMenu();
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(2);

    act(() => result.current.handleCancelBlur());
    act(() => result.current.handleBlur());
    expect(result.current.shouldCancelBlur).toBe(true);
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(2);
  });
});

describe("setSearchValue", () => {
  it("should set the searchValue", () => {
    const result = setupHook();

    const value = "🍩";
    act(() => result.current.handleSearchChange(fakeChangeEvent(value)));
    expect(result.current.searchValue).toBe(value);
  });

  it("should reset the active index on search", () => {
    const result = setupHook();

    act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
    expect(result.current.activeIndex).toBe(1);

    act(() => result.current.handleSearchChange(fakeChangeEvent("🍩")));
    expect(result.current.activeIndex).toBe(0);
  });
});

describe("handleSetActiveOnMouseOver", () => {
  it("should return a function", () => {
    const result = setupHook();
    expect(result.current.handleSetActiveOnMouseOver(2)).toEqual(
      expect.any(Function),
    );
  });

  it("should update the active index", () => {
    const result = setupHook();
    act(() => {
      result.current.handleSetActiveOnMouseOver(2)();
    });
    expect(result.current.activeIndex).toEqual(2);
  });
});

describe("Selecting an option", () => {
  it("should only trigger the onOptionSelect callback when the value is from the option provided", () => {
    const result = setupHook();
    const selectedOption = result.current.allOptions[2];
    expect(selectedOption.custom).toBe(false);
    act(() => result.current.handleSelectOption(selectedOption));
    expect(handleOptionSelect).toHaveBeenCalledWith(selectedOption.value);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  it("should only trigger the onCustomOptionSelect callback when the value is custom", () => {
    const result = setupHook();

    const value = "🍩";
    const selectedOption = { label: value, value, custom: true };
    act(() => result.current.handleSelectOption(selectedOption));
    expect(handleCustomOptionSelect).toHaveBeenCalledWith(selectedOption.value);
    expect(handleCustomOptionSelect).toHaveBeenCalledWith(value);
    expect(handleOptionSelect).not.toHaveBeenCalled();
  });

  it("should not do anything when you press enter and there's no search value nor options to select", () => {
    const result = setupHook({ options: [] });
    act(() => result.current.handleKeyDown(fakeKeyDownEvent("Enter")));
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  describe("handleKeyDown", () => {
    it("should select the first option on 'Enter'", () => {
      const result = setupHook();
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("Enter")));
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[0]);
    });

    it("should select the active option on 'Tab'", () => {
      const result = setupHook();
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("Tab")));
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[1]);
    });

    it("should add the typed text on 'Comma' ", () => {
      const result = setupHook();
      const value = "Marvelous";
      act(() => result.current.handleSearchChange(fakeChangeEvent(value)));
      act(() => result.current.handleKeyDown(fakeKeyDownEvent(",")));
      expect(handleCustomOptionSelect).toHaveBeenCalledWith(value);
      expect(handleOptionSelect).not.toHaveBeenCalled();
    });

    it("should not add an empty string 'Comma' ", () => {
      const result = setupHook();
      act(() => result.current.handleKeyDown(fakeKeyDownEvent(",")));
      expect(handleCustomOptionSelect).not.toHaveBeenCalled();
      expect(handleOptionSelect).not.toHaveBeenCalled();
    });

    it("should increment the active index by one on 'ArrowDown'", () => {
      const result = setupHook();
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(1);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(2);
    });

    it("should decrement the active index by one on 'ArrowUp'", () => {
      const result = setupHook();
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(1);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")));
      expect(result.current.activeIndex).toBe(0);
    });

    it("should go to the last index when the active index is at 0 and you press 'ArrowUp'", () => {
      const result = setupHook();
      expect(result.current.activeIndex).toBe(0);
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")));
      expect(result.current.activeIndex).toBe(chips.length - 1);
    });

    it("should go to the first index when the active index is at the last option and you press 'ArrowDown'", () => {
      const result = setupHook();
      expect(result.current.activeIndex).toBe(0);
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")));
      expect(result.current.activeIndex).toBe(chips.length - 1);
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(0);
    });
  });
});

function fakeChangeEvent(initialValue: string) {
  return {
    currentTarget: { value: initialValue },
  } as ChangeEvent<HTMLInputElement>;
}

function fakeKeyDownEvent(key: string) {
  return {
    key: key,
    preventDefault: jest.fn,
  } as unknown as KeyboardEvent<HTMLInputElement>;
}
