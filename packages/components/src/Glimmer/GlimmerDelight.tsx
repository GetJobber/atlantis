/* eslint-disable max-statements */
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./GlimmerDelight.css";
import { Glimmer } from "./Glimmer";

interface GlimmerDelightProps extends PropsWithChildren {
  readonly delight?: boolean;
}

export const GlimmerDelight = ({
  children,
  delight = false,
}: GlimmerDelightProps) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [barPosition, setBarPosition] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);
  const [barMoving, setBarMoving] = useState(false);
  const [loopArray] = useState(Array.from({ length: 108 }));
  const [bumped, setBumped] = useState<boolean[]>([]);
  const [ballDestination, setBallDestination] = useState({
    x: (wrapperRef?.current?.getBoundingClientRect().width || 1) / 2,
    y: (wrapperRef?.current?.getBoundingClientRect().height || 1) / 2,
  });

  // eslint-disable-next-line max-statements
  const animationLoop = () => {
    const rect1 = ballRef.current?.getBoundingClientRect();
    const rect2 = barRef.current?.getBoundingClientRect();
    const boxes = document.querySelectorAll("." + styles.boxWrapper + " div");

    if (rect1 && rect2) {
      const found = !(
        rect1.left > rect2.right ||
        rect1.right < rect2.left ||
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top
      );

      if (found) {
        setBallDestination({
          x: rect1.y - Math.random() * 260,
          y: 0,
        });
      }
    }
    boxes.forEach((d, index) => {
      const rect = d.getBoundingClientRect();

      if (rect1) {
        const found = !(
          rect1.left > rect.right ||
          rect1.right < rect.left ||
          rect1.top > rect.bottom ||
          rect1.bottom < rect.top
        );

        if (found) {
          setBumped(inBump => {
            const newBumped: boolean[] = [...inBump];

            newBumped[index] = true;

            return newBumped;
          });
        }
      }
    });

    if (rect1) {
      if (rect1.top < 5) {
        setBallDestination(z => ({
          x: z.x,
          y:
            wrapperRef.current?.getBoundingClientRect().bottom ||
            window.innerHeight,
        }));
      }

      if (rect1.left < 5) {
        setBallDestination({
          x:
            wrapperRef.current?.getBoundingClientRect().right ||
            window.innerWidth,
          y: rect1.x,
        });
      }

      if (
        rect1.right >
        (wrapperRef.current?.getBoundingClientRect().right ||
          window.innerWidth) -
          5
      ) {
        setBallDestination({
          x: 0,
          y: rect1.x * -1,
        });
      }
    }

    if (animationActive) {
      requestAnimationFrame(animationLoop);
    }
  };
  useEffect(() => {
    setAnimationActive(true);
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") {
        setBarPosition(d => d - 20);
      } else if (e.key === "ArrowRight") {
        setBarPosition(d => d + 20);
      }
    });

    setTimeout(() => {
      setBallDestination({ x: window.innerWidth, y: -1 });
    }, 1000);

    return () => setAnimationActive(false);
  }, []);
  useEffect(() => {
    if (animationActive) {
      requestAnimationFrame(animationLoop);
    }
  }, [animationActive]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: "100vh",
      }}
      className={styles.wrapper}
      tabIndex={0}
      onMouseDown={() => {
        setBarMoving(true);
      }}
      onMouseUp={() => {
        setBarMoving(false);
      }}
      onMouseMove={e => {
        if (barMoving) {
          setBarPosition(
            e.clientX -
              (barRef.current?.getBoundingClientRect().width || 1) / 2,
          );
        }
      }}
    >
      <div className={delight ? styles.shown : styles.hidden}>
        <div className={styles.boxWrapper}>
          {loopArray.map((_, index) => {
            return (
              <div className={bumped[index] ? styles.hidden : ""} key={index} />
            );
          })}
        </div>
        <div
          className={styles.ball}
          style={{
            transform: `translateX(${ballDestination.x}px) translateY(${ballDestination.y}px)`,
            transitionDuration: "3s",
          }}
          ref={ballRef}
        ></div>
        <div
          ref={barRef}
          className={styles.bar}
          style={{ transform: `translateX(${barPosition}px)` }}
        >
          <Glimmer.Text lines={1} />
        </div>
      </div>

      <div className={delight ? styles.hidden : ""}>{children}</div>
    </div>
  );
};
