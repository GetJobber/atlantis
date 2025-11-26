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
