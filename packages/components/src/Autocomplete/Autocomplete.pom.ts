import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const user = userEvent.setup();

/**
 * Open the Autocomplete menu
 * @param method - The method to open the menu, only necessary if openOnFocus is false
 * @param text - The text to type into the input (if method is "type")
 */
export async function openAutocomplete(
  method?: "arrowDown" | "arrowUp" | "type",
  text?: string,
) {
  const input = getInput();
  await user.click(input);

  if (method === "arrowDown") {
    await user.keyboard("{ArrowDown}");
  } else if (method === "arrowUp") {
    await user.keyboard("{ArrowUp}");
  } else if (method === "type") {
    await user.type(input, text ?? "");
  }
}

export async function navigateDown(times: number) {
  await user.keyboard("{ArrowDown}".repeat(times));
}

export async function navigateUp(times: number) {
  await user.keyboard("{ArrowUp}".repeat(times));
}

export async function selectWithKeyboard() {
  await user.keyboard("{Enter}");
}

export async function selectWithClick(value: string) {
  await user.click(screen.getByText(value));
}

export async function focusAutocomplete() {
  await user.click(getInput());
}

export async function closeAutocomplete() {
  await user.keyboard("{Escape}");
}

export async function typeInInput(text: string) {
  await user.type(getInput(), text);
}

export async function deleteInput(times: number) {
  await user.keyboard("{Backspace}".repeat(times));
}

export async function clearInput() {
  await user.clear(getInput());
}

export async function blurAutocomplete() {
  await user.tab();
}

export async function selectAll() {
  await user.keyboard("{Control>}a{/Control}");
}

export function getActiveOption() {
  return document.querySelector(
    '[role="option"][data-active="true"]',
  ) as HTMLElement | null;
}

export function getActiveAction() {
  return document.querySelector(
    '[role="button"][data-active="true"]',
  ) as HTMLElement | null;
}

export function getSelectedOption() {
  return document.querySelector(
    '[role="option"][aria-selected="true"]',
  ) as HTMLElement | null;
}

/**
 * Wait until the Autocomplete menu is visible (accounts for transitions)
 */
export async function expectMenuShown() {
  await waitFor(() => {
    expect(screen.getByRole("listbox")).toBeVisible();
  });
}

/**
 * Wait until the Autocomplete menu is fully closed (unmounted)
 */
export async function expectMenuClosed() {
  await waitFor(() => {
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
}

/**
 * Get the input element
 */
export function getInput() {
  return screen.getByRole("combobox");
}

/**
 * Get the current input value
 */
export function getInputValue() {
  return (getInput() as HTMLInputElement).value;
}

/**
 * Expect the input to have a specific value
 */
export function expectInputValue(expectedValue: string) {
  expect(getInputValue()).toBe(expectedValue);
}
