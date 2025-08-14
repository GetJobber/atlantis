import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const user = userEvent.setup();

/**
 * Open the Autocomplete menu
 * @param method - The method to open the menu
 * @param text - The text to type into the input (if method is "type")
 * Note that "click" only works if the openOnFocus prop is true
 */
export async function openAutocomplete(
  method: "arrowDown" | "arrowUp" | "type" | "click",
  text?: string,
) {
  const input = screen.getByRole("textbox");

  if (method === "arrowDown") {
    await user.click(input);
    await user.keyboard("{ArrowDown}");
  } else if (method === "arrowUp") {
    await user.click(input);
    await user.keyboard("{ArrowUp}");
  } else if (method === "type") {
    await user.click(input);
    await user.type(input, text ?? "");
  } else if (method === "click") {
    await user.click(input);
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
  await user.click(screen.getByRole("textbox"));
}

export async function closeAutocomplete() {
  await user.keyboard("{Escape}");
}

export async function typeInInput(text: string) {
  await user.type(screen.getByRole("textbox"), text);
}

export async function deleteInput(times: number) {
  await user.keyboard("{Backspace}".repeat(times));
}

export async function clearInput() {
  await user.clear(screen.getByRole("textbox"));
}

export async function blurAutocomplete() {
  await user.tab();
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
