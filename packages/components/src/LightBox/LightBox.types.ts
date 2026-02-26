import type { CSSProperties, ReactNode, RefObject } from "react";
import type { PanInfo } from "framer-motion";

export interface PresentedImage {
  title?: string;
  caption?: string;
  alt?: string;
  url: string;
}

export interface RequestCloseOptions {
  lastPosition: number;
}

export interface LightBoxContextType {
  readonly open: boolean;
  readonly images: PresentedImage[];
  readonly currentImageIndex: number;
  readonly mouseIsStationary: boolean;
  readonly boxSizing: CSSProperties["boxSizing"];
  readonly directionRef: RefObject<number>;
  readonly selectedThumbnailRef: RefObject<HTMLDivElement | null>;
  readonly lightboxRef: RefObject<HTMLDivElement | null>;
  readonly mounted: RefObject<boolean>;
  handleMouseMove(): void;
  handleRequestClose(): void;
  handleOnDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void;
  handleThumbnailClick(index: number): void;
  debouncedHandleNext(): void;
  debouncedHandlePrevious(): void;
}

export interface LightBoxProps {
  /**
   * Specify if the Lightbox is open or closed.
   */
  readonly open: boolean;
  /**
   * Images is an array of objects defining a LightBox image. This object consists of
   * `title`, `caption`, `alt` and `url`. `title`, `alt` and `caption` are optional, `url` is
   * required, for each image.
   */
  readonly images: PresentedImage[];
  /**
   * Use this to specify which image in `images` to initialize the lightbox with.
   * This is useful when you have a collection of thumbnails as you only need one
   * collection of image urls, order doesn't matter.
   */
  readonly imageIndex?: number;
  /**
   * This function must set open to false in order to close the lightbox. Note there
   * is a 300ms easing animation on lightbox close that occurs before this function
   * is called.
   * This function receives an object as an argument with the key `lastPosition`
   * that has the index of the image the user was on when LightBox was closed.
   */
  onRequestClose(options: RequestCloseOptions): void;
  /**
   * Sets the box-sizing for the thumbnails in the lightbox. This is a solution for a problem where
   * tailwind was setting the box-sizing to `border-box` and causing issues with the lightbox.
   * @default "content-box"
   */
  readonly boxSizing?: CSSProperties["boxSizing"];
}

export type LightBoxProviderProps = Omit<LightBoxProps, "onRequestClose"> & {
  /**
   * This function must set open to false in order to close the lightbox. Note there
   * is a 300ms easing animation on lightbox close that occurs before this function
   * is called.
   * This function receives an object as an argument with the key `lastPosition`
   * that has the index of the image the user was on when LightBox was closed.
   */
  onRequestClose?(options: RequestCloseOptions): void;
  /**
   * Callback function that is invoked whenever the current image index changes.
   * This includes when the user navigates to a different image (via arrow keys,
   * navigation buttons, or swipe gestures) or when clicking a thumbnail.
   *
   * @param index - The new current image index (0-based)
   */
  onImageChange?(index: number): void;
  readonly children: ReactNode;
};

export interface LightBoxNavigationProps {
  /**
   * The class name to apply to the previous button wrapper.
   */
  readonly prevButtonClassName?: string;
  /**
   * The class name to apply to the next button wrapper.
   */
  readonly nextButtonClassName?: string;
}
