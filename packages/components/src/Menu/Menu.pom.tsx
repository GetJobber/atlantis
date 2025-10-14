import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export async function openWithClick(ariaLabel: string): Promise<void> {
  await userEvent.click(screen.getByLabelText(ariaLabel));
  await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
  await waitForAnimationToSettle();
}

export async function openWithIconClick(ariaLabel: string): Promise<void> {
  await userEvent.click(screen.getByTestId(ariaLabel));
  await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
  await waitForAnimationToSettle();
}

export async function openWithKeyboard(
  ariaLabel: string,
  key: "Enter" | "Space" = "Enter",
): Promise<void> {
  const trigger = screen.getByLabelText(ariaLabel) as HTMLElement;
  trigger.focus();
  const keyCommand = key === "Enter" ? "{Enter}" : " ";
  await userEvent.keyboard(keyCommand);
  await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
  await waitForAnimationToSettle();
}

export function getMenuItems(): HTMLElement[] {
  return screen.getAllByRole("menuitem");
}

export async function closeMenuByActivatingFirstItem(): Promise<void> {
  const menu = screen.getByRole("menu");
  await userEvent.click(getMenuItems()[0]);
  await waitForElementToBeRemoved(menu);
}

export async function getSectionHeader(text: string): Promise<HTMLElement> {
  const header = await screen.findByRole("heading", { name: text });

  if (!header) {
    throw new Error(`Header with text "${text}" not found`);
  }

  return header.closest("header") as HTMLElement;
}

export async function waitForAnimationToSettle(): Promise<void> {
  await waitFor(() => {
    const popover = document.querySelector(".react-aria-Popover");

    return !popover || !(popover as HTMLElement).hasAttribute("data-exiting");
  });
}

export async function activateFirstItemOnly(): Promise<void> {
  await userEvent.click(getMenuItems()[0]);
}

export async function waitForMenuToClose(menu?: HTMLElement): Promise<void> {
  if (menu) {
    await waitForElementToBeRemoved(menu);

    return;
  }
  await waitForElementToBeRemoved(() => screen.queryByRole("menu"));
}
