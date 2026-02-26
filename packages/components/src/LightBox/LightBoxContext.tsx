/* eslint-disable max-statements */
import type { CSSProperties, RefObject } from "react";
import type { PanInfo } from "framer-motion";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import noop from "lodash/noop";
import {
  useDebounce,
  useFocusTrap,
  useIsMounted,
  useOnKeyDown,
  useRefocusOnActivator,
} from "@jobber/hooks";

export interface PresentedImage {
  title?: string;
  caption?: string;
  alt?: string;
  url: string;
}

export interface RequestCloseOptions {
  lastPosition: number;
}

interface LightBoxContextType {
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

// A little bit more than the transition's duration
// We're doing this to prevent a bug from framer-motion
// https://github.com/framer/motion/issues/1769
const BUTTON_DEBOUNCE_DELAY = 250;
const MOVEMENT_DEBOUNCE_DELAY = 1000;

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const LightBoxContext = createContext<LightBoxContextType>({
  open: false,
  images: [],
  currentImageIndex: 0,
  mouseIsStationary: true,
  boxSizing: "content-box",
  directionRef: { current: 0 },
  selectedThumbnailRef: { current: null },
  lightboxRef: { current: null },
  mounted: { current: false },
  handleMouseMove: noop,
  handleRequestClose: noop,
  handleOnDragEnd: noop,
  handleThumbnailClick: noop,
  debouncedHandleNext: noop,
  debouncedHandlePrevious: noop,
});

export interface LightBoxProviderProps {
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
  onRequestClose?(options: RequestCloseOptions): void;
  /**
   * Callback function that is invoked whenever the current image index changes.
   * This includes when the user navigates to a different image (via arrow keys,
   * navigation buttons, or swipe gestures) or when clicking a thumbnail.
   *
   * @param index - The new current image index (0-based)
   */
  onImageChange?(index: number): void;
  /**
   * Sets the box-sizing for the thumbnails in the lightbox. This is a solution for a problem where
   * tailwind was setting the box-sizing to `border-box` and causing issues with the lightbox.
   * @default "content-box"
   */
  readonly boxSizing?: CSSProperties["boxSizing"];
  readonly children: React.ReactNode;
}

export function LightBoxProvider({
  open = true,
  images,
  imageIndex = 0,
  onRequestClose = noop,
  onImageChange = noop,
  boxSizing = "content-box",
  children,
}: LightBoxProviderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const directionRef = useRef(0);
  const [mouseIsStationary, setMouseIsStationary] = useState(true);
  const lightboxRef = useFocusTrap<HTMLDivElement>(open);
  const selectedThumbnailRef = useRef<HTMLDivElement>(null);

  const debouncedHandleNext = useDebounce(
    handleMoveNext,
    BUTTON_DEBOUNCE_DELAY,
  );
  const debouncedHandlePrevious = useDebounce(
    handleMovePrevious,
    BUTTON_DEBOUNCE_DELAY,
  );
  const mounted = useIsMounted();
  const prevOpen = useRef(open);
  useRefocusOnActivator(open);

  const handleMouseMovement = useDebounce(() => {
    setMouseIsStationary(true);
  }, MOVEMENT_DEBOUNCE_DELAY);

  useOnKeyDown(handleRequestClose, "Escape");

  useOnKeyDown(debouncedHandlePrevious, {
    key: "ArrowLeft",
  });

  useOnKeyDown(debouncedHandleNext, {
    key: "ArrowRight",
  });

  useEffect(() => {
    setCurrentImageIndex(imageIndex);
    onImageChange(imageIndex);
  }, [imageIndex, open]);

  if (prevOpen.current !== open) {
    prevOpen.current = open;
    togglePrintStyles(open);
  }

  useEffect(() => {
    selectedThumbnailRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentImageIndex]);

  function handleMouseMove() {
    if (mouseIsStationary) {
      setMouseIsStationary(false);
    }
    handleMouseMovement();
  }

  function handleMovePrevious() {
    directionRef.current = -1;
    const newIndex = (currentImageIndex + images.length - 1) % images.length;
    setCurrentImageIndex(newIndex);
    onImageChange(newIndex);
  }

  function handleMoveNext() {
    directionRef.current = 1;
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    onImageChange(newIndex);
  }

  function handleRequestClose() {
    onRequestClose({ lastPosition: currentImageIndex });
  }

  function handleOnDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleMoveNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handleMovePrevious();
    }
  }

  function handleThumbnailClick(index: number) {
    if (index < currentImageIndex) {
      directionRef.current = -1;
    } else {
      directionRef.current = 1;
    }
    setCurrentImageIndex(index);
    onImageChange(index);
  }

  return (
    <LightBoxContext.Provider
      value={{
        open,
        images,
        currentImageIndex,
        mouseIsStationary,
        boxSizing,
        directionRef,
        selectedThumbnailRef,
        lightboxRef,
        mounted,
        handleMouseMove,
        handleRequestClose,
        handleOnDragEnd,
        handleThumbnailClick,
        debouncedHandleNext,
        debouncedHandlePrevious,
      }}
    >
      {children}
    </LightBoxContext.Provider>
  );
}

export function useLightBoxContext() {
  return useContext(LightBoxContext);
}

function togglePrintStyles(open: boolean) {
  try {
    if (open) {
      document.documentElement.classList.add("atlantisLightBoxActive");
    } else {
      document.documentElement.classList.remove("atlantisLightBoxActive");
    }
  } catch (error) {
    console.error(error);
  }
}
