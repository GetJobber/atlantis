import { ChangeEvent, KeyboardEvent } from "react";
import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { useInternalChipDismissibleInput } from "../useInternalChipDismissibleInput";

afterEach(cleanup);

const handleEmptyBackspace = jest.fn();
const handleOptionSelect = jest.fn(value => value);
const handleCustomOptionSelect = jest.fn(value => value);
const handleSearch = jest.fn(value => value);

const chips = ["Amazing", "Fabulous", "Magical"];

const hookParams = {
  attachTo: { current: undefined },
  options: chips.map(chip => ({ label: chip, value: chip })),
  isLoadingMore: false,
  onEmptyBackspace: handleEmptyBackspace,
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
    const { handleReset, handleSearchChange, handleKeyDown } = result.current;

    // set the value to no  default
    const initialValue = "I am here!";
    act(() => {
      handleSearchChange(fakeChangeEvent(initialValue));
      handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.searchValue).toBe(initialValue);
    expect(result.current.activeIndex).toBe(1);

    act(() => handleReset());
    expect(result.current.activeIndex).toBe(0);
    expect(result.current.searchValue).toBe("");
  });
});

describe("handleOpenMenu", () => {
  it("should reset active index and close the menu", () => {
    const result = setupHook();
    const { handleOpenMenu } = result.current;
    expect(result.current.menuOpen).toBe(false);

    act(() => handleOpenMenu());
    expect(result.current.menuOpen).toBe(true);
  });
});

describe("handleCloseMenu", () => {
  it("should reset active index and close the menu", () => {
    const result = setupHook();
    const { handleCloseMenu, handleOpenMenu, handleKeyDown } = result.current;
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);

    act(() => {
      handleOpenMenu();
      handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(1);

    act(() => handleCloseMenu());
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
  });
});

describe("handleBlur", () => {
  it("should allow blur", () => {
    const result = setupHook();
    const { handleBlur, handleOpenMenu, handleKeyDown } = result.current;

    act(() => {
      handleOpenMenu();
      handleKeyDown(fakeKeyDownEvent("ArrowDown"));
    });
    expect(result.current.menuOpen).toBe(true);
    expect(result.current.activeIndex).toBe(1);

    act(() => handleBlur());
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
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
