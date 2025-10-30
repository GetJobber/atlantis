import type { ChangeEvent, KeyboardEvent, MutableRefObject } from "react";
import { act, renderHook } from "@testing-library/react";
import { useInternalChipDismissibleInput } from "../useInternalChipDismissibleInput";

const handleOptionSelect = jest.fn(value => value);
const handleCustomOptionSelect = jest.fn(value => value);
const handleSearch = jest.fn(value => value);

beforeEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

const chips = ["Amazing", "Fabulous", "Magical"];

const hookParams = {
  attachTo: document.body as unknown as HTMLElement,
  options: chips.map(chip => ({ label: chip, value: chip })),
  isLoadingMore: false,
  onOptionSelect: handleOptionSelect,
  onCustomOptionSelect: handleCustomOptionSelect,
  onSearch: handleSearch,
  autoSelectOnClickOutside: false,
  onlyShowMenuOnSearch: false,
};

async function setupHook(params?: Partial<typeof hookParams>) {
  const { result } = renderHook(() =>
    useInternalChipDismissibleInput({ ...hookParams, ...params }),
  );

  await act(async () => {
    (
      result.current.inputRef as MutableRefObject<HTMLInputElement | null>
    ).current = document.createElement("input");
  });

  return result;
}

describe("Initial State", () => {
  it("should initialize with default values", async () => {
    const result = await setupHook();
    expect(result.current.searchValue).toBe("");
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.showInput).toBe(false);
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.allOptions).toEqual(
      expect.arrayContaining(
        hookParams.options.map(opt => ({ ...opt, custom: false })),
      ),
    );
  });
});

describe("handleReset", () => {
  it("should reset active index and search value", async () => {
    const result = await setupHook();

    const initialValue = "I am here!";
    await act(async () => {
      result.current.handleOpenMenu();
      result.current.handleSearchChange(fakeChangeEvent(initialValue));
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.searchValue).toBe(initialValue);
    expect(result.current.activeIndex).toBe(1);
    expect(result.current.menuOpen).toBe(true);

    await act(async () => result.current.handleReset());
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.searchValue).toBe("");
    expect(result.current.menuOpen).toBe(true);
  });

  it("should keep active index at 0 if it's already 0", async () => {
    const result = await setupHook();

    expect(result.current.activeIndex).toBe(0);
    expect(result.current.searchValue).toBe("");

    await act(async () => result.current.handleReset());

    expect(result.current.activeIndex).toBe(0);
    expect(result.current.searchValue).toBe("");
  });

  it("should close the menu if onlyShowMenuOnSearch is true", async () => {
    const result = await setupHook({ onlyShowMenuOnSearch: true });

    await act(async () => result.current.handleShowInput());
    await act(async () =>
      result.current.handleSearchChange(fakeChangeEvent("test")),
    );
    await act(async () => jest.advanceTimersByTime(300));

    expect(result.current.menuOpen).toBe(true);

    await act(async () => result.current.handleReset());

    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.searchValue).toBe("");
  });
});

describe("handleOpenMenu", () => {
  it("should open the menu", async () => {
    const result = await setupHook();
    expect(result.current.menuOpen).toBe(false);

    await act(async () => result.current.handleOpenMenu());
    expect(result.current.menuOpen).toBe(true);
  });
});

describe("handleCloseMenu", () => {
  it("should reset active index and close the menu", async () => {
    const result = await setupHook();
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);

    await act(async () => {
      result.current.handleOpenMenu();
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(1);

    await act(async () => result.current.handleCloseMenu());
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
  });
});

describe("handleBlur", () => {
  it("should allow blur, close menu and reset state", async () => {
    const result = await setupHook();

    await act(async () => {
      result.current.handleOpenMenu();
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(1);

    await act(async () => result.current.handleBlur());
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
  });

  it("should not reset the menu open and active index when blurring is disabled", async () => {
    const result = await setupHook();

    await act(async () => {
      result.current.handleOpenMenu();
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    await act(async () =>
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
    );
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(2);

    await act(async () => result.current.handleCancelBlur());
    await act(async () => result.current.handleBlur());
    expect(result.current.shouldCancelBlur).toBe(true);
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(2);
  });
  describe("when autoSelectOnClickOutside is true", () => {
    it("should submit the custom option on blur when a custom option can be added", async () => {
      const result = await setupHook({ autoSelectOnClickOutside: true });
      const searchValue = "NewValue";

      await act(async () => {
        result.current.handleOpenMenu();
        result.current.handleSearchChange(fakeChangeEvent(searchValue));
        result.current.handleDebouncedSearch(searchValue, hookParams.options);
      });
      expect(result.current.searchValue).toBe(searchValue);
      expect(result.current.menuOpen).toBe(true);

      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      await act(async () => result.current.handleBlur());
      expect(handleCustomOptionSelect).toHaveBeenCalledWith(searchValue);
      expect(handleOptionSelect).not.toHaveBeenCalled();
      expect(result.current.menuOpen).toBe(false);
      expect(result.current.activeIndex).toBe(0);
      expect(result.current.searchValue).toBe("");
    });

    it("should submit the first option on blur when custom option cannot be added", async () => {
      const result = await setupHook({
        autoSelectOnClickOutside: true,
        onCustomOptionSelect: undefined,
      });
      const searchValue = "Ama";

      await act(async () => {
        result.current.handleOpenMenu();
        result.current.handleSearchChange(fakeChangeEvent(searchValue));
      });
      expect(result.current.searchValue).toBe(searchValue);
      expect(result.current.menuOpen).toBe(true);
      expect(result.current.allOptions[0].value).toBe(chips[0]);

      await act(async () => result.current.handleBlur());
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[0]);
      expect(handleCustomOptionSelect).not.toHaveBeenCalled();
      expect(result.current.menuOpen).toBe(false);
      expect(result.current.activeIndex).toBe(0);
      expect(result.current.searchValue).toBe("");
    });

    it("should not submit anything on blur when search value is empty", async () => {
      const result = await setupHook({ autoSelectOnClickOutside: true });

      await act(async () => {
        result.current.handleOpenMenu();
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown"));
      });
      expect(result.current.searchValue).toBe("");
      expect(result.current.menuOpen).toBe(true);
      expect(result.current.activeIndex).toBe(1);

      await act(async () => result.current.handleBlur());
      expect(handleCustomOptionSelect).not.toHaveBeenCalled();
      expect(handleOptionSelect).not.toHaveBeenCalled();
      expect(result.current.menuOpen).toBe(false);
      expect(result.current.activeIndex).toBe(0);
    });

    it("should not submit anything on blur when search value exists but there are no options", async () => {
      const result = await setupHook({
        autoSelectOnClickOutside: true,
        options: [],
      });
      const searchValue = "NoMatch";

      await act(async () => {
        result.current.handleOpenMenu();
        result.current.handleSearchChange(fakeChangeEvent(searchValue));
      });
      expect(result.current.searchValue).toBe(searchValue);
      expect(result.current.menuOpen).toBe(true);
      expect(result.current.allOptions.length).toBe(0);

      await act(async () => result.current.handleBlur());
      expect(handleCustomOptionSelect).not.toHaveBeenCalled();
      expect(handleOptionSelect).not.toHaveBeenCalled();
      expect(result.current.menuOpen).toBe(false);
      expect(result.current.activeIndex).toBe(0);
      expect(result.current.searchValue).toBe("");
    });
  });

  describe("when onlyShowMenuOnSearch is true", () => {
    const onlyShowMenuParams = { ...hookParams, onlyShowMenuOnSearch: true };

    it("should set showInput to false when blurring", async () => {
      const result = await setupHook(onlyShowMenuParams);

      await act(async () => result.current.handleShowInput()); // Input is shown first
      expect(result.current.showInput).toBe(true);
      expect(result.current.searchValue).toBe("");

      await act(async () => {
        if (result.current.inputRef.current) {
          result.current.inputRef.current.value = "";
        }
        result.current.handleBlur();
      });

      expect(result.current.showInput).toBe(false);
      expect(result.current.menuOpen).toBe(false);
      expect(result.current.activeIndex).toBe(0);
      expect(result.current.searchValue).toBe("");
    });

    it("should open the menu after a delay when search value is not empty", async () => {
      const { result } = renderHook(() =>
        useInternalChipDismissibleInput(onlyShowMenuParams),
      );

      expect(result.current.menuOpen).toBe(false);

      await act(async () => {
        result.current.handleSearchChange(fakeChangeEvent("test"));
        jest.advanceTimersByTime(300);
      });
      expect(result.current.menuOpen).toBe(true);
    });

    it("should close the menu when search value becomes empty", async () => {
      const { result } = renderHook(() =>
        useInternalChipDismissibleInput(onlyShowMenuParams),
      );

      await act(async () => {
        result.current.handleSearchChange(fakeChangeEvent("test"));
        jest.advanceTimersByTime(300);
      });
      expect(result.current.menuOpen).toBe(true);

      await act(async () =>
        result.current.handleSearchChange(fakeChangeEvent("")),
      );
      expect(result.current.menuOpen).toBe(false);
    });
  });
});

describe("handleSearchChange", () => {
  it("should set the searchValue", async () => {
    const result = await setupHook();

    const value = "test value";
    await act(async () =>
      result.current.handleSearchChange(fakeChangeEvent(value)),
    );
    expect(result.current.searchValue).toBe(value);
  });

  it("should reset the active index to 0", async () => {
    const result = await setupHook();

    await act(async () =>
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
    );
    expect(result.current.activeIndex).toBe(1);

    await act(async () =>
      result.current.handleSearchChange(fakeChangeEvent("test")),
    );
    expect(result.current.activeIndex).toBe(0);
  });

  it("should set shouldCancelEnter to true", async () => {
    const result = await setupHook();

    await act(async () => {
      result.current.handleSearchChange(fakeChangeEvent("initial"));
      result.current.handleDebouncedSearch("initial", hookParams.options);
    });
    await act(async () => jest.advanceTimersByTime(300));
    await act(async () =>
      result.current.handleSearchChange(fakeChangeEvent("new search")),
    );
    await act(async () =>
      result.current.handleKeyDown(fakeKeyDownEvent("Enter")),
    );
    expect(handleOptionSelect).not.toHaveBeenCalled();
  });

  describe("with onlyShowMenuOnSearch=true", () => {
    const onlyShowMenuParams = { ...hookParams, onlyShowMenuOnSearch: true };

    it("should open the menu when search value is not empty", async () => {
      const { result } = renderHook(() =>
        useInternalChipDismissibleInput(onlyShowMenuParams),
      );

      expect(result.current.menuOpen).toBe(false);

      await act(async () => {
        result.current.handleSearchChange(fakeChangeEvent("test"));
        jest.advanceTimersByTime(300);
      });

      expect(result.current.menuOpen).toBe(true);
    });

    it("should close the menu when search value becomes empty", async () => {
      const { result } = renderHook(() =>
        useInternalChipDismissibleInput(onlyShowMenuParams),
      );

      await act(async () => {
        result.current.handleSearchChange(fakeChangeEvent("test"));
        jest.advanceTimersByTime(300);
      });
      expect(result.current.menuOpen).toBe(true);

      await act(async () =>
        result.current.handleSearchChange(fakeChangeEvent("")),
      );
      expect(result.current.menuOpen).toBe(false);
    });

    describe("when onlyShowMenuOnSearch is true and search value is empty", () => {
      it("should not handle selections", async () => {
        const { result } = renderHook(() =>
          useInternalChipDismissibleInput(onlyShowMenuParams),
        );

        expect(result.current.searchValue).toBe("");

        await act(async () => {
          result.current.handleOpenMenu();
          result.current.handleSetActiveOnMouseOver(1)();
        });

        const initialActiveIndex = result.current.activeIndex;
        expect(initialActiveIndex).toBe(1);

        await act(async () =>
          result.current.handleKeyDown(fakeKeyDownEvent("Enter")),
        );
        expect(handleOptionSelect).not.toHaveBeenCalled();

        await act(async () =>
          result.current.handleKeyDown(fakeKeyDownEvent("Tab")),
        );
        expect(handleOptionSelect).not.toHaveBeenCalled();

        await act(async () =>
          result.current.handleKeyDown(fakeKeyDownEvent(",")),
        );
        expect(handleCustomOptionSelect).not.toHaveBeenCalled();
      });

      it("should not change active index", async () => {
        const { result } = renderHook(() =>
          useInternalChipDismissibleInput(onlyShowMenuParams),
        );

        await act(async () => {
          result.current.handleOpenMenu();
          result.current.handleSetActiveOnMouseOver(1)();
        });

        const initialActiveIndex = result.current.activeIndex;
        expect(initialActiveIndex).toBe(1);

        await act(async () =>
          result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
        );
        expect(result.current.activeIndex).toBe(initialActiveIndex);

        await act(async () =>
          result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")),
        );
        expect(result.current.activeIndex).toBe(initialActiveIndex);
      });
    });
  });

  describe("with onlyShowMenuOnSearch=false", () => {
    it("should not affect menu state when search value changes", async () => {
      const result = await setupHook({ onlyShowMenuOnSearch: false });

      expect(result.current.menuOpen).toBe(false);

      await act(async () =>
        result.current.handleSearchChange(fakeChangeEvent("test")),
      );
      expect(result.current.menuOpen).toBe(false);

      await act(async () => result.current.handleOpenMenu());
      expect(result.current.menuOpen).toBe(true);

      await act(async () =>
        result.current.handleSearchChange(fakeChangeEvent("")),
      );
      expect(result.current.menuOpen).toBe(true);
    });
  });
});

describe("setSearchValue", () => {
  it("should set the searchValue", async () => {
    const result = await setupHook();

    const value = "🍩";
    await act(async () =>
      result.current.handleSearchChange(fakeChangeEvent(value)),
    );
    expect(result.current.searchValue).toBe(value);
  });

  it("should reset the active index on search", async () => {
    const result = await setupHook();

    await act(async () =>
      result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
    );
    expect(result.current.activeIndex).toBe(1);

    await act(async () =>
      result.current.handleSearchChange(fakeChangeEvent("🍩")),
    );
    expect(result.current.activeIndex).toBe(0);
  });
});

describe("handleSetActiveOnMouseOver", () => {
  it("should return a function", async () => {
    const result = await setupHook();
    expect(result.current.handleSetActiveOnMouseOver(2)).toEqual(
      expect.any(Function),
    );
  });

  it("should update the active index", async () => {
    const result = await setupHook();
    await act(async () => {
      result.current.handleSetActiveOnMouseOver(2)();
    });
    expect(result.current.activeIndex).toEqual(2);
  });
});

describe("Selecting an option", () => {
  it("should only trigger the onOptionSelect callback when the value is from the option provided", async () => {
    const result = await setupHook();
    const selectedOption = result.current.allOptions[2];
    expect(selectedOption.custom).toBe(false);
    await act(async () => result.current.handleSelectOption(selectedOption));
    expect(handleOptionSelect).toHaveBeenCalledWith(selectedOption.value);
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  it("should only trigger the onCustomOptionSelect callback when the value is custom", async () => {
    const result = await setupHook();

    const value = "🍩";
    const selectedOption = { label: value, value, custom: true };
    await act(async () => result.current.handleSelectOption(selectedOption));
    expect(handleCustomOptionSelect).toHaveBeenCalledWith(selectedOption.value);
    expect(handleCustomOptionSelect).toHaveBeenCalledWith(value);
    expect(handleOptionSelect).not.toHaveBeenCalled();
  });

  it("should not do anything when you press enter and there's no search value nor options to select", async () => {
    const result = await setupHook({ options: [] });
    await act(async () =>
      result.current.handleKeyDown(fakeKeyDownEvent("Enter")),
    );
    expect(handleOptionSelect).not.toHaveBeenCalled();
    expect(handleCustomOptionSelect).not.toHaveBeenCalled();
  });

  describe("handleKeyDown", () => {
    it("should select the first option on 'Enter'", async () => {
      const result = await setupHook();
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("Enter")),
      );
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[0]);
    });

    it("should select the active option on 'Tab'", async () => {
      const result = await setupHook();
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
      );
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("Tab")),
      );
      expect(handleOptionSelect).toHaveBeenCalledWith(chips[1]);
    });

    it("should add the typed text on 'Comma'", async () => {
      const result = await setupHook();
      const value = "Marvelous";
      await act(async () =>
        result.current.handleSearchChange(fakeChangeEvent(value)),
      );
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent(",")),
      );
      expect(handleCustomOptionSelect).toHaveBeenCalledWith(value);
      expect(handleOptionSelect).not.toHaveBeenCalled();
    });

    it("should not add an empty string 'Comma'", async () => {
      const result = await setupHook();
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent(",")),
      );
      expect(handleCustomOptionSelect).not.toHaveBeenCalled();
      expect(handleOptionSelect).not.toHaveBeenCalled();
    });

    it("should increment the active index by one on 'ArrowDown'", async () => {
      const result = await setupHook();
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
      );
      expect(result.current.activeIndex).toBe(1);

      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
      );
      expect(result.current.activeIndex).toBe(2);
    });

    it("should decrement the active index by one on 'ArrowUp'", async () => {
      const result = await setupHook();
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
      );
      expect(result.current.activeIndex).toBe(1);

      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")),
      );
      expect(result.current.activeIndex).toBe(0);
    });

    it("should go to the last index when the active index is at 0 and you press 'ArrowUp'", async () => {
      const result = await setupHook();
      expect(result.current.activeIndex).toBe(0);
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")),
      );
      expect(result.current.activeIndex).toBe(chips.length - 1);
    });

    it("should go to the first index when the active index is at the last option and you press 'ArrowDown'", async () => {
      const result = await setupHook();
      expect(result.current.activeIndex).toBe(0);
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowUp")),
      );
      expect(result.current.activeIndex).toBe(chips.length - 1);
      await act(async () =>
        result.current.handleKeyDown(fakeKeyDownEvent("ArrowDown")),
      );
      expect(result.current.activeIndex).toBe(0);
    });
  });
});

describe("handleShowInput", () => {
  it("should set showInput to true", async () => {
    const result = await setupHook();
    expect(result.current.showInput).toBe(false);
    await act(async () => result.current.handleShowInput());
    expect(result.current.showInput).toBe(true);
  });

  it("should open menu when onlyShowMenuOnSearch is false", async () => {
    const result = await setupHook({ onlyShowMenuOnSearch: false });
    expect(result.current.showInput).toBe(false);
    expect(result.current.menuOpen).toBe(false);

    await act(async () => result.current.handleShowInput());

    expect(result.current.showInput).toBe(true);
    expect(result.current.menuOpen).toBe(true);
  });

  it("should not open menu when onlyShowMenuOnSearch is true", async () => {
    const result = await setupHook({ onlyShowMenuOnSearch: true });
    expect(result.current.showInput).toBe(false);
    expect(result.current.menuOpen).toBe(false);

    await act(async () => result.current.handleShowInput());

    expect(result.current.showInput).toBe(true);
    expect(result.current.menuOpen).toBe(false);
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
