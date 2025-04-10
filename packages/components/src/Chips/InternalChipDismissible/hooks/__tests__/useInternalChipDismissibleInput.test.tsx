import { ChangeEvent, KeyboardEvent } from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useInternalChipDismissibleInput } from "../useInternalChipDismissibleInput";

const handleOptionSelect = jest.fn(value => value);
const handleCustomOptionSelect = jest.fn(value => value);
const handleSearch = jest.fn(value => value);

const chips = ["Amazing", "Fabulous", "Magical"];

const hookParams = {
  attachTo: { current: undefined },
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

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("useInternalChipDismissibleInput", () => {
  describe("handleReset", () => {
    it("should reset active index and search value", () => {
      const result = setupHook();
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

  describe("menu controls", () => {
    it("handleOpenMenu should open the menu", () => {
      const result = setupHook();
      expect(result.current.menuOpen).toBe(false);

      act(() => result.current.handleOpenMenu());
      expect(result.current.menuOpen).toBe(true);
    });

    it("handleCloseMenu should reset active index and close the menu", () => {
      const result = setupHook();
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

      act(() => result.current.handleBlur());
      expect(result.current.menuOpen).toBe(false);
      expect(result.current.activeIndex).toBe(0);
    });

    it("should not reset menu state if shouldCancelBlur is true", () => {
      const result = setupHook();

      act(() => {
        result.current.handleOpenMenu();
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
        result.current.handleCancelBlur();
      });

      act(() => result.current.handleBlur());

      expect(result.current.shouldCancelBlur).toBe(true);
      expect(result.current.menuOpen).toBe(true);
      expect(result.current.activeIndex).toBe(1);
    });

    it("should allow enabling blur again", () => {
      const result = setupHook();
      act(() => {
        result.current.handleCancelBlur();
        result.current.handleEnableBlur();
      });

      expect(result.current.shouldCancelBlur).toBe(false);
    });

    it("should select fallback option if submitInputOnFocusShift is true", () => {
      const result = setupHook({
        submitInputOnFocusShift: true,
      });

      act(() => result.current.handleSearchChange(fakeChangeEvent("Mag")));
      act(() => result.current.handleBlur());

      expect(handleOptionSelect).toHaveBeenCalledWith("Magical");
    });

    it("should select custom option if submitInputOnFocusShift and custom option is enabled", () => {
      const result = setupHook({
        submitInputOnFocusShift: true,
      });

      const value = "Mystical";

      act(() => {
        result.current.handleSearchChange(fakeChangeEvent(value));
      });

      act(() => {
        result.current.handleDebouncedSearch(value, []);
        jest.runAllTimers();
      });

      act(() => {
        result.current.handleBlur();
      });

      expect(handleCustomOptionSelect).toHaveBeenCalledWith(value);
    });
  });

  describe("handleSearchChange", () => {
    it("should update the searchValue and reset index", () => {
      const result = setupHook();

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(1);

      act(() => result.current.handleSearchChange(fakeChangeEvent("🍩")));
      expect(result.current.searchValue).toBe("🍩");
      expect(result.current.activeIndex).toBe(0);
    });

    it("should toggle menu open state with onlyShowMenuOnSearch", () => {
      const result = setupHook({ onlyShowMenuOnSearch: true });

      act(() => result.current.handleSearchChange(fakeChangeEvent("Hello")));
      expect(result.current.menuOpen).toBe(true);

      act(() => result.current.handleSearchChange(fakeChangeEvent("")));
      expect(result.current.menuOpen).toBe(false);
    });
  });

  describe("handleSetActiveOnMouseOver", () => {
    it("should set active index", () => {
      const result = setupHook();
      act(() => result.current.handleSetActiveOnMouseOver(2)());
      expect(result.current.activeIndex).toBe(2);
    });
  });

  describe("handleSelectOption", () => {
    it("should call onOptionSelect", () => {
      const result = setupHook();
      const option = result.current.allOptions[1];

      act(() => result.current.handleSelectOption(option));
      expect(handleOptionSelect).toHaveBeenCalledWith(option.value);
    });

    it("should call onCustomOptionSelect", () => {
      const result = setupHook();
      const option = {
        value: "🍩",
        label: "🍩",
        custom: true,
        prefix: undefined,
      };

      act(() => result.current.handleSelectOption(option));
      expect(handleCustomOptionSelect).toHaveBeenCalledWith("🍩");
    });

    it("should do nothing if no options exist", () => {
      const result = setupHook({ options: [] });

      act(() =>
        result.current.handleSelectOption({
          label: "Ghost",
          value: "Ghost",
          custom: false,
        }),
      );

      expect(handleOptionSelect).not.toHaveBeenCalled();
    });
  });

  describe("handleKeyDown", () => {
    it("should ignore if shift key is pressed", () => {
      const result = setupHook();

      const event = {
        key: "Enter",
        preventDefault: jest.fn(),
        shiftKey: true,
      } as unknown as KeyboardEvent<HTMLInputElement>;

      act(() => result.current.handleKeyDown(event));
      expect(handleOptionSelect).not.toHaveBeenCalled();
    });

    it("should handle Enter, Tab, Comma, ArrowDown, ArrowUp", () => {
      const result = setupHook();

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(1);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")));
      expect(result.current.activeIndex).toBe(0);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")));
      expect(result.current.activeIndex).toBe(chips.length - 1);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")));
      expect(result.current.activeIndex).toBe(0);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("Enter")));
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[0]);

      act(() => result.current.handleKeyDown(fakeKeyDownEvent("Tab")));
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[0]);

      const value = "Xylophonic";

      act(() => {
        result.current.handleSearchChange(fakeChangeEvent(value));
      });

      act(() => {
        result.current.handleDebouncedSearch(value, []);
        jest.runAllTimers();
      });

      act(() => {
        result.current.handleKeyDown(fakeKeyDownEvent(","));
      });

      expect(handleCustomOptionSelect).toHaveBeenCalledWith(value);

      act(() => result.current.handleSearchChange(fakeChangeEvent("")));
      act(() => result.current.handleKeyDown(fakeKeyDownEvent(",")));
      expect(handleCustomOptionSelect).toHaveBeenCalledTimes(1);
    });

    it("should focus previous element on Backspace when empty", () => {
      const result = setupHook();

      const sibling = document.createElement("button");
      sibling.focus = jest.fn();

      const input = document.createElement("input");
      Object.defineProperty(input, "previousElementSibling", {
        value: sibling,
      });

      result.current.inputRef.current = input;

      act(() => result.current.handleSearchChange(fakeChangeEvent("")));
      act(() => result.current.handleKeyDown(fakeKeyDownEvent("Backspace")));

      expect(sibling.focus).toHaveBeenCalled();
    });
  });

  describe("generateDescendantId", () => {
    it("should return a valid id", () => {
      const result = setupHook();
      const id = result.current.generateDescendantId(3);
      expect(id).toBe(`${result.current.menuId}-3`);
    });
  });

  describe("handleDebouncedSearch", () => {
    it("should debounce and update options", () => {
      const result = setupHook();
      act(() => {
        result.current.handleDebouncedSearch("Magical", hookParams.options);
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(result.current.allOptions.length).toBe(1);
      expect(result.current.allOptions[0].label).toBe("Magical");
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
    preventDefault: jest.fn(),
    shiftKey: false,
  } as unknown as KeyboardEvent<HTMLInputElement>;
}
