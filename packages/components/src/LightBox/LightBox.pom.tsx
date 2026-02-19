import { act, fireEvent, screen, within } from "@testing-library/react";

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

export async function goNextThenPreviousWithRealTimers(
  delayMs: number,
): Promise<void> {
  const delay = () =>
    act(async () => {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    });

  fireEvent.click(screen.getByLabelText("Next image"));
  await delay();
  fireEvent.click(screen.getByLabelText("Previous image"));
  await delay();
}

export function getSlideImagesByAlt(
  enteringAlt: string,
  exitingAlt: string,
): {
  enteringImg: HTMLElement | undefined;
  exitingImg: HTMLElement | undefined;
} {
  const lightbox = screen.getByLabelText("Lightbox");
  const thumbnailBar = screen.getByTestId("ATL-Thumbnail-Bar");
  const allImgs = within(lightbox).getAllByRole("img");
  const slideImgs = allImgs.filter(img => !thumbnailBar.contains(img));

  return {
    enteringImg: slideImgs.find(img => img.getAttribute("alt") === enteringAlt),
    exitingImg: slideImgs.find(img => img.getAttribute("alt") === exitingAlt),
  };
}

export function getSlideTransforms(
  entering: HTMLElement,
  exiting: HTMLElement,
): { enteringTransform: string; exitingTransform: string } {
  return {
    enteringTransform:
      entering.style.transform || getComputedStyle(entering).transform,
    exitingTransform:
      exiting.style.transform || getComputedStyle(exiting).transform,
  };
}
