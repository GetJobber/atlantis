import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, PanInfo, motion } from "framer-motion";
import { useOnKeyDown, useRefocusOnActivator } from "@jobber/hooks";
import styles from "./LightBox.css";
import { Icon } from "../Icon";
import { ButtonDismiss } from "../ButtonDismiss";

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
      x: direction > 0 ? 2000 : -2000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
};

const imageTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

export function LightBox({
  open,
  images,
  imageIndex = 0,
  onRequestClose,
}: LightBoxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  useRefocusOnActivator(open);

  useOnKeyDown(() => {
    onRequestClose({ lastPosition: currentImageIndex });
  }, "Escape");

  useOnKeyDown(handleMovePrevious, {
    key: "ArrowLeft",
  });

  useOnKeyDown(handleMoveNext, {
    key: "ArrowRight",
  });

  useEffect(() => {
    setCurrentImageIndex(imageIndex);
  }, [imageIndex, open]);

  return (
    <>
      <AnimatePresence initial={false}>
        {open && (
          <LightBoxWrapper key="lightbox">
            <Toolbar>
              <Title>{images[currentImageIndex].title}</Title>
              <ButtonDismiss
                ariaLabel="Close lightbox"
                onClick={() => {
                  onRequestClose({ lastPosition: currentImageIndex });
                }}
              />
            </Toolbar>
            <ImagesWrapper handleImageWrapperClick={handleImageWrapperClick}>
              <PreviousButton onClick={handleMovePrevious} />
              <motion.img
                key={currentImageIndex}
                variants={variants}
                src={images[currentImageIndex].url}
                initial="enter"
                animate="center"
                transition={imageTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleOnDragEnd}
              />

              <NextButton onClick={handleMoveNext} />
            </ImagesWrapper>
            <Toolbar>{images[currentImageIndex].caption}</Toolbar>
          </LightBoxWrapper>
        )}
      </AnimatePresence>
    </>
  );

  function handleMovePrevious() {
    setCurrentImageIndex(
      (currentImageIndex + images.length - 1) % images.length,
    );
  }

  function handleMoveNext() {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }

  function handleImageWrapperClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const target = event.target as HTMLDivElement;
    if (target.id === "imageWrapper") {
      onRequestClose({ lastPosition: currentImageIndex });
    }
  }

  function handleOnDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleMovePrevious();
    } else if (swipe > swipeConfidenceThreshold) {
      handleMoveNext();
    }
  }
}

interface ChildrenProps {
  children: ReactNode;
}

function Title({ children }: ChildrenProps) {
  return <span className={styles.title}>{children}</span>;
}

function Toolbar({ children }: ChildrenProps) {
  return <div className={styles.toolbar}>{children}</div>;
}

function LightBoxWrapper({ children }: ChildrenProps) {
  return (
    <div className={styles.lightboxWrapper} tabIndex={0} aria-label="Lightbox">
      {children}
    </div>
  );
}

function ImagesWrapper({
  children,
  handleImageWrapperClick,
}: {
  children: ReactNode;
  handleImageWrapperClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}) {
  return (
    <div
      className={styles.imagesWrapper}
      onClick={handleImageWrapperClick}
      id="imageWrapper"
    >
      {children}
    </div>
  );
}

interface NavButtonProps {
  onClick: () => void;
}

function PreviousButton({ onClick }: NavButtonProps) {
  return (
    <div className={styles.prev} onClick={onClick}>
      <Icon name="arrowLeft" color="white" size="large" />
    </div>
  );
}

function NextButton({ onClick }: NavButtonProps) {
  return (
    <div className={styles.next} onClick={onClick}>
      <Icon name="arrowRight" color="white" size="large" />
    </div>
  );
}
