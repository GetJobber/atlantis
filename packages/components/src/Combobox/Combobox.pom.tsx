import { screen } from "@testing-library/react";

export function getOption(label: string) {
  return screen.getByText(label).parentElement as HTMLElement;
}
