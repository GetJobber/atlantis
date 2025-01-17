/* eslint-disable max-statements */
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, PanInfo, motion } from "framer-motion";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import styles from "./LightBox.module.css";
import { ButtonDismiss } from "../ButtonDismiss";
import { Button } from "../Button";
import { AtlantisThemeContextProvider } from "../AtlantisThemeContext";

interface PresentedImage {
  title?: string;
  caption?: string;
  url: string;
}

interface RequestCloseOptions {
  lastPosition: number;
}

interface LightBoxProps {
  /**
   * Specify if the Lightbox is open or closed.
   */
  readonly open: boolean;
  /**
   * Images is an array of objects defining a LightBox image. This object consists of
   * `title`, `caption` and `url`. `title` and `caption` are optional, `url` is
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
}

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const imageTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

// A little bit more than the transition's duration
// We're doing this to prevent a bug from framer-motion
// https://github.com/framer/motion/issues/1769
const debounceDuration = 250;

export function LightBox({
  open,
  images,
  imageIndex = 0,
  onRequestClose,
}: LightBoxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const [direction, setDirection] = useState(0);
  const lightboxRef = useFocusTrap<HTMLDivElement>(open);
  const debouncedHandleNext = debounce(handleMoveNext, debounceDuration);
  const debouncedHandlePrevious = debounce(
    handleMovePrevious,
    debounceDuration,
  );
  const mounted = useIsMounted();
  const prevOpen = useRef(open);

  useRefocusOnActivator(open);

  useOnKeyDown(handleRequestClose, "Escape");

  useOnKeyDown(debouncedHandlePrevious, {
    key: "ArrowLeft",
  });

  useOnKeyDown(debouncedHandleNext, {
    key: "ArrowRight",
  });

  useEffect(() => {
    setCurrentImageIndex(imageIndex);
  }, [imageIndex, open]);

  if (prevOpen.current !== open) {
    prevOpen.current = open;
    togglePrintStyles(open);
  }

  const template = (
    <>
      {open && (
        <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
          <div
            className={styles.lightboxWrapper}
            tabIndex={0}
            aria-label="Lightbox"
            key="Lightbox"
            ref={lightboxRef}
          >
            <div className={styles.toolbar}>
              {/* {images[currentImageIndex].title} */}
              <ButtonDismiss ariaLabel="Close" onClick={handleRequestClose} />
            </div>
            <div className={styles.imagesWrapper}>
              <div
                className={styles.backgroundImage}
                onClick={handleRequestClose}
                style={{
                  backgroundImage: `url("${images[currentImageIndex].url}")`,
                }}
              >
                <div className={styles.backgroundBlur} />
              </div>
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentImageIndex}
                  variants={variants}
                  src={images[currentImageIndex].url}
                  custom={direction}
                  className={styles.image}
                  style={{ y: "-50%" }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={imageTransition}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleOnDragEnd}
                />
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <>
                <PreviousButton onClick={debouncedHandlePrevious} />
                <NextButton onClick={debouncedHandleNext} />
              </>
            )}

            <ul className={styles.thumbnailList}>
              <ThumbnailListItem
                imageUrl={images[currentImageIndex - 1]?.url}
              />
              <ThumbnailListItem imageUrl={images[currentImageIndex]?.url} />
              <ThumbnailListItem
                imageUrl={images[currentImageIndex + 1]?.url}
              />
            </ul>
          </div>
        </AtlantisThemeContextProvider>
      )}
    </>
  );

  return mounted.current
    ? ReactDOM.createPortal(template, document.body)
    : template;

  function handleMovePrevious() {
    setDirection(-1);
    setCurrentImageIndex(
      (currentImageIndex + images.length - 1) % images.length,
    );
  }

  function handleMoveNext() {
    setDirection(1);
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }

  function handleRequestClose() {
    onRequestClose({ lastPosition: currentImageIndex });
  }

  function handleOnDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleMoveNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handleMovePrevious();
    }
  }
}

interface NavButtonProps {
  readonly onClick: () => void;
}

function PreviousButton({ onClick }: NavButtonProps) {
  return (
    <div className={styles.prev}>
      <Button
        size="large"
        variation="subtle"
        type="secondary"
        icon="arrowLeft"
        ariaLabel="Previous image"
        onClick={onClick}
      />
    </div>
  );
}

function NextButton({ onClick }: NavButtonProps) {
  return (
    <div className={styles.next}>
      <Button
        size="large"
        variation="subtle"
        type="secondary"
        icon="arrowRight"
        ariaLabel="Next image"
        onClick={onClick}
      />
    </div>
  );
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

function ThumbnailListItem({ imageUrl }: { readonly imageUrl?: string }) {
  if (imageUrl) {
    return (
      <li>
        <div
          className={styles.thumbnail}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      </li>
    );
  }

  return <li data-no-item />;
}
