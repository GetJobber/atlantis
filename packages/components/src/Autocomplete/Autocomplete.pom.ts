import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const user = userEvent.setup();

/**
 * Open the Autocomplete menu
 *
 * For default behavior (openOnFocus=true):
 *   - Clicking the input opens the menu
 *   - Use without arguments: openAutocomplete()
 *
 * For openOnFocus=false:
 *   - Clicking focuses but doesn't open
 *   - Use with method argument to specify how to open: openAutocomplete("arrowDown")
 *   - The click focuses, then the method opens the menu
 *
 * @param method - The method to open the menu after focusing (for openOnFocus=false)
 * @param text - The text to type into the input (if method is "type")
 */
export async function openAutocomplete(
  method?: "arrowDown" | "arrowUp" | "type",
  text?: string,
) {
  const input = screen.getByRole("combobox");
  await user.click(input);

  if (method === "arrowDown") {
    await user.keyboard("{ArrowDown}");
  } else if (method === "arrowUp") {
    await user.keyboard("{ArrowUp}");
  } else if (method === "type") {
    await user.type(input, text ?? "");
  }
}

/**
 * Reopen the Autocomplete menu when already focused (after selection/close)
 * Use this instead of openAutocomplete when focus is already on the input
 * @param method - The method to reopen: "click", "arrowDown", or "arrowUp"
 */
export async function reopenAutocomplete(
  method: "click" | "arrowDown" | "arrowUp" = "click",
) {
  const input = screen.getByRole("combobox");

  if (method === "click") {
    await user.click(input);
  } else if (method === "arrowDown") {
    await user.keyboard("{ArrowDown}");
  } else if (method === "arrowUp") {
    await user.keyboard("{ArrowUp}");
  }
}

/**
 * Open the Autocomplete menu using keyboard or typing (without clicking)
 * Use this when the input is already focused (e.g., via tab navigation)
 * Specifically useful for testing openOnFocus=false behavior
 *
 * @param method - The keyboard method to open: "arrowDown", "arrowUp", or "type"
 * @param text - The text to type (if method is "type")
 */
export async function openWithKeyboard(
  method: "arrowDown" | "arrowUp" | "type",
  text?: string,
) {
  if (method === "arrowDown") {
    await user.keyboard("{ArrowDown}");
  } else if (method === "arrowUp") {
    await user.keyboard("{ArrowUp}");
  } else if (method === "type") {
    const input = screen.getByRole("combobox");
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
  await user.click(screen.getByRole("combobox"));
}

export async function closeAutocomplete() {
  await user.keyboard("{Escape}");
}

export async function typeInInput(text: string) {
  await user.type(screen.getByRole("combobox"), text);
}

export async function deleteInput(times: number) {
  await user.keyboard("{Backspace}".repeat(times));
}

export async function clearInput() {
  await user.clear(screen.getByRole("combobox"));
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

export function getInput() {
  return screen.getByRole("combobox") as HTMLInputElement;
}

export async function clickOnElement(text: string) {
  await user.click(screen.getByText(text));
}

export async function clickOnInput() {
  await user.click(getInput());
}

export async function tabToInput() {
  await user.tab();
  await user.tab();
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
