import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export async function openWithClick(ariaLabel: string): Promise<void> {
  await userEvent.click(screen.getByLabelText(ariaLabel));
  await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
}

export async function openWithIconClick(ariaLabel: string): Promise<void> {
  await userEvent.click(screen.getByTestId(ariaLabel));
  await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
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
}
