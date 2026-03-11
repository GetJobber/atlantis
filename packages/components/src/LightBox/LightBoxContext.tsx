/* eslint-disable max-statements */
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
import type { PanInfo } from "framer-motion";
import type {
  LightBoxContextType,
  LightBoxProviderProps,
} from "./LightBox.types";
import {
  BUTTON_DEBOUNCE_DELAY,
  MOVEMENT_DEBOUNCE_DELAY,
  swipeConfidenceThreshold,
  swipePower,
} from "./LightBox.constants";

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
