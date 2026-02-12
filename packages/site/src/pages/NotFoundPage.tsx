import { Link, Typography } from "@jobber/components";
import { useLocation } from "@tanstack/react-router";
import { type ReactElement, useRef, useState } from "react";
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

  const [fishElement, setFishElement] = useState<ReactElement | null>(
    getRandomFish(),
  );
  const timeoutRef = useRef<number | null>(null);

  const updateFish = () => {
    setFishElement(null);
    requestAnimationFrame(() => {
      setFishElement(getRandomFish());
    });
    timeoutRef.current = window.setTimeout(updateFish, 30000); // Set timeout to match your animation duration (30 seconds)
  };

  // Start the update cycle
  if (!timeoutRef.current) {
    updateFish();
  }

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
