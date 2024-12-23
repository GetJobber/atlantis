import { Link, Typography } from "@jobber/components";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  const location = useLocation();
  const elementNotFound = location.pathname.includes("components")
    ? "component"
    : "page";
  const showDeveloperMessage =
    window.location.host.includes("localhost") &&
    elementNotFound === "component";
  const sealifeArray = ["🐟", "🐠", "🐡", "🐙", "🦑", "🪼"];

  const getRandomFish = () => {
    return (
      <div className={styles.fish}>
        {sealifeArray[Math.floor(Math.random() * sealifeArray.length)]}
      </div>
    );
  };

  const [fishElement, setFishElement] = useState<JSX.Element | null>(
    getRandomFish(),
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateFish = () => {
      setFishElement(null);
      setTimeout(() => {
        setFishElement(getRandomFish());
      }, 0); // This is to force a re-render to prevent the fish from changing in the middle of the animation
    };

    timeoutRef.current = setTimeout(updateFish, 30000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fishElement]);

  return (
    <div className={styles.container}>
      {fishElement}
      <div className={styles.content}>
        <Typography element={"h1"} fontWeight={"bold"}>
          🧜 404 - Lost at Sea
        </Typography>
        <Typography size={"large"}>
          It seems you&apos;ve ventured into uncharted waters. Atlantis might be
          hidden, but this {elementNotFound} definitely doesn&apos;t exist!
        </Typography>
        {showDeveloperMessage && (
          <div>
            <Link url={"/component-not-found"} external={false}>
              Are you a developer and expecting something to be here?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
