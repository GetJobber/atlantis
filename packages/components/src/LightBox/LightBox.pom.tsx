import { screen, within } from "@testing-library/react";

export function getCloseButton(): HTMLElement {
  return screen.getByLabelText("Close");
}

export function getNextButton(): HTMLElement | null {
  return screen.queryByLabelText("Next image");
}

export function getPreviousButton(): HTMLElement | null {
  return screen.queryByLabelText("Previous image");
}

export function getThumbnailBar(): HTMLElement | null {
  return screen.queryByTestId("ATL-Thumbnail-Bar");
}

export function getThumbnailByAlt(alt: string): HTMLElement {
  const thumbnailBar = screen.getByTestId("ATL-Thumbnail-Bar");

  return within(thumbnailBar).getByAltText(alt);
}
